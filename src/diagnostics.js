export function explainError(type, message = '') {
  if (type === 'TypeError' && /unsupported operand.*'str'.*'int'|unsupported operand.*'int'.*'str'/.test(message)) return 'Uma operação recebeu texto e número. input() retorna texto; confira se a entrada precisa de int() ou float().';
  const hints = {
    SyntaxError: /was never closed/.test(message) ? 'Falta fechar um parêntese, colchete ou chave. Confira a linha indicada.' : 'Revise a sintaxe na linha indicada: parênteses, dois-pontos e comandos incompletos.',
    IndentationError: 'Confira os recuos dos blocos de código.', TabError: 'Use uma forma consistente de indentação; evite misturar tabulações e espaços.',
    NameError: 'Confira o nome da variável e se ela recebeu um valor antes de ser usada.',
    ValueError: 'Um valor não pôde ser convertido ou usado no formato esperado. Confira a entrada e a conversão.',
    TypeError: 'Confira se os valores usados nessa operação têm tipos compatíveis.',
    ZeroDivisionError: 'Uma divisão recebeu zero como divisor. Confira o valor antes de dividir.',
    EOFError: 'O programa tentou ler além das linhas fornecidas pelo teste. Confira a quantidade de input().',
  };
  return Object.hasOwn(hints, type) ? hints[type] : 'Revise o trecho indicado e consulte a mensagem original do Python abaixo.';
}

// Allowlist compartilhada pelo avaliador e pela persistência: dados ocultos nunca são copiados.
export function safeCaseResult(result) {
  if (!result || !Number.isInteger(result.index) || result.index < 0 || typeof result.status !== 'string' || typeof result.hidden !== 'boolean') return null;
  const safe = { index: result.index, hidden: result.hidden, status: result.status };
  if (safe.hidden) return safe;
  if (!['input', 'expected', 'output', 'error'].every(key => typeof result[key] === 'string')) return null;
  for (const key of ['input', 'expected', 'output', 'error', 'errorType']) if (typeof result[key] === 'string') safe[key] = result[key];
  if (Number.isInteger(result.errorLine) && result.errorLine > 0) safe.errorLine = result.errorLine;
  return safe;
}
