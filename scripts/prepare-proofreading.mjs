import { writeFile } from 'node:fs/promises';
import { loadExercises } from './validate-content.mjs';

const topicOrder = ['Entrada e saída', 'Decisões', 'Repetições'];
const exercises = (await loadExercises()).sort((first, second) => {
  const topicDifference = topicOrder.indexOf(first.topic) - topicOrder.indexOf(second.topic);
  return topicDifference || first.title.localeCompare(second.title);
});
const fence = value => `\`\`\`text\n${value.replace(/\n$/, '')}\n\`\`\``;
const sections = [
  '# Revisão dos exercícios',
  'Material preparado para proofreading. A revisão humana dos textos ainda está pendente.',
  'Este arquivo é gerado a partir dos JSONs. Registre sugestões por identificador em um documento separado; gerar novamente substitui esta cópia.',
  '## Roteiro de revisão',
  '- O enunciado explica o problema sem exigir conhecimento de contexto?\n- A entrada informa quantidade, ordem, tipo e organização das linhas?\n- A saída define palavras exatas, espaços e formatação decimal quando necessário?\n- Os exemplos estão de acordo com as regras e podem ser calculados à mão?\n- As restrições incluem os casos mencionados no texto?\n- As dicas ajudam progressivamente e não contradizem o enunciado?',
  `## Catálogo para revisão\n\n${exercises.length} exercícios. A ordem abaixo acompanha a organização por tema e título do site. As soluções de referência e os testes ocultos estão nos arquivos vinculados, para conferência técnica.`,
  '| Exercício | Tema | Casos visíveis / ocultos |\n| --- | --- | --- |\n' + exercises.map(exercise => `| [${exercise.title}](../content/exercises/${exercise.id}.json) | ${exercise.topic} | ${exercise.tests.filter(test => test.visible).length} / ${exercise.tests.filter(test => !test.visible).length} |`).join('\n'),
];

for (const [index, exercise] of exercises.entries()) {
  const examples = exercise.tests.filter(test => test.visible).map((test, exampleIndex) =>
    `#### Exemplo ${exampleIndex + 1}\n\nEntrada:\n\n${fence(test.input)}\n\nSaída esperada:\n\n${fence(test.expected)}`);
  sections.push(
    `## ${index + 1}. ${exercise.title}`,
    `Identificador: \`${exercise.id}\` · Tema: ${exercise.topic} · Nível: ${exercise.difficulty} · Versão: ${exercise.version}`,
    `**Você vai usar:** ${exercise.prerequisites.join(', ')}.`,
    `**Resumo:** ${exercise.summary}`,
    `**Enunciado**\n\n${exercise.statement}`,
    `**Entrada**\n\n${exercise.inputFormat}`,
    `**Saída**\n\n${exercise.outputFormat}`,
    `**Restrições**\n\n${exercise.constraints}`,
    ...examples,
    `**Dicas**\n\n${exercise.hints.map((hint, i) => `${i + 1}. ${hint}`).join('\n')}`,
    `[Enunciado e todos os testes](../content/exercises/${exercise.id}.json) · [Solução de referência](../content/solutions/${exercise.id}.py)`,
  );
}

await writeFile(new URL('../docs/revisao-validacao-colegas.md', import.meta.url), sections.join('\n\n') + '\n');
console.log(`Roteiro preparado com ${exercises.length} exercícios em docs/revisao-validacao-colegas.md.`);
