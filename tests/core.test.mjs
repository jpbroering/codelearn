import test from 'node:test';
import assert from 'node:assert/strict';
import { compare, evaluate } from '../src/evaluator.js';
import { createStore, emptyRecord, addSubmission, progress } from '../src/storage.js';

test('comparação respeita espaços e permite somente uma quebra final', () => {
  assert.ok(compare('15\r\n', '15'));
  assert.ok(compare('a\rb\n', 'a\nb'));
  assert.ok(!compare('15\n\n', '15'));
  assert.ok(!compare(' 15', '15'));
  assert.ok(!compare('SIM', 'sim'));
});
test('ocultos não expõem saída nem erros; avaliação oficial encerra na falha', async () => {
  let count = 0;
  const results = await evaluate('code', [{ input: 'segredo', expected: 'outro segredo', visible: false }, { input: '', expected: '' }], {
    official: true, run: async () => { count++; return { status: 'runtime-error', output: 'segredo', error: 'segredo' }; },
  });
  assert.equal(count, 1);
  assert.equal(results.status, 'runtime-error');
  assert.deepEqual(results.results, [{ index: 0, hidden: true, status: 'runtime-error' }]);
});
test('prática continua após falha e mantém casos oficiais intactos', async () => {
  const cases = [{ input: '1', expected: '2', visible: true }, { input: '3', expected: '3', visible: true }];
  const original = structuredClone(cases);
  const results = await evaluate('code', cases, { run: async (_, input) => ({ status: 'completed', output: input }) });
  assert.equal(results.results.length, 2);
  assert.equal(results.status, 'wrong-answer');
  assert.deepEqual(cases, original);
});
test('histórico limitado, resolução permanece e nova versão exige revalidação', () => {
  const exercise = { id: 'a', version: 1 };
  let record = addSubmission(emptyRecord(), exercise, 'print(1)', 'accepted');
  for (let i = 0; i < 25; i++) record = addSubmission(record, exercise, `${i}`, 'wrong-answer');
  assert.equal(record.history.length, 20);
  assert.equal(progress(record, exercise), 'Resolvido');
  assert.equal(progress(record, { ...exercise, version: 2 }), 'Revalidar');
  assert.deepEqual(addSubmission(record, exercise, '', 'cancelled'), record);
  assert.deepEqual(addSubmission(record, exercise, '', 'environment-error'), record);
});
test('rascunho vazio é preservado e registro retorna após reabrir armazenamento', () => {
  const map = new Map(); const storage = { getItem: k => map.get(k), setItem: (k, v) => map.set(k, v) };
  createStore(storage).save('a', { ...emptyRecord(), draft: '' });
  assert.equal(createStore(storage).get('a').draft, '');
});
test('armazenamento bloqueado ou corrompido usa memória com aviso', () => {
  let warnings = 0;
  const store = createStore({ getItem() { return '{'; }, setItem() { throw Error(); } }, () => warnings++);
  const record = store.get('a'); record.draft = 'print(1)'; store.save('a', record);
  assert.equal(store.get('a').draft, 'print(1)');
  assert.equal(warnings, 2);
});

test('cache retorna cópias independentes e evita reler armazenamento', () => {
  let reads = 0;
  const storage = { getItem() { reads++; return null; }, setItem() {} };
  const store = createStore(storage);
  const record = store.get('a');
  record.draft = 'print(1)';
  record.history.push({ date: '2026-11-06', code: 'print(1)', version: 1, status: 'accepted' });
  assert.equal(store.get('a').draft, null);
  store.save('a', record);
  record.history[0].code = 'alterado';
  assert.equal(store.get('a').history[0].code, 'print(1)');
  assert.equal(reads, 1);
});

test('registro JSON com estrutura inválida é rejeitado com aviso', () => {
  for (const value of [null, {}, { draft: 1, history: [], passedVersion: null }, { draft: null, history: [{}], passedVersion: null }]) {
    let warnings = 0;
    const store = createStore({ getItem: () => JSON.stringify(value) }, () => warnings++);
    assert.deepEqual(store.get('a'), emptyRecord());
    assert.equal(warnings, 1);
  }
});
