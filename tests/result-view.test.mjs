import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { resultMarkup } from '../src/result-view.js';

function render(result, official = true) {
  return new JSDOM(resultMarkup(result, official)).window.document;
}

test('resultado visível preserva o diagnóstico e trata código e saída como texto', () => {
  const result = {
    index: 0, hidden: false, status: 'runtime-error',
    input: '<img src=x onerror=alert(1)>', expected: '"esperado"',
    output: '<script>alert(1)</script>', error: 'ValueError: entrada inválida',
  };
  const document = render({ status: result.status, results: [result] }, false);
  assert.equal(document.querySelector('img, script'), null);
  assert.deepEqual([...document.querySelectorAll('.result-data pre')].map(pre => pre.textContent), [result.input, result.expected, result.output]);
  assert.equal(document.querySelector('.error').textContent, result.error);
  assert.equal(document.querySelector('details').open, true);
  assert.match(document.querySelector('h3').textContent, /Erro de execução/);
  assert.match(document.querySelector('.muted').textContent, /Testes de prática/);
});

test('casos ocultos não renderizam dados mesmo se estiverem presentes no objeto', () => {
  const document = render({ status: 'wrong-answer', results: [{
    index: 3, hidden: true, status: 'wrong-answer',
    input: 'entrada secreta', expected: 'resposta secreta', output: 'saída secreta', error: 'erro secreto',
  }] });
  assert.doesNotMatch(document.body.textContent, /secret[ao]/);
  assert.equal(document.querySelector('.result-data, .error'), null);
  assert.equal(document.querySelector('details').open, false);
  assert.match(document.querySelector('summary').textContent, /Teste oculto/);
  assert.match(document.querySelector('.muted').textContent, /Avaliação oficial/);
});

test('aprovação fica recolhida e falha do ambiente mantém a orientação de recuperação', () => {
  const document = render({ status: 'accepted', results: [{ index: 0, hidden: false, status: 'accepted', input: '', expected: '', output: '', error: '' }] });
  assert.equal(document.querySelector('h3').className, 'success');
  assert.equal(document.querySelector('details').open, false);
  const failure = render({ status: 'environment-error', results: [] });
  assert.match(failure.body.textContent, /Verifique sua conexão e tente novamente/);
  assert.match(failure.body.textContent, /Seu código permanece no editor/);
});
