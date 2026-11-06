import { readdir, readFile } from 'node:fs/promises';
export async function loadExercises() {
  const directory = new URL('../content/exercises/', import.meta.url);
  const exercises = [];
  const ids = new Set();
  for (const file of await readdir(directory)) {
    if (!file.endsWith('.json')) continue;
    const exercise = JSON.parse(await readFile(new URL(file, directory), 'utf8'));
    const error = message => { throw new Error(`${file}: ${message}`); };
    for (const key of ['id', 'title', 'topic', 'difficulty', 'summary', 'statement', 'inputFormat', 'outputFormat', 'constraints']) {
      if (typeof exercise[key] !== 'string' || !exercise[key].trim()) error(`campo ${key} deve ser texto não vazio`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(exercise.id) || file !== `${exercise.id}.json` || ids.has(exercise.id)) error('identificador inválido, duplicado ou diferente do nome do arquivo');
    ids.add(exercise.id);
    if (!Number.isInteger(exercise.version) || exercise.version < 1) error('versão deve ser inteiro positivo');
    if (exercise.starter !== undefined && typeof exercise.starter !== 'string') error('código inicial inválido');
    if (!Array.isArray(exercise.hints) || !exercise.hints.every(h => typeof h === 'string' && h.trim())) error('dicas inválidas');
    if (!Array.isArray(exercise.tests) || !exercise.tests.length || !exercise.tests.every(t => typeof t.input === 'string' && typeof t.expected === 'string' && typeof t.visible === 'boolean')) error('testes inválidos');
    if (!exercise.tests.some(t => t.visible) || !exercise.tests.some(t => !t.visible)) error('forneça casos visíveis e ocultos');
    exercises.push(exercise);
  }
  if (!exercises.length) throw Error('O catálogo não pode estar vazio');
  return exercises;
}
if (process.argv[1] === new URL(import.meta.url).pathname) {
  console.log(`${(await loadExercises()).length} exercícios validados.`);
}
