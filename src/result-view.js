import { labels } from './evaluator.js';
import { escapeHtml } from './html.js';

function caseOutputMarkup(result) {
  if (result.hidden) {
    return '<p>Os dados deste caso não são exibidos. Revise as restrições e consulte as dicas.</p>';
  }

  const error = result.error ? `<pre class="error">${escapeHtml(result.error)}</pre>` : '';
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
    ? 'Avaliação oficial. A submissão encerra na primeira falha.'
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
