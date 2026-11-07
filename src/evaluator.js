import { safeCaseResult } from './diagnostics.js';
import { execute } from './executor.js';
export function normalize(output) {
  return output.replace(/\r\n?/g, '\n').replace(/\n$/, '');
}
export function compare(actual, expected) { return normalize(actual) === normalize(expected); }
export const labels = {
  accepted: 'Aprovado', 'wrong-answer': 'Resposta incorreta', 'runtime-error': 'Erro de execução',
  'time-limit': 'Tempo excedido', 'output-limit': 'Saída excedida', cancelled: 'Cancelado',
  'environment-error': 'Falha do ambiente',
};
export async function evaluate(code, tests, { official = false, run = execute, onCaseResult = () => {}, ...options } = {}) {
  const results = [];
  for (let index = 0; index < tests.length; index++) {
    const test = tests[index];
    const result = await run(code, test.input, { ...options, onPhase: phase => options.onProgress?.({ index, total: tests.length, phase }) });
    let status = result.status;
    if (status === 'completed') {
      status = compare(result.output, test.expected) ? 'accepted' : 'wrong-answer';
    }

    // Não encaminhar saídas nem mensagens de erro de casos ocultos para a interface/histórico.
    const caseResult = safeCaseResult({
      index, hidden: Boolean(official && !test.visible), status,
      input: test.input, expected: test.expected,
      output: result.output ?? '', error: result.error ?? '',
      errorType: result.errorType, errorLine: result.errorLine,
    });
    results.push(caseResult);
    onCaseResult(caseResult);

    const interrupted = status === 'cancelled' || status === 'environment-error';
    const failedSubmission = official && status !== 'accepted';
    if (interrupted || failedSubmission) break;
  }
  return { status: results.find(r => r.status !== 'accepted')?.status ?? 'accepted', results };
}
