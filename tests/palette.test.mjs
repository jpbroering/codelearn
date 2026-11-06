import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const css = await readFile(new URL('../src/style.css', import.meta.url), 'utf8');
function luminance(hex) {
  const rgb = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + .05) / (values[1] + .05);
}
for (const [name, selector] of [['claro', ':root'], ['noturno', ':root[data-theme="dark"]']]) {
  const start = css.indexOf(selector + ' {');
  const block = css.slice(start, css.indexOf('}', start));
  const colors = Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[\da-f]{6})/g)].map(match => [match[1], match[2]]));
  test(`contraste legível de textos e estados no tema ${name}`, () => {
    for (const text of ['text', 'muted', 'faint', 'blue', 'purple', 'amber', 'success', 'error']) {
      for (const surface of ['surface', 'surface-soft', 'page']) {
        const ratio = contrast(colors[text], colors[surface]);
        assert.ok(ratio >= 4.5, `${text} em ${surface}: ${ratio.toFixed(2)}:1`);
      }
    }
    assert.ok(contrast(colors['on-primary'], colors.accent) >= 4.5);
  });
}
