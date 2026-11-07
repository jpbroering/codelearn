import test from 'node:test';
import assert from 'node:assert/strict';
import { Worker } from 'node:worker_threads';
import { readdir, readFile } from 'node:fs/promises';
import { execute, LIMITS } from '../src/executor.js';
import { evaluate } from '../src/evaluator.js';
const workerFactory = () => {
  const worker = new Worker(new URL('./node-worker.mjs', import.meta.url));
  return { addEventListener: (event, callback) => worker.on(event, event === 'message' ? data => callback({ data }) : callback), postMessage: data => worker.postMessage(data), terminate: () => worker.terminate() };
};
const run = (code, input, options = {}) => execute(code, input, { ...options, workerFactory });
test('soluções de referência passam em todos os casos oficiais', { timeout: 600000 }, async t => {
  for (const file of await readdir(new URL('../content/exercises/', import.meta.url))) {
    const exercise = JSON.parse(await readFile(new URL(`../content/exercises/${file}`, import.meta.url), 'utf8'));
    await t.test(exercise.id, { timeout: 120000 }, async () => {
      assert.equal(exercise.id + '.json', file);
      assert.ok(exercise.tests.some(test => test.visible) && exercise.tests.some(test => !test.visible));
      const solution = await readFile(new URL(`../content/solutions/${exercise.id}.py`, import.meta.url), 'utf8');
      const start = performance.now();
      const result = await evaluate(solution, exercise.tests, { official: true, run });
      assert.equal(result.status, 'accepted', JSON.stringify(result));
      console.log(`${exercise.id}: ${exercise.tests.length} casos em ${Math.round(performance.now() - start)}ms`);
    });
  }
});
test('entrada exaurida, sintaxe e exceção retornam erro de execução', { timeout: 60000 }, async () => {
  for (const [code, error] of [['input(); input()', 'EOFError'], ['if True print(1)', 'SyntaxError'], ['1 / 0', 'ZeroDivisionError']]) {
    const result = await run(code, '1\n');
    assert.equal(result.status, 'runtime-error');
    assert.ok(result.error.includes(error), result.error);
  }
});
test('loop infinito termina por timeout e próxima execução funciona', { timeout: 30000 }, async () => {
  assert.equal((await run('while True: pass', '', { limits: { ...LIMITS, executionMs: 150 } })).status, 'time-limit');
  assert.equal((await run('print(42)', '')).output, '42\n');
});
test('saída excessiva termina no limite', { timeout: 30000 }, async () => {
  assert.equal((await run('while True: print("x" * 1000)', '')).status, 'output-limit');
});
test('cancelamento durante execução e durante carregamento', { timeout: 30000 }, async () => {
  const controller = new AbortController();
  const running = run('while True: pass', '', { signal: controller.signal, onPhase: phase => { if (phase === 'running') setTimeout(() => controller.abort(), 30); } });
  assert.equal((await running).status, 'cancelled');
  const loadingController = new AbortController();
  const loading = run('print(1)', '', { signal: loadingController.signal });
  loadingController.abort();
  assert.equal((await loading).status, 'cancelled');
});
test('variáveis e builtins não vazam entre casos', { timeout: 30000 }, async () => {
  await run('import builtins\nbuiltins.LEAK = 42\nstate = 1', '');
  const result = await run('import builtins\nprint(hasattr(builtins, "LEAK"))\nprint("state" in globals())', '');
  assert.equal(result.output, 'False\nFalse\n');
});
