import { explainError } from './diagnostics.js';
import { normalize, labels } from './evaluator.js';
import { escapeHtml } from './html.js';

export function differenceMarkup(actual, expected) {
  const a = normalize(actual).split('\n'), e = normalize(expected).split('\n');
  const index = Array.from({ length: Math.max(a.length, e.length) }, (_, i) => i).find(i => a[i] !== e[i]);
  if (index === undefined) return '';
  const describe = value => value === undefined ? '(linha ausente)' : value === '' ? '(linha vazia)' : JSON.stringify(value);
  return `<p class="failure">Linha ${index + 1}: esperado ${escapeHtml(describe(e[index]))}, obtido ${escapeHtml(describe(a[index]))}. Espaços e tabulações aparecem entre aspas.</p>`;
}

export function diagnosticMarkup(result) {
  if (result.hidden) return '';
  const hint = result.error ? `<p>${escapeHtml(explainError(result.errorType, result.error))}${result.errorLine ? ` Linha ${result.errorLine}.` : ''}</p><pre class="error">${escapeHtml(result.error)}</pre>` : '';
  const diff = result.status === 'wrong-answer' ? differenceMarkup(result.output ?? '', result.expected ?? '') : '';
  return hint + diff;
}

function caseOutputMarkup(result) {
  if (result.hidden) {
    return '<p>Este é um caso adicional cuja entrada não é mostrada, para verificar outras situações. Os dados deste caso não são exibidos. Revise as restrições e consulte as dicas.</p>';
  }

  const error = diagnosticMarkup(result);
  return `<div class="result-data"><div><small class="input-label">ENTRADA</small><pre>${escapeHtml(result.input)}</pre></div><div><small>ESPERADO</small><pre>${escapeHtml(result.expected)}</pre></div><div><small>OBTIDO</small><pre>${escapeHtml(result.output)}</pre></div></div>${error}`;
}

function caseResultMarkup(result) {
  const accepted = result.status === 'accepted';
  const tone = accepted ? 'success' : 'failure';
  const symbol = accepted ? '✓' : '✕';
  const title = result.hidden ? 'Teste oculto' : `Teste ${result.index + 1}`;
  const open = !accepted && !result.hidden ? 'open' : '';

  return `<details class="result-case" ${open}><summary>${title} <span class="${tone}">${symbol} ${escapeHtml(labels[result.status])}</span></summary>${caseOutputMarkup(result)}</details>`;
}

export function resultMarkup(result, official) {
  const accepted = result.status === 'accepted';
  const tone = accepted ? 'success' : 'failure';
  const symbol = accepted ? '✓' : '✕';
  const description = official
    ? 'Avaliação oficial. A submissão encerra na primeira falha. Enviar verifica os casos do exercício e registra a resolução.'
    : 'Testes de prática. Consulte cada caso em sua aba. Para registrar a resolução, envie a solução.';
  const environmentError = result.status === 'environment-error'
    ? '<p>Não foi possível preparar o Python. Verifique sua conexão e tente novamente. Seu código permanece no editor.</p>'
    : '';

  return `
      <h3 class="${tone}">${symbol} ${escapeHtml(labels[result.status])}</h3>
      <p class="muted small">${description}</p>
      ${result.results.map(caseResultMarkup).join('')}
      ${environmentError}`;
}
