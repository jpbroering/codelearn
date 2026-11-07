import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { matchesExercise, practiceLabel } from '../src/catalog-search.js';
import { installSkipLink, installWorkbenchToggle } from '../src/workspace-actions.js';
import { explainError } from '../src/diagnostics.js';
import { differenceMarkup, diagnosticMarkup } from '../src/result-view.js';
import { createStore, emptyRecord, addSubmission } from '../src/storage.js';

test('pular conteúdo preserva a rota e foca o main', () => {
  const dom = new JSDOM('<a href="#main">Pular</a><main tabindex="-1"></main>', { url: 'https://example.org/#/exercicio/a' });
  const { document } = dom.window;
  installSkipLink(document.querySelector('a'), document.querySelector('main'));
  document.querySelector('a').click();
  assert.equal(dom.window.location.hash, '#/exercicio/a');
  assert.equal(document.activeElement, document.querySelector('main'));
});
test('busca aceita tema, acentos e sinônimos sem ignorar filtro', () => {
  const exercise = { title: 'Contagem de pares', summary: 'Conte valores', topic: 'Repetições' };
  for (const query of ['laços', 'lacos', 'LAÇO', 'repeticoes', 'pares']) assert.ok(matchesExercise(exercise, query));
  assert.ok(!matchesExercise(exercise, 'laços', 'Decisões'));
  assert.ok(!matchesExercise(exercise, 'triângulos'));
});
test('começar depende de atividade e não apenas de exercícios aprovados', () => {
  assert.equal(practiceLabel([{ id: 'a' }], { get: () => emptyRecord() }), 'Começar a praticar');
  assert.equal(practiceLabel([{ id: 'a' }], { get: () => ({ ...emptyRecord(), draft: '' }) }), 'Continuar praticando');
});
test('expansão preserva o editor e permite retorno', () => {
  const dom = new JSDOM('<div id="column"><section id="editor">código</section><button aria-expanded="false"></button></div>');
  const doc = dom.window.document, column = doc.querySelector('#column'), editor = doc.querySelector('#editor'), button = doc.querySelector('button');
  installWorkbenchToggle(button, column, editor);
  button.click(); assert.ok(editor.hidden); assert.ok(column.classList.contains('workbench-expanded'));
  button.click(); assert.ok(!editor.hidden); assert.equal(editor.textContent, 'código');
});
test('diferença segue a normalização do avaliador e distingue linhas e espaços', () => {
  assert.equal(differenceMarkup('1\r\n', '1'), '');
  assert.match(differenceMarkup('7\n10', '7\n9'), /Linha 2/);
  assert.match(differenceMarkup('7', '7\n9'), /linha ausente/);
  assert.match(differenceMarkup('7\n\n', '7'), /linha vazia/);
  assert.match(differenceMarkup(' 7', '7'), /&quot; 7&quot;/);
  assert.equal(diagnosticMarkup({ hidden: true, error: 'segredo' }), '');
});
test('histórico antigo e diagnóstico inválido preservam rascunho e resolução', () => {
  const old = addSubmission({ ...emptyRecord(), draft: 'rascunho' }, { version: 1 }, 'code', 'accepted');
  old.history[0].diagnostic = { garbage: true };
  const store = createStore({ getItem: () => JSON.stringify(old) });
  const record = store.get('a');
  assert.equal(record.draft, 'rascunho'); assert.equal(record.passedVersion, 1);
  assert.equal(record.history.length, 1); assert.equal(record.history[0].diagnostic, undefined);
});
test('novas tentativas preservam diagnóstico visível e redigem caso oculto', () => {
  for (const hidden of [false, true]) {
    const result = { index: 2, hidden, status: 'runtime-error', input: 'secret', expected: 'secret', output: 'secret', error: 'secret', errorType: 'ValueError', errorLine: 3 };
    const record = addSubmission(emptyRecord(), { version: 1 }, 'code', 'runtime-error', undefined, { results: [result] });
    const diagnostic = record.history[0].diagnostic;
    if (hidden) assert.deepEqual(diagnostic, { index: 2, hidden: true, status: 'runtime-error' });
    else { assert.equal(diagnostic.errorLine, 3); assert.equal(diagnostic.error, 'secret'); }
  }
});

test('tipos de erro desconhecidos usam orientação genérica', () => {
  assert.match(explainError('constructor'), /mensagem original/);
  assert.match(explainError('MinhaExcecao'), /mensagem original/);
});
