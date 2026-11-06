import { mkdir, copyFile } from 'node:fs/promises';
const root = new URL('../node_modules/pyodide/', import.meta.url);
const target = new URL('../public/runtime/', import.meta.url);
await mkdir(target, { recursive: true });
for (const file of ['pyodide.js', 'pyodide.asm.js', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json']) {
  await copyFile(new URL(file, root), new URL(file, target));
}
console.log('Runtime Python preparado em public/runtime.');
