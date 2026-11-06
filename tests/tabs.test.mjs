import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createPracticeTests, MAX_CASES } from '../src/practice-tests.js';
import { createTabs } from '../src/tabs.js';
import { evaluate } from '../src/evaluator.js';
function setup() {
  const dom = new JSDOM('<main><div id="cases"></div></main>');
  const root = dom.window.document.querySelector('#cases');
  const practice = createPracticeTests(root, [{ input: '9\n4', expected: '5' }, { input: '2\n8', expected: '6' }, { input: '5\n5', expected: '0' }]);
  return { dom, root, practice, document: dom.window.document };
}
function activePanel(root) { return root.querySelector('[role="tabpanel"]:not([hidden])'); }
test('um caso visível por vez e valores preservados ao trocar de aba', () => {
  const { root, practice, dom } = setup();
  assert.equal(root.querySelectorAll('[role="tabpanel"]:not([hidden])').length, 1);
  const field = activePanel(root).querySelector('[data-field="input"]');
  field.value = '10\n3'; field.dispatchEvent(new dom.window.Event('input'));
  root.querySelectorAll('[role="tab"]')[1].click();
  assert.equal(activePanel(root).querySelector('[data-field="input"]').value, '2\n8');
  root.querySelectorAll('[role="tab"]')[0].click();
  assert.equal(activePanel(root).querySelector('[data-field="input"]').value, '10\n3');
  assert.equal(practice.getCases()[0].input, '10\n3');
});
test('setas, Home e End alternam seleção, foco e painel associado', () => {
  const { root, dom, document } = setup();
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  tabs[0].focus();
  tabs[0].dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
  assert.equal(document.activeElement, tabs[2]);
  assert.equal(tabs[2].getAttribute('aria-selected'), 'true');
  assert.equal(root.querySelectorAll('[role="tabpanel"]:not([hidden])').length, 1);
  tabs[2].dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
  assert.equal(document.activeElement, tabs[0]);
  tabs[0].dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'End', bubbles: true }));
  assert.equal(document.activeElement, tabs[2]);
  assert.equal(tabs.filter(tab => tab.tabIndex === 0).length, 1);
});
test('abas mostram andamento e resultado de cada caso antes do fim da avaliação', async () => {
  const { root, practice } = setup();
  practice.begin();
  assert.equal(root.querySelector('textarea').disabled, true);
  const statuses = [];
  await evaluate('code', practice.getCases(), {
    run: async (_, input, { onPhase }) => {
      onPhase('loading');
      assert.match(root.querySelector('[data-status="running"]').getAttribute('aria-label'), /Preparando Python/);
      onPhase('running');
      return { status: 'completed', output: input.startsWith('9') ? '5' : 'wrong' };
    },
    onProgress: ({ index, phase }) => practice.phase(index, phase),
    onCaseResult: result => { practice.result(result); statuses.push(root.querySelectorAll('[role="tab"]')[result.index].dataset.status); },
  });
  practice.finish();
  assert.deepEqual(statuses, ['success', 'failure', 'failure']);
  assert.equal(root.querySelector('textarea').disabled, false);
  assert.match(root.querySelector('[role="tab"]').getAttribute('aria-label'), /Aprovado/);
});
test('editar um caso limpa seu resultado; alterar código invalida todos', () => {
  const { root, practice, dom } = setup();
  practice.result({ index: 0, status: 'accepted', output: '5' });
  practice.result({ index: 1, status: 'accepted', output: '6' });
  const field = activePanel(root).querySelector('[data-field="expected"]');
  field.value = '99'; field.dispatchEvent(new dom.window.Event('input'));
  assert.equal(root.querySelectorAll('[role="tab"]')[0].dataset.status, 'neutral');
  assert.equal(root.querySelectorAll('[role="tab"]')[1].dataset.status, 'success');
  assert.equal(activePanel(root).querySelector('.case-output').hidden, true);
  practice.invalidate();
  assert.ok([...root.querySelectorAll('[role="tab"]')].every(tab => tab.dataset.status === 'neutral'));
});
test('adicionar e remover preserva dados e garante ao menos um caso', () => {
  const { root, practice } = setup();
  root.querySelector('.add-case').click();
  assert.equal(root.querySelector('[aria-selected="true"] .case-name').textContent, 'Teste 4');
  assert.equal(practice.getCases().length, 4);
  activePanel(root).querySelector('.remove-case').click();
  assert.equal(practice.getCases().length, 3);
  assert.equal(activePanel(root).querySelector('[data-field="expected"]').value, '0');
  while (practice.getCases().length > 1) activePanel(root).querySelector('.remove-case').click();
  assert.equal(activePanel(root).querySelector('.remove-case').disabled, true);
  assert.equal(practice.getCases()[0].expected, '5');
  while (practice.getCases().length < MAX_CASES) root.querySelector('.add-case').click();
  assert.equal(root.querySelector('.add-case').disabled, true);
});
test('durante execução, abas continuam navegáveis e cancelamento limpa pendentes', () => {
  const { root, practice } = setup();
  practice.begin();
  root.querySelectorAll('[role="tab"]')[1].click();
  assert.equal(activePanel(root).querySelector('[data-field="expected"]').value, '6');
  assert.equal(root.querySelector('.add-case').disabled, true);
  practice.result({ index: 0, status: 'cancelled', output: '' });
  practice.finish();
  assert.match(root.querySelectorAll('[role="tab"]')[0].getAttribute('aria-label'), /Cancelado/);
  assert.match(root.querySelectorAll('[role="tab"]')[1].getAttribute('aria-label'), /Não executado/);
});
test('resultados são texto, sem executar HTML enviado pelo aluno', () => {
  const { root, practice } = setup();
  practice.result({ index: 0, status: 'wrong-answer', output: '<img src=x onerror=alert(1)>' });
  assert.equal(root.querySelector('.case-output img'), null);
  assert.match(root.querySelector('.case-output').textContent, /<img/);
});
test('resultado incremental oficial mantém casos ocultos sem dados', async () => {
  let callbackResult;
  await evaluate('', [{ input: 'segredo', expected: 'segredo', visible: false }], {
    official: true, run: async () => ({ status: 'runtime-error', output: 'segredo', error: 'segredo' }),
    onCaseResult: result => { callbackResult = result; },
  });
  assert.deepEqual(callbackResult, { index: 0, hidden: true, status: 'runtime-error' });
});
test('abas do painel não alteram a seleção de grupos internos', () => {
  const dom = new JSDOM('<section id="root"><div role="tablist"><button id="a" role="tab" aria-controls="p1">Testes</button><button id="b" role="tab" aria-controls="p2">Resultado</button></div><div id="p1" role="tabpanel"><div role="tablist"><button role="tab" aria-selected="true">Teste 1</button></div></div><div id="p2" role="tabpanel"></div></section>');
  const root = dom.window.document.querySelector('#root');
  const tabs = createTabs(root); tabs.select('b');
  assert.equal(dom.window.document.querySelector('#p1').hidden, true);
  assert.equal(root.querySelector('#p1 [role="tab"]').getAttribute('aria-selected'), 'true');
});
