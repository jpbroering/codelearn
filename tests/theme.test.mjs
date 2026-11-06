import test from 'node:test';
import assert from 'node:assert/strict';
import { initTheme, resolveTheme, THEME_KEY } from '../src/theme.js';
function environment(saved, dark = false, broken = false) {
  const root = { dataset: {}, style: {} };
  const select = new EventTarget();
  const media = new EventTarget(); media.matches = dark;
  const storage = { getItem() { if (broken) throw Error(); return saved; }, setItem(key, value) { if (broken) throw Error(); assert.equal(key, THEME_KEY); saved = value; } };
  initTheme({ root, select, media, storage });
  return { root, select, media, saved: () => saved };
}
test('tema segue o sistema inicialmente e acompanha mudanças', () => {
  const env = environment(null, true);
  assert.equal(env.select.value, 'system');
  assert.equal(env.root.dataset.theme, 'dark');
  env.media.matches = false; env.media.dispatchEvent(new Event('change'));
  assert.equal(env.root.dataset.theme, 'light');
});
test('escolha manual persiste e prevalece sobre sistema até voltar ao automático', () => {
  const env = environment('light', true);
  assert.equal(env.root.dataset.theme, 'light');
  env.select.value = 'dark'; env.select.dispatchEvent(new Event('change'));
  assert.equal(env.saved(), 'dark');
  env.media.matches = false; env.media.dispatchEvent(new Event('change'));
  assert.equal(env.root.dataset.theme, 'dark');
  env.select.value = 'system'; env.select.dispatchEvent(new Event('change'));
  assert.equal(env.root.dataset.theme, 'light');
  assert.equal(environment(env.saved(), true).root.dataset.theme, 'dark');
});
test('preferência inválida e armazenamento bloqueado permitem usar o tema', () => {
  assert.equal(environment('invalid', true).select.value, 'system');
  const env = environment(null, false, true);
  env.select.value = 'dark'; env.select.dispatchEvent(new Event('change'));
  assert.equal(env.root.style.colorScheme, 'dark');
  assert.equal(resolveTheme('system', false), 'light');
});
