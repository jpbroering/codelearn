const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
export function matchesExercise(exercise, query, topic = '') {
  if (topic && exercise.topic !== topic) return false;
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean).map(term => ['laco', 'lacos'].includes(term) ? 'repeticoes' : term);
  const text = normalize(`${exercise.title} ${exercise.summary} ${exercise.topic}`);
  return terms.every(term => text.includes(term));
}
export function practiceLabel(exercises, store) {
  const started = exercises.some(exercise => {
    const record = store.get(exercise.id);
    return record.draft !== null || record.history.length > 0 || record.passedVersion !== null;
  });
  return started ? 'Continuar praticando' : 'Começar a praticar';
}
