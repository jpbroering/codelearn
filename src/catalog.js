const modules = import.meta.glob('../content/exercises/*.json', { eager: true, import: 'default' });
const order = ['Entrada e saída', 'Decisões', 'Repetições'];
export const exercises = Object.values(modules).sort((a, b) => order.indexOf(a.topic) - order.indexOf(b.topic) || a.title.localeCompare(b.title));
