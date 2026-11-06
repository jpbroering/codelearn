export const LIMITS = Object.freeze({ startupMs: 60000, executionMs: 3000, outputLimit: 20000, codeLimit: 100000 });

// Um Worker novo por caso impede que variáveis, módulos ou builtins vazem entre testes.
export function execute(code, input, { signal, onPhase = () => {}, workerFactory, limits = LIMITS } = {}) {
  return new Promise((resolve) => {
    if (signal?.aborted) return resolve({ status: 'cancelled' });
    let worker, timer, done = false;
    const finish = (result) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      signal?.removeEventListener('abort', cancel);
      worker?.terminate();
      resolve(result);
    };
    const cancel = () => finish({ status: 'cancelled' });
    try {
      worker = workerFactory ? workerFactory() : new Worker(new URL(`${import.meta.env.BASE_URL}python-worker.js`, window.location.href), { type: 'classic' });
      signal?.addEventListener('abort', cancel, { once: true });
      onPhase('loading');
      timer = setTimeout(() => finish({ status: 'environment-error' }), limits.startupMs);
      worker.addEventListener('error', () => finish({ status: 'environment-error' }));
      worker.addEventListener('message', ({ data }) => {
        if (done) return;
        if (data.type === 'ready') {
          clearTimeout(timer);
          onPhase('running');
          timer = setTimeout(() => finish({ status: 'time-limit' }), limits.executionMs);
          worker.postMessage({ code, input, outputLimit: limits.outputLimit });
        } else if (data.type === 'result') finish(data.result);
        else if (data.type === 'failure') finish({ status: 'environment-error' });
      });
    } catch {
      finish({ status: 'environment-error' });
    }
  });
}
