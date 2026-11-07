import { EditorView, keymap } from '@codemirror/view';
import { Compartment, EditorState } from '@codemirror/state';
import { initTheme } from './theme.js';
import { editorTheme } from './editor-theme.js';
import { basicSetup } from 'codemirror';
import { python } from '@codemirror/lang-python';
import { indentWithTab } from '@codemirror/commands';
import { exercises } from './catalog.js';
import { createStore, addSubmission, progress } from './storage.js';
import { evaluate, labels } from './evaluator.js';
import { LIMITS } from './executor.js';
import { createTabs } from './tabs.js';
import { createPracticeTests } from './practice-tests.js';
import { icon } from './icons.js';
import { escapeHtml as escape } from './html.js';
import { matchesExercise, practiceLabel } from './catalog-search.js';
import { installSkipLink, installWorkbenchToggle } from './workspace-actions.js';
import { resultMarkup } from './result-view.js';
import './style.css';

const main = document.querySelector('main');
installSkipLink(document.querySelector('.skip'), main);
let storage;
try { storage = window.localStorage; } catch { storage = { getItem() { throw Error(); }, setItem() { throw Error(); } }; }
const store = createStore(storage, () => { document.querySelector('#storage-warning').hidden = false; });
let editor = null, controller = null, pageToken = 0;
const themeCompartment = new Compartment();
initTheme({ root: document.documentElement, select: document.querySelector('#theme'), media: window.matchMedia('(prefers-color-scheme: dark)'), storage, onChange: theme => {
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#18191d' : '#f1f3f7';
  if (editor) editor.dispatch({ effects: themeCompartment.reconfigure(editorTheme(theme === 'dark')) });
} });
const topics = [...new Set(exercises.map(e => e.topic))];
function badge(status) { return `<span class="badge ${status === 'Resolvido' ? 'solved' : status === 'Não iniciado' ? '' : 'active'}">${escape(status)}</span>`; }
function catalog() {
  const solved = exercises.filter(e => progress(store.get(e.id), e) === 'Resolvido').length;
  main.innerHTML = `
    <section class="hero"><div><p class="eyebrow">SEU ESPAÇO DE PRÁTICA</p><h1>O próximo passo é<br><em>escrever o código.</em></h1><p class="intro">Pequenos desafios para construir uma boa base em Python.<br>Leia, experimente e aprenda com cada tentativa.</p><a class="button primary" href="#/exercicio/${exercises.find(e => progress(store.get(e.id), e) !== 'Resolvido')?.id ?? exercises[0].id}">${practiceLabel(exercises, store)} <span aria-hidden="true">↗</span></a></div><aside class="journey"><span class="eyebrow">SUA JORNADA</span><div class="journey-number">${solved}<span> / ${exercises.length}</span></div><p>exercícios resolvidos</p><div class="meter" role="progressbar" aria-label="Exercícios resolvidos" aria-valuenow="${solved}" aria-valuemin="0" aria-valuemax="${exercises.length}"><span style="width:${solved / exercises.length * 100}%"></span></div><small>Um pouco de prática já faz diferença.</small></aside></section>
    <section class="catalog"><div class="section-heading"><div><p class="eyebrow">APRENDA FAZENDO</p><h2>Lista de exercícios</h2></div><span class="muted">${exercises.length} desafios para começar</span></div>
    <div class="filters"><label class="search"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="Buscar exercício…" aria-label="Buscar exercício"></label><label class="topic-label">Tema <select id="topic"><option value="">Todos os temas</option>${topics.map(t => `<option>${escape(t)}</option>`).join('')}</select></label></div>
    <div class="exercise-table"><div class="table-head"><span>EXERCÍCIO</span><span>TEMA</span><span>NÍVEL</span><span>PROGRESSO</span></div><div id="exercise-list"></div></div>
    <p class="local-note"><span aria-hidden="true">◉</span> Seu progresso fica neste navegador. Limpar os dados do site pode apagar seus rascunhos e histórico.</p></section>`;
  const update = () => {
    const query = main.querySelector('#search').value.toLocaleLowerCase('pt-BR');
    const topic = main.querySelector('#topic').value;
    const matches = exercises.filter(e => matchesExercise(e, query, topic));
    main.querySelector('#exercise-list').innerHTML = matches.map(e => `<a class="exercise-row" href="#/exercicio/${e.id}"><span class="exercise-title"><span class="exercise-number">${String(exercises.indexOf(e) + 1).padStart(2, '0')}</span><span><strong>${escape(e.title)}</strong><small>${escape(e.summary)}</small></span></span><span class="topic">${escape(e.topic)}</span><span class="level">● ${escape(e.difficulty)}</span>${badge(progress(store.get(e.id), e))}</a>`).join('') || '<p class="empty">Nenhum exercício encontrado. Experimente outro termo ou tema.</p>';
  };
  main.querySelector('#search').addEventListener('input', update);
  main.querySelector('#topic').addEventListener('change', update);
  update();
}
function exercisePage(exercise) {
  const token = pageToken;
  const index = exercises.indexOf(exercise);
  const previous = exercises[index - 1], next = exercises[index + 1];
  let revealedHints = 0;
  const readOnly = new Compartment();
  main.innerHTML = `
    <div class="exercise-commandbar">
      <nav class="exercise-switcher" aria-label="Navegação dos exercícios">
        <a class="back-link" href="#">${icon('list')} Exercícios</a><span class="toolbar-divider" aria-hidden="true"></span>
        ${previous ? `<a class="icon-button" href="#/exercicio/${previous.id}" aria-label="Exercício anterior: ${escape(previous.title)}" title="Exercício anterior">‹</a>` : '<span class="icon-button disabled" aria-disabled="true">‹</span>'}
        <label><span class="visually-hidden">Ir para exercício</span><select id="exercise-select">${exercises.map((e, i) => `<option value="${e.id}" ${e.id === exercise.id ? 'selected' : ''}>${i + 1}. ${escape(e.title)}</option>`).join('')}</select></label>
        ${next ? `<a class="icon-button" href="#/exercicio/${next.id}" aria-label="Próximo exercício: ${escape(next.title)}" title="Próximo exercício">›</a>` : '<span class="icon-button disabled" aria-disabled="true">›</span>'}
      </nav>
      <div class="actions"><button id="run" class="button secondary">${icon('play')} Executar testes</button><button id="submit" class="button primary">${icon('send')} Enviar solução</button><button id="cancel" class="button subtle" hidden>Cancelar</button></div>
    </div>
    <div class="workspace">
      <article class="panel statement" aria-label="Enunciado e exemplos do exercício">
        <div class="pane-header"><span class="pane-title"><span class="description-icon">${icon('document')}</span> Enunciado</span><span class="pane-caption">Lógica de programação</span></div>
        <div class="statement-content" tabindex="0">
        <div class="exercise-heading"><p class="eyebrow">${escape(exercise.topic)} <span aria-hidden="true">/</span> ${index + 1} de ${exercises.length}</p><h1>${escape(exercise.title)}</h1><div class="exercise-meta"><span class="difficulty-label">${escape(exercise.difficulty)}</span><div id="exercise-status">${badge(progress(store.get(exercise.id), exercise))}</div></div></div>
        <p class="muted small">Você vai usar: ${exercise.prerequisites.map(escape).join(', ')}.</p><button class="button subtle" data-help>Ver dicas</button><p class="statement-text">${escape(exercise.statement)}</p>
        <h2 class="input-heading"><span aria-hidden="true">↳</span> Entrada</h2><p>${escape(exercise.inputFormat)}</p><h2 class="output-heading"><span aria-hidden="true">↱</span> Saída</h2><p>${escape(exercise.outputFormat)}</p><p class="small">Imprima somente a resposta pedida. Não coloque perguntas em input(): use input() sem mensagem.</p><h2 class="constraints-heading">Restrições</h2><p class="constraints">${escape(exercise.constraints)}</p>
        <h2>Exemplos oficiais</h2><div class="examples">${exercise.tests.filter(t => t.visible).map((t, i) => `<details class="example" ${i === 0 ? 'open' : ''}><summary class="example-title">Exemplo ${i + 1}</summary><div class="example-columns"><div><small class="input-label">ENTRADA</small><pre>${escape(t.input.trimEnd())}</pre></div><div><small class="output-label">SAÍDA</small><pre>${escape(t.expected)}</pre></div></div></details>`).join('')}</div>
        <div class="hints" id="hints" tabindex="-1"><h2>Precisa de uma dica?</h2><div id="hint-list"></div><button id="hint-button" class="button subtle">Mostrar próxima dica</button></div>
        </div>
      </article>
      <div class="right-column">
        <section class="panel code-panel" aria-label="Escreva sua solução">
          <div class="editor-toolbar"><span class="pane-title"><span class="code-icon">${icon('code')}</span> Código <span class="file-name">solucao.py</span></span><span class="runtime-label">Python 3 <span aria-hidden="true">·</span> até ${LIMITS.executionMs / 1000} segundos por teste</span></div>
          <div id="editor" aria-label="Editor da solução Python"></div>
          <div class="editor-foot"><span id="save-status">Salvamento local automático</span><span>Tab para indentar · Esc, Tab para sair</span></div>
          <div class="actions mobile-actions"><button class="button secondary" data-action="run">Executar testes</button><button class="button primary" data-action="submit">Enviar solução</button><button class="button subtle" data-action="cancel" hidden>Cancelar</button></div><p class="small action-help">Executar experimenta seus casos; Enviar avalia os casos do exercício e registra a resolução.</p><p id="run-status" role="status" aria-live="polite">Pronto para executar. Teste seu código antes de enviar.</p>
        </section>
        <section class="panel workbench" id="workbench" aria-label="Testes e resultados">
          <button id="expand-workbench" class="button subtle" aria-expanded="false" aria-controls="workbench">Expandir painel</button><div class="workbench-tabs" role="tablist" aria-label="Área de avaliação">
            <button id="practice-tab" role="tab" aria-controls="practice-panel" aria-selected="true"><span class="test-icon">${icon('test')}</span> Testes de prática</button>
            <button id="result-tab" role="tab" aria-controls="result-panel" aria-selected="false"><span class="result-icon">${icon('terminal')}</span> Resultado <span id="result-indicator" aria-hidden="true"></span></button>
            <button id="history-tab" role="tab" aria-controls="history-panel" aria-selected="false">Histórico</button>
          </div>
          <div id="practice-panel" role="tabpanel" aria-labelledby="practice-tab"><p class="muted small">Casos editáveis para experimentar. A submissão usa os testes oficiais.</p><div id="cases"></div></div>
          <div id="result-panel" role="tabpanel" aria-labelledby="result-tab" tabindex="0" hidden><button class="button subtle" data-help>Ver dicas</button><div id="results"><p class="muted">Execute os testes ou envie uma solução para ver o resultado.</p></div></div>
          <div id="history-panel" role="tabpanel" aria-labelledby="history-tab" tabindex="0" hidden><h2 class="visually-hidden">Histórico local</h2><div id="history"></div></div>
        </section>
      </div>
    </div>`;
  main.querySelector('#exercise-select').addEventListener('change', event => { location.hash = `/exercicio/${event.target.value}`; });
  const workbenchTabs = createTabs(main.querySelector('#workbench'));
  const practice = createPracticeTests(main.querySelector('#cases'), exercise.tests.filter(test => test.visible), { onChange: () => {
    main.querySelector('#result-indicator').textContent = '';
    main.querySelector('#run-status').textContent = 'Testes alterados. Execute novamente; a aba Resultado guarda a avaliação anterior.';
  } });
  editor = new EditorView({
    doc: store.get(exercise.id).draft ?? exercise.starter ?? '',
    extensions: [basicSetup, python(), themeCompartment.of(editorTheme(document.documentElement.dataset.theme === 'dark')),
      readOnly.of(EditorState.readOnly.of(false)), keymap.of([indentWithTab]),
      EditorView.contentAttributes.of({ 'aria-label': 'Código Python', spellcheck: 'false' }),
      EditorView.updateListener.of(update => {
        if (!update.docChanged) return;
        const record = store.get(exercise.id);
        record.draft = update.state.doc.toString(); store.save(exercise.id, record);
        main.querySelector('#exercise-status').innerHTML = badge(progress(record, exercise));
        main.querySelector('#save-status').textContent = document.querySelector('#storage-warning').hidden ? 'Rascunho salvo neste navegador' : 'Rascunho apenas nesta sessão';
        practice.invalidate();
        main.querySelector('#result-indicator').textContent = '';
        if (main.querySelector('#results h3')) main.querySelector('#run-status').textContent = 'Código alterado. Execute novamente; o resultado anterior continua disponível na aba Resultado.';
      }),
    ], parent: main.querySelector('#editor'),
  });
  function renderHistory() {
    const record = store.get(exercise.id);
    main.querySelector('#exercise-status').innerHTML = badge(progress(record, exercise));
    main.querySelector('#history').innerHTML = record.history.length
      ? `<p class="muted small">Últimas 20 submissões neste navegador. Abra uma tentativa para consultar o código.</p>${record.history.map(h => `<details class="history-item"><summary><span class="result-label ${h.status === 'accepted' ? 'success' : 'failure'}">${h.status === 'accepted' ? '✓' : '✕'} ${escape(labels[h.status] ?? h.status)}</span><time>${escape(new Date(h.date).toLocaleString('pt-BR'))}</time><span class="muted">versão do exercício ${h.version}</span></summary><pre>${escape(h.code)}</pre>${h.diagnostic ? resultMarkup({ status: h.status, results: [h.diagnostic] }, true) : h.status === 'accepted' ? '<p class="muted small">Todos os casos do exercício passaram nesta tentativa.</p>' : '<p class="muted small">Diagnóstico não disponível para esta tentativa.</p>'}</details>`).join('')}`
      : '<p class="muted">Nenhuma submissão ainda. Envie uma solução para registrar sua primeira tentativa. Testes de prática não entram no histórico.</p>';
  }
  function showNextHint() {
    if (revealedHints >= exercise.hints.length) return;
    const p = document.createElement('p');
    p.textContent = `${revealedHints + 1}. ${exercise.hints[revealedHints++]}`;
    main.querySelector('#hint-list').append(p);
    if (revealedHints === exercise.hints.length) { main.querySelector('#hint-button').disabled = true; main.querySelector('#hint-button').textContent = 'Todas as dicas abertas'; }
  }
  main.querySelector('#hint-button').addEventListener('click', showNextHint);
  main.querySelectorAll('[data-help]').forEach(button => button.addEventListener('click', () => {
    showNextHint();
    main.querySelector('#hints').focus();
    main.querySelector('#hints').scrollIntoView({ block: 'nearest' });
  }));
  installWorkbenchToggle(main.querySelector('#expand-workbench'), main.querySelector('.right-column'), main.querySelector('.code-panel'));
  async function run(official) {
    if (controller) return;
    const code = editor.state.doc.toString();
    if (code.length > LIMITS.codeLimit) { main.querySelector('#run-status').textContent = 'O código deve ter até 100 mil caracteres.'; return; }
    const currentController = new AbortController(); controller = currentController;
    editor.dispatch({ effects: readOnly.reconfigure(EditorState.readOnly.of(true)) });
    main.querySelectorAll('#run, #submit, [data-action="run"], [data-action="submit"]').forEach(button => { button.disabled = true; });
    main.querySelectorAll('#cancel, [data-action="cancel"]').forEach(button => { button.hidden = false; });
    main.querySelector('#save-status').textContent = 'Editor em leitura durante a execução';
    main.querySelector('#result-indicator').textContent = '↻';
    main.querySelector('#result-indicator').className = 'running';
    // As abas de prática nunca recebem os resultados da submissão oficial.
    if (official) { practice.setBusy(true); workbenchTabs.select('result-tab'); }
    else { practice.begin(); workbenchTabs.select('practice-tab'); }
    main.querySelector('#results').innerHTML = '<p class="muted">Avaliação em andamento. Acompanhe o teste atual abaixo do editor.</p>';
    const result = await evaluate(code, official ? exercise.tests : practice.getCases(), {
      official, signal: currentController.signal,
      onProgress: ({ index, total, phase }) => {
        if (token !== pageToken) return;
        if (!official) practice.phase(index, phase);
        main.querySelector('#run-status').textContent = `${official ? 'Submissão oficial' : 'Testes de prática'} · ${index + 1} de ${total} · ${phase === 'loading' ? 'Preparando Python…' : 'Executando…'}`;
      },
      onCaseResult: result => { if (token === pageToken && !official) practice.result(result); },
    });
    if (token !== pageToken) return;
    controller = null;
    editor.dispatch({ effects: readOnly.reconfigure(EditorState.readOnly.of(false)) });
    practice.finish();
    main.querySelectorAll('#run, #submit, [data-action="run"], [data-action="submit"]').forEach(button => { button.disabled = false; });
    main.querySelectorAll('#cancel, [data-action="cancel"]').forEach(button => { button.hidden = true; });
    main.querySelector('#save-status').textContent = 'Salvamento local automático';
    main.querySelector('#run-status').textContent = `${official ? 'Submissão oficial' : 'Testes de prática'}: ${labels[result.status]}.${result.status === 'accepted' && !official ? ' Envie a solução para registrar a resolução.' : ''}`;
    const success = result.status === 'accepted';
    main.querySelector('#result-indicator').textContent = success ? '✓' : '✕';
    main.querySelector('#result-indicator').className = success ? 'success' : 'failure';
    main.querySelector('#results').innerHTML = resultMarkup(result, official);
    if (official) store.save(exercise.id, addSubmission(store.get(exercise.id), exercise, code, result.status, undefined, result));
    renderHistory();
  }
  main.querySelectorAll('#run, [data-action="run"]').forEach(button => button.addEventListener('click', () => run(false)));
  main.querySelectorAll('#submit, [data-action="submit"]').forEach(button => button.addEventListener('click', () => run(true)));
  main.querySelectorAll('#cancel, [data-action="cancel"]').forEach(button => button.addEventListener('click', () => controller?.abort()));
  renderHistory();
}
function route() {
  controller?.abort(); controller = null;
  editor?.destroy(); editor = null;
  pageToken++;
  const isCatalog = !location.hash || location.hash === '#';
  document.querySelector('#catalog-link').toggleAttribute('aria-current', isCatalog);
  if (isCatalog) document.querySelector('#catalog-link').setAttribute('aria-current', 'page');
  const match = location.hash.match(/^#\/exercicio\/([a-z0-9-]+)$/);
  const exercise = match && exercises.find(e => e.id === match[1]);
  document.body.classList.toggle('is-exercise', Boolean(exercise));
  if (isCatalog) {
    document.title = 'Codelearn · Pratique Python';
    catalog();
  } else if (exercise) {
    document.title = `${exercise.title} · Codelearn`;
    exercisePage(exercise);
  } else {
    main.innerHTML = '<section class="not-found"><p class="eyebrow">EXERCÍCIO NÃO ENCONTRADO</p><h1>Vamos tentar outro caminho?</h1><a class="button primary" href="#">Voltar aos exercícios</a></section>';
  }
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
