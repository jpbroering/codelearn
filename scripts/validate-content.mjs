import { readdir, readFile } from 'node:fs/promises';

function validateExercise(exercise, file, ids) {
  const fail = message => { throw new Error(`${file}: ${message}`); };
  const textFields = ['id', 'title', 'topic', 'difficulty', 'summary', 'statement', 'inputFormat', 'outputFormat', 'constraints'];
  for (const key of textFields) {
    if (typeof exercise[key] !== 'string' || !exercise[key].trim()) {
      fail(`campo ${key} deve ser texto não vazio`);
    }
  }

  const validId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(exercise.id);
  const matchingFile = file === `${exercise.id}.json`;
  if (!validId || !matchingFile || ids.has(exercise.id)) {
    fail('identificador inválido, duplicado ou diferente do nome do arquivo');
  }
  ids.add(exercise.id);

  if (!Number.isInteger(exercise.version) || exercise.version < 1) fail('versão deve ser inteiro positivo');
  if (exercise.starter !== undefined && typeof exercise.starter !== 'string') fail('código inicial inválido');

  if (!Array.isArray(exercise.prerequisites) || !exercise.prerequisites.length || !exercise.prerequisites.every(value => typeof value === 'string' && value.trim())) fail('pré-requisitos inválidos');

  const validHints = Array.isArray(exercise.hints)
    && exercise.hints.every(hint => typeof hint === 'string' && hint.trim());
  if (!validHints) fail('dicas inválidas');

  const validTests = Array.isArray(exercise.tests)
    && exercise.tests.length
    && exercise.tests.every(test =>
      typeof test.input === 'string'
      && typeof test.expected === 'string'
      && typeof test.visible === 'boolean');
  if (!validTests) fail('testes inválidos');

  const hasVisible = exercise.tests.some(test => test.visible);
  const hasHidden = exercise.tests.some(test => !test.visible);
  if (!hasVisible || !hasHidden) fail('forneça casos visíveis e ocultos');
}

export async function loadExercises() {
  const directory = new URL('../content/exercises/', import.meta.url);
  const exercises = [];
  const ids = new Set();
  for (const file of await readdir(directory)) {
    if (!file.endsWith('.json')) continue;
    const exercise = JSON.parse(await readFile(new URL(file, directory), 'utf8'));
    validateExercise(exercise, file, ids);
    exercises.push(exercise);
  }
  if (!exercises.length) throw Error('O catálogo não pode estar vazio');
  return exercises;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  console.log(`${(await loadExercises()).length} exercícios validados.`);
}
