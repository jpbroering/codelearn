import { createTabs } from './tabs.js';
export const MAX_CASES = 20;
const states = {
  idle: { icon: '○', text: 'Não executado', tone: 'neutral' },
  queued: { icon: '…', text: 'Aguardando', tone: 'neutral' },
  loading: { icon: '◌', text: 'Preparando Python', tone: 'running' },
  running: { icon: '↻', text: 'Executando', tone: 'running' },
  accepted: { icon: '✓', text: 'Aprovado', tone: 'success' },
  'wrong-answer': { icon: '✕', text: 'Resposta incorreta', tone: 'failure' },
  'runtime-error': { icon: '!', text: 'Erro de execução', tone: 'failure' },
  'time-limit': { icon: '!', text: 'Tempo excedido', tone: 'failure' },
  'output-limit': { icon: '!', text: 'Saída excedida', tone: 'failure' },
  cancelled: { icon: '■', text: 'Cancelado', tone: 'neutral' },
  'environment-error': { icon: '!', text: 'Falha do ambiente', tone: 'failure' },
};

export function createPracticeTests(root, initialCases, { onChange = () => {} } = {}) {
  let sequence = 0, selectedId, busy = false;
  const makeCase = test => ({ id: `practice-case-${++sequence}`, input: test.input, expected: test.expected, status: 'idle', result: null });
  const cases = initialCases.map(makeCase);
  root.innerHTML = `<div class="case-tabbar"><div role="tablist" aria-label="Testes de prática" class="case-tabs"></div><button type="button" class="add-case" aria-label="Adicionar teste" title="Adicionar teste">＋</button></div><div class="case-panels"></div><p class="test-legend">✓ Aprovado <span>✕ Falhou</span> <span>↻ Executando</span></p>`;
  const list = root.querySelector('[role="tablist"]');
  const panels = root.querySelector('.case-panels');
  const add = root.querySelector('.add-case');
  const tabs = createTabs(root, { onChange: id => { selectedId = id; } });
  const element = (tag, className, text) => {
    const node = root.ownerDocument.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function updateCase(test) {
    const state = states[test.status] ?? states.idle;
    const button = root.ownerDocument.getElementById(`${test.id}-tab`);
    const panel = root.ownerDocument.getElementById(test.id);
    button.dataset.status = state.tone;
    button.querySelector('.case-icon').textContent = state.icon;
    button.setAttribute('aria-label', `${button.querySelector('.case-name').textContent}: ${state.text}`);
    button.title = state.text;
    panel.querySelector('.case-state').textContent = `${state.icon} ${state.text}`;
    panel.querySelector('.case-state').className = `case-state ${state.tone}`;
    const output = panel.querySelector('.case-output');
    output.replaceChildren();
    output.hidden = !test.result;
    if (test.result) {
      output.append(element('h3', null, 'Saída obtida'), element('pre', null, test.result.output || '(sem saída)'));
      if (test.result.error) output.append(element('pre', 'error', test.result.error));
      if (test.result.status === 'environment-error') output.append(element('p', null, 'Não foi possível preparar o Python. Verifique a conexão e tente novamente.'));
    }
  }
  function clear(test) { test.status = 'idle'; test.result = null; updateCase(test); }
  function render() {
    list.replaceChildren(); panels.replaceChildren();
    cases.forEach((test, index) => {
      const tab = element('button', 'case-tab');
      tab.type = 'button'; tab.id = `${test.id}-tab`;
      tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', test.id);
      const icon = element('span', 'case-icon'); icon.setAttribute('aria-hidden', 'true');
      tab.append(icon, element('span', 'case-name', `Teste ${index + 1}`));
      list.append(tab);
      const panel = element('div', 'test-case'); panel.id = test.id;
      panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', tab.id);
      panel.innerHTML = `<div class="case-heading"><span class="case-state"></span><button type="button" class="remove-case">Remover teste</button></div><div class="case-fields"><label>Entrada<textarea data-field="input" rows="4" spellcheck="false"></textarea></label><label>Saída esperada<textarea data-field="expected" rows="4" spellcheck="false"></textarea></label></div><div class="case-output" hidden></div>`;
      const remove = panel.querySelector('.remove-case');
      remove.disabled = busy || cases.length === 1;
      remove.setAttribute('aria-label', `Remover teste ${index + 1}`);
      remove.addEventListener('click', () => {
        if (busy || cases.length === 1) return;
        cases.splice(index, 1);
        selectedId = `${cases[Math.min(index, cases.length - 1)].id}-tab`;
        render(); tabs.select(selectedId, { focus: true }); onChange();
      });
      panel.querySelectorAll('textarea').forEach(field => {
        field.value = test[field.dataset.field]; field.disabled = busy;
        field.setAttribute('aria-label', `${field.dataset.field === 'input' ? 'Entrada' : 'Saída esperada'} do teste ${index + 1}`);
        field.addEventListener('input', () => { test[field.dataset.field] = field.value; clear(test); onChange(); });
      });
      panels.append(panel); updateCase(test);
    });
    add.disabled = busy || cases.length >= MAX_CASES;
    tabs.select(selectedId);
  }
  add.addEventListener('click', () => {
    if (busy || cases.length >= MAX_CASES) return;
    const test = makeCase({ input: '', expected: '' }); cases.push(test);
    selectedId = `${test.id}-tab`; render(); tabs.select(selectedId, { focus: true }); onChange();
  });
  function setBusy(value) {
    busy = value;
    root.querySelectorAll('textarea').forEach(field => { field.disabled = value; });
    root.querySelectorAll('.remove-case').forEach(button => { button.disabled = value || cases.length === 1; });
    add.disabled = value || cases.length >= MAX_CASES;
  }
  render();
  return {
    getCases: () => cases.map(({ input, expected }) => ({ input, expected })),
    invalidate: () => cases.forEach(clear),
    setBusy,
    begin() { cases.forEach(test => { test.status = 'queued'; test.result = null; updateCase(test); }); setBusy(true); },
    phase(index, phase) { const test = cases[index]; if (test) { test.status = phase; updateCase(test); } },
    result(result) { const test = cases[result.index]; if (test) { test.status = result.status; test.result = result; updateCase(test); } },
    finish() { cases.filter(test => ['queued', 'loading', 'running'].includes(test.status)).forEach(clear); setBusy(false); },
  };
}
