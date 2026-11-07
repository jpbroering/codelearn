import test from 'node:test';
import assert from 'node:assert/strict';
import { Worker } from 'node:worker_threads';
import { execute } from '../src/executor.js';
import { explainError } from '../src/diagnostics.js';
const workerFactory = () => {
  const worker = new Worker(new URL('./node-worker.mjs', import.meta.url));
  return { addEventListener: (event, callback) => worker.on(event, event === 'message' ? data => callback({ data }) : callback), postMessage: data => worker.postMessage(data), terminate: () => worker.terminate() };
};
test('Python real informa tipo e linha do código do aluno', { timeout: 60000 }, async () => {
  for (const [code, type, line] of [
    ['n = input()\nprint(n - 1)', 'TypeError', 2],
    ['n = 1\nprint(', 'SyntaxError', 2],
    ['n = int("abc")', 'ValueError', 1],
    ['print(1/0)', 'ZeroDivisionError', 1],
    ['input()\ninput()', 'EOFError', 2],
    ['print(a)', 'NameError', 1],
  ]) {
    const result = await execute(code, '1\n', { workerFactory });
    assert.equal(result.status, 'runtime-error'); assert.equal(result.errorType, type); assert.equal(result.errorLine, line);
    assert.ok(explainError(type, result.error).length > 10);
  }
});
