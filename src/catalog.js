const modules = import.meta.glob('../content/exercises/*.json', { eager: true, import: 'default' });
const topicOrder = ['Entrada e saída', 'Decisões', 'Repetições'];

export const exercises = Object.values(modules).sort((first, second) => {
  const topicDifference = topicOrder.indexOf(first.topic) - topicOrder.indexOf(second.topic);
  return topicDifference || first.title.localeCompare(second.title);
});
