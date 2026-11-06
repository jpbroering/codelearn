import { EditorView, keymap } from '@codemirror/view';
import { Compartment } from '@codemirror/state';
import { initTheme } from './theme.js';
import { editorTheme } from './editor-theme.js';
import { basicSetup } from 'codemirror';
import { python } from '@codemirror/lang-python';
import { indentWithTab } from '@codemirror/commands';
import { exercises } from './catalog.js';
import { createStore, addSubmission, progress } from './storage.js';
import { evaluate, labels } from './evaluator.js';
import { LIMITS } from './executor.js';
import './style.css';

const main = document.querySelector('main');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
let storage;
try { storage = window.localStorage; } catch { storage = { getItem() { throw Error(); }, setItem() { throw Error(); } }; }
const store = createStore(storage, () => { document.querySelector('#storage-warning').hidden = false; });
let editor = null, controller = null, pageToken = 0;
const themeCompartment = new Compartment();
initTheme({ root: document.documentElement, select: document.querySelector('#theme'), media: window.matchMedia('(prefers-color-scheme: dark)'), storage, onChange: theme => {
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#151d19' : '#f6f7f3';
  if (editor) editor.dispatch({ effects: themeCompartment.reconfigure(editorTheme(theme === 'dark')) });
} });
const topics = [...new Set(exercises.map(e => e.topic))];
function badge(status) { return `<span class="badge ${status === 'Resolvido' ? 'solved' : status === 'Não iniciado' ? '' : 'active'}">${escape(status)}</span>`; }
function catalog() {
  const solved = exercises.filter(e => progress(store.get(e.id), e) === 'Resolvido').length;
  main.innerHTML = `
    <section class="hero"><div><p class="eyebrow">SEU ESPAÇO DE PRÁTICA</p><h1>O próximo passo é<br><em>escrever o código.</em></h1><p class="intro">Pequenos desafios para construir uma boa base em Python.<br>Leia, experimente e aprenda com cada tentativa.</p><a class="button primary" href="#/exercicio/${exercises.find(e => progress(store.get(e.id), e) !== 'Resolvido')?.id ?? exercises[0].id}">Continuar praticando <span aria-hidden="true">↗</span></a></div><aside class="journey"><span class="eyebrow">SUA JORNADA</span><div class="journey-number">${solved}<span> / ${exercises.length}</span></div><p>exercícios resolvidos</p><div class="meter" role="progressbar" aria-label="Exercícios resolvidos" aria-valuenow="${solved}" aria-valuemin="0" aria-valuemax="${exercises.length}"><span style="width:${solved / exercises.length * 100}%"></span></div><small>Um pouco de prática já faz diferença.</small></aside></section>
    <section class="catalog"><div class="section-heading"><div><p class="eyebrow">APRENDA FAZENDO</p><h2>Lista de exercícios</h2></div><span class="muted">${exercises.length} desafios para começar</span></div>
    <div class="filters"><label class="search"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="Buscar exercício…" aria-label="Buscar exercício"></label><label class="topic-label">Tema <select id="topic"><option value="">Todos os temas</option>${topics.map(t => `<option>${escape(t)}</option>`).join('')}</select></label></div>
    <div class="exercise-table"><div class="table-head"><span>EXERCÍCIO</span><span>TEMA</span><span>NÍVEL</span><span>PROGRESSO</span></div><div id="exercise-list"></div></div>
    <p class="local-note"><span aria-hidden="true">◉</span> Seu progresso fica neste navegador. Limpar os dados do site pode apagar seus rascunhos e histórico.</p></section>`;
  const update = () => {
    const query = main.querySelector('#search').value.toLocaleLowerCase('pt-BR');
    const topic = main.querySelector('#topic').value;
    const matches = exercises.filter(e => (!topic || e.topic === topic) && `${e.title} ${e.summary}`.toLocaleLowerCase('pt-BR').includes(query));
    main.querySelector('#exercise-list').innerHTML = matches.map(e => `<a class="exercise-row" href="#/exercicio/${e.id}"><span class="exercise-title"><span class="exercise-number">${String(exercises.indexOf(e) + 1).padStart(2, '0')}</span><span><strong>${escape(e.title)}</strong><small>${escape(e.summary)}</small></span></span><span class="topic">${escape(e.topic)}</span><span class="level">● ${escape(e.difficulty)}</span>${badge(progress(store.get(e.id), e))}</a>`).join('') || '<p class="empty">Nenhum exercício encontrado. Experimente outro termo ou tema.</p>';
  };
  main.querySelector('#search').addEventListener('input', update);
  main.querySelector('#topic').addEventListener('change', update);
  update();
}
function exercisePage(exercise) {
  const token = pageToken;
  let cases = exercise.tests.filter(t => t.visible).map(t => ({ input: t.input, expected: t.expected }));
  let revealedHints = 0;
  main.innerHTML = `
    <div class="breadcrumb"><a href="#">← Exercícios</a><span>/</span><span>${escape(exercise.topic)}</span></div>
    <div class="exercise-heading"><div><p class="eyebrow">DESAFIO ${String(exercises.indexOf(exercise) + 1).padStart(2, '0')} · ${escape(exercise.difficulty.toUpperCase())}</p><h1>${escape(exercise.title)}</h1></div><div id="exercise-status">${badge(progress(store.get(exercise.id), exercise))}</div></div>
    <div class="workspace"><article class="panel statement"><div class="panel-label">01 <span>O desafio</span></div><p class="statement-text">${escape(exercise.statement)}</p><h2>Entrada</h2><p>${escape(exercise.inputFormat)}</p><h2>Saída</h2><p>${escape(exercise.outputFormat)}</p><h2>Restrições</h2><p class="constraints">${escape(exercise.constraints)}</p><h2>Exemplos</h2><div class="examples">${exercise.tests.filter(t => t.visible).map((t, i) => `<div class="example"><span class="example-title">Exemplo ${i + 1}</span><div class="example-columns"><div><small>ENTRADA</small><pre>${escape(t.input.trimEnd())}</pre></div><div><small>SAÍDA</small><pre>${escape(t.expected)}</pre></div></div></div>`).join('')}</div><div class="hints"><h2>Uma ajuda para pensar</h2><div id="hint-list"></div><button id="hint-button" class="button subtle">Mostrar próxima dica</button></div></article>
    <div class="right-column"><section class="panel code-panel"><div class="editor-toolbar"><span><span class="python-dot">●</span> solucao.py</span><span>Python · ${LIMITS.executionMs / 1000}s por teste</span></div><div id="editor" aria-label="Editor da solução Python"></div><div class="editor-foot"><span id="save-status">Salvamento local automático</span><span>Tab para indentar · Esc, Tab para sair</span></div><div class="actions"><button id="run" class="button secondary">▷ Executar testes</button><button id="submit" class="button primary">Enviar solução ↗</button><button id="cancel" class="button subtle" hidden>Cancelar</button></div><p id="run-status" role="status" aria-live="polite">Use os testes para experimentar antes de enviar.</p></section>
    <section class="panel test-panel"><div class="panel-label">02 <span>Seus testes de prática</span></div><p class="muted small">Edite os exemplos ou crie seus próprios casos. A submissão usa os testes oficiais originais.</p><div id="cases"></div><button id="add-case" class="button subtle">＋ Adicionar teste</button></section>
    <section class="panel results-panel"><div class="panel-label">03 <span>Resultado</span></div><div id="results" aria-live="polite"><p class="muted">O resultado da sua próxima tentativa aparece aqui.</p></div></section>
    <section class="panel history-panel"><div class="panel-label">04 <span>Histórico local</span></div><div id="history"></div></section></div></div>`;
  editor = new EditorView({
    doc: store.get(exercise.id).draft ?? exercise.starter ?? '',
    extensions: [basicSetup, python(), themeCompartment.of(editorTheme(document.documentElement.dataset.theme === 'dark')), keymap.of([indentWithTab]), EditorView.contentAttributes.of({ 'aria-label': 'Código Python', spellcheck: 'false' }), EditorView.updateListener.of(update => {
      if (!update.docChanged) return;
      const record = store.get(exercise.id);
      record.draft = update.state.doc.toString();
      store.save(exercise.id, record);
      main.querySelector('#exercise-status').innerHTML = badge(progress(record, exercise));
      main.querySelector('#save-status').textContent = document.querySelector('#storage-warning').hidden ? 'Rascunho salvo neste navegador' : 'Rascunho apenas nesta sessão';
    })],
    parent: main.querySelector('#editor'),
  });
  function renderCases() {
    main.querySelector('#add-case').disabled = cases.length >= 20;
    main.querySelector('#cases').innerHTML = cases.map((c, i) => `<div class="test-case"><div class="case-heading"><strong>Teste ${i + 1}</strong><button class="remove-case" data-index="${i}" aria-label="Remover teste ${i + 1}" ${cases.length === 1 ? 'disabled' : ''}>×</button></div><div class="case-fields"><label>Entrada<textarea data-index="${i}" data-field="input" spellcheck="false" rows="3">${escape(c.input)}</textarea></label><label>Saída esperada<textarea data-index="${i}" data-field="expected" spellcheck="false" rows="3">${escape(c.expected)}</textarea></label></div></div>`).join('');
    main.querySelectorAll('.remove-case').forEach(button => button.addEventListener('click', () => { cases.splice(Number(button.dataset.index), 1); renderCases(); }));
    main.querySelectorAll('#cases textarea').forEach(field => field.addEventListener('input', () => { cases[Number(field.dataset.index)][field.dataset.field] = field.value; }));
  }
  function renderHistory() {
    const record = store.get(exercise.id);
    main.querySelector('#exercise-status').innerHTML = badge(progress(record, exercise));
    main.querySelector('#history').innerHTML = record.history.length ? record.history.map(h => `<details class="history-item"><summary><span class="result-label ${h.status === 'accepted' ? 'success' : 'failure'}">${escape(labels[h.status] ?? h.status)}</span><time>${escape(new Date(h.date).toLocaleString('pt-BR'))}</time><span class="muted">v${h.version}</span></summary><pre>${escape(h.code)}</pre></details>`).join('') : '<p class="muted">Suas últimas 20 submissões ficam aqui. Executar testes de prática não cria uma submissão.</p>';
  }
  main.querySelector('#hint-button').addEventListener('click', () => {
    if (revealedHints >= exercise.hints.length) return;
    const p = document.createElement('p');
    p.textContent = `${revealedHints + 1}. ${exercise.hints[revealedHints++]}`;
    main.querySelector('#hint-list').append(p);
    if (revealedHints === exercise.hints.length) { main.querySelector('#hint-button').disabled = true; main.querySelector('#hint-button').textContent = 'Todas as dicas abertas'; }
  });
  main.querySelector('#add-case').addEventListener('click', () => { if (cases.length >= 20) return; cases.push({ input: '', expected: '' }); renderCases(); main.querySelector('#add-case').disabled = cases.length >= 20; });
  async function run(official) {
    if (controller) return;
    const code = editor.state.doc.toString();
    if (code.length > LIMITS.codeLimit) { main.querySelector('#run-status').textContent = 'O código deve ter até 100 mil caracteres.'; return; }
    const currentController = new AbortController();
    controller = currentController;
    main.querySelectorAll('#run, #submit, #add-case, #cases button, #cases textarea').forEach(el => { el.disabled = true; });
    main.querySelector('#cancel').hidden = false;
    const result = await evaluate(code, official ? exercise.tests : structuredClone(cases), {
      official, signal: currentController.signal,
      onProgress: ({ index, total, phase }) => {
        if (token !== pageToken) return;
        main.querySelector('#run-status').textContent = `${official ? 'Submissão' : 'Prática'} · Teste ${index + 1} de ${total} · ${phase === 'loading' ? 'Preparando Python… Na primeira vez, o download pode demorar.' : 'Executando…'}`;
      },
    });
    if (token !== pageToken) return;
    controller = null;
    main.querySelectorAll('#run, #submit, #add-case').forEach(el => { el.disabled = false; });
    renderCases();
    main.querySelector('#cancel').hidden = true;
    main.querySelector('#run-status').textContent = `${official ? 'Submissão' : 'Prática'}: ${labels[result.status]}.`;
    main.querySelector('#results').innerHTML = `<h3 class="${result.status === 'accepted' ? 'success' : 'failure'}">${escape(labels[result.status])}</h3><p class="muted small">${official ? 'Avaliação oficial. A submissão encerra na primeira falha.' : 'Testes de prática. Para registrar a resolução, envie a solução.'}</p>${result.results.map(r => `<details class="result-case" ${r.status !== 'accepted' && !r.hidden ? 'open' : ''}><summary>${r.hidden ? 'Teste oculto' : `Teste ${r.index + 1}`} <span class="${r.status === 'accepted' ? 'success' : 'failure'}">${escape(labels[r.status])}</span></summary>${r.hidden ? '<p>Os dados deste caso não são exibidos. Revise as restrições e consulte as dicas.</p>' : `<div class="result-data"><div><small>ENTRADA</small><pre>${escape(r.input)}</pre></div><div><small>ESPERADO</small><pre>${escape(r.expected)}</pre></div><div><small>OBTIDO</small><pre>${escape(r.output)}</pre></div></div>${r.error ? `<pre class="error">${escape(r.error)}</pre>` : ''}`}</details>`).join('')}${result.status === 'environment-error' ? '<p>Não foi possível preparar o Python. Verifique sua conexão e tente novamente. Seu código permanece no editor.</p>' : ''}`;
    if (official) store.save(exercise.id, addSubmission(store.get(exercise.id), exercise, code, result.status));
    renderHistory();
  }
  main.querySelector('#run').addEventListener('click', () => run(false));
  main.querySelector('#submit').addEventListener('click', () => run(true));
  main.querySelector('#cancel').addEventListener('click', () => controller?.abort());
  renderCases();
  renderHistory();
}
function route() {
  controller?.abort(); controller = null;
  editor?.destroy(); editor = null;
  pageToken++;
  const match = location.hash.match(/^#\/exercicio\/([a-z0-9-]+)$/);
  if (!location.hash || location.hash === '#') { document.title = 'Codelearn · Pratique Python'; catalog(); }
  else {
    const exercise = match && exercises.find(e => e.id === match[1]);
    if (exercise) { document.title = `${exercise.title} · Codelearn`; exercisePage(exercise); }
    else main.innerHTML = '<section class="not-found"><p class="eyebrow">EXERCÍCIO NÃO ENCONTRADO</p><h1>Vamos tentar outro caminho?</h1><a class="button primary" href="#">Voltar aos exercícios</a></section>';
  }
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
