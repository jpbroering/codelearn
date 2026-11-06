import test from 'node:test';
import assert from 'node:assert/strict';
import { execute, LIMITS } from '../src/executor.js';

function fakeWorker() {
  const events = new EventTarget();
  return {
    terminated: 0,
    sent: [],
    addEventListener: events.addEventListener.bind(events),
    terminate() { this.terminated++; },
    postMessage(data) { this.sent.push(data); },
    emit(type, data) {
      const event = new Event(type);
      event.data = data;
      events.dispatchEvent(event);
    },
  };
}

test('executor aguarda readiness, envia código e encerra o Worker uma única vez', async () => {
  const worker = fakeWorker();
  const phases = [];
  const running = execute('print(1)', 'entrada', { workerFactory: () => worker, onPhase: phase => phases.push(phase) });
  assert.deepEqual(phases, ['loading']);
  assert.deepEqual(worker.sent, []);
  worker.emit('message', { type: 'ready' });
  assert.deepEqual(phases, ['loading', 'running']);
  assert.deepEqual(worker.sent, [{ code: 'print(1)', input: 'entrada', outputLimit: LIMITS.outputLimit }]);
  worker.emit('message', { type: 'result', result: { status: 'completed', output: '1\n' } });
  assert.deepEqual(await running, { status: 'completed', output: '1\n' });
  worker.emit('message', { type: 'ready' });
  worker.emit('message', { type: 'failure' });
  assert.equal(worker.sent.length, 1);
  assert.equal(worker.terminated, 1);
});

test('cancelamento anterior não cria Worker; cancelamento ativo encerra os recursos', async () => {
  const controller = new AbortController(); controller.abort();
  assert.deepEqual(await execute('', '', { signal: controller.signal, workerFactory: () => { throw Error('Não deve criar'); } }), { status: 'cancelled' });
  const active = new AbortController();
  const worker = fakeWorker();
  const running = execute('', '', { signal: active.signal, workerFactory: () => worker });
  active.abort();
  assert.deepEqual(await running, { status: 'cancelled' });
  assert.equal(worker.terminated, 1);
});

test('falhas de criação, carregamento e erro do Worker preservam o diagnóstico', async () => {
  assert.deepEqual(await execute('', '', { workerFactory: () => { throw Error('Criação'); } }), { status: 'environment-error' });
  for (const event of ['error', 'failure']) {
    const worker = fakeWorker();
    const running = execute('', '', { workerFactory: () => worker });
    if (event === 'error') worker.emit('error');
    else worker.emit('message', { type: 'failure' });
    assert.deepEqual(await running, { status: 'environment-error' });
    assert.equal(worker.terminated, 1);
  }
  const worker = fakeWorker();
  const result = await execute('', '', { workerFactory: () => worker, limits: { ...LIMITS, startupMs: 1 } });
  assert.deepEqual(result, { status: 'environment-error' });
  assert.equal(worker.terminated, 1);
});
