import test from 'node:test';
import assert from 'node:assert/strict';
import { loadExercises } from '../scripts/validate-content.mjs';

test('catálogo para validação contém os temas e exemplos previstos', async () => {
  const exercises = await loadExercises();
  assert.equal(exercises.filter(exercise => exercise.topic === 'Decisões').length, 5);
  assert.equal(exercises.filter(exercise => exercise.topic === 'Repetições').length, 15);
  for (const exercise of exercises) {
    assert.equal(exercise.tests.filter(item => item.visible).length, 3, exercise.id);
    assert.ok(exercise.tests.filter(item => !item.visible).length >= 3, exercise.id);
  }
  const examples = {
    'acesso-ao-evento': 'PERMITIDA', 'desconto-de-compra': '90',
    'intervalo-de-temperatura': 'FRIO', 'multiplo-de-cinco': 'SIM',
    'maioridade-com-acompanhante': 'NEGADA', 'numeros-ate-n': '1\n2\n3',
    'pares-ate-n': '2\n4\n6', 'impares-ate-n': '1\n3\n5',
    'intervalo-crescente': '2\n3\n4\n5', 'soma-de-intervalo': '10',
    'produto-de-um-ate-n': '24', 'soma-de-n-valores': '12',
    'contar-valores-positivos': '2', 'contar-multiplos-de-tres': '3',
    'menor-de-n-valores': '3', 'soma-ate-zero': '8',
    'contagem-ate-negativo': '3', 'soma-dos-pares-da-sequencia': '6',
    'quantidade-de-divisores': '4', 'potencia-por-repeticao': '8',
  };
  for (const exercise of exercises) assert.equal(exercise.tests[0].expected, examples[exercise.id], exercise.id);
});
