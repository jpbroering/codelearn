export const LIMITS = Object.freeze({ startupMs: 60000, executionMs: 3000, outputLimit: 20000, codeLimit: 100000 });

// Um Worker novo por caso impede que variáveis, módulos ou builtins vazem entre testes.
export function execute(code, input, { signal, onPhase = () => {}, workerFactory, limits = LIMITS } = {}) {
  return new Promise((resolve) => {
    if (signal?.aborted) return resolve({ status: 'cancelled' });
    let worker;
    let timer;
    let finished = false;
    const finish = (result) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      signal?.removeEventListener('abort', cancel);
      worker?.terminate();
      resolve(result);
    };
    const cancel = () => finish({ status: 'cancelled' });
    function handleMessage({ data }) {
      if (finished) return;

      switch (data.type) {
        case 'ready':
          clearTimeout(timer);
          onPhase('running');
          timer = setTimeout(() => finish({ status: 'time-limit' }), limits.executionMs);
          worker.postMessage({ code, input, outputLimit: limits.outputLimit });
          break;
        case 'result':
          finish(data.result);
          break;
        case 'failure':
          finish({ status: 'environment-error' });
          break;
      }
    }

    try {
      if (workerFactory) {
        worker = workerFactory();
      } else {
        const workerUrl = new URL(`${import.meta.env.BASE_URL}python-worker.js`, window.location.href);
        worker = new Worker(workerUrl, { type: 'classic' });
      }
      signal?.addEventListener('abort', cancel, { once: true });
      onPhase('loading');
      timer = setTimeout(() => finish({ status: 'environment-error' }), limits.startupMs);
      worker.addEventListener('error', () => finish({ status: 'environment-error' }));
      worker.addEventListener('message', handleMessage);
    } catch {
      finish({ status: 'environment-error' });
    }
  });
}
