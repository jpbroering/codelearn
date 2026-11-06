// Adaptador de teste: executa o MESMO script de produção com Pyodide real no Node.
import { parentPort } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';
import { loadPyodide } from 'pyodide';
globalThis.self = globalThis;
self.location = { href: new URL('../public/python-worker.js', import.meta.url).href };
globalThis.importScripts = () => {};
globalThis.loadPyodide = () => loadPyodide({ indexURL: fileURLToPath(new URL('../node_modules/pyodide/', import.meta.url)) });
self.postMessage = message => parentPort.postMessage(message);
parentPort.on('message', data => self.onmessage?.({ data }));
await import('../public/python-worker.js');
