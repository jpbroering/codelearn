import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { Compartment, EditorSelection, EditorState } from '@codemirror/state';
import { EditorView, highlightActiveLine, highlightActiveLineGutter, lineNumbers } from '@codemirror/view';
import { editorTheme } from '../src/editor-theme.js';

const css = await readFile(new URL('../src/style.css', import.meta.url), 'utf8');
function withEditor(dark, check) {
  const dom = new JSDOM('<html><head></head><body><div id="editor"></div></body></html>', { pretendToBeVisual: true });
  const globals = ['window', 'document', 'MutationObserver'];
  const previous = globals.map(name => Object.getOwnPropertyDescriptor(globalThis, name));
  for (const name of globals) globalThis[name] = dom.window[name];
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const theme = new Compartment();
  const editor = new EditorView({
    doc: 'print("Teste")\nprint("Teste")',
    extensions: [lineNumbers(), highlightActiveLine(), highlightActiveLineGutter(), EditorState.allowMultipleSelections.of(true), theme.of(editorTheme(dark))],
    parent: document.querySelector('#editor'),
  });
  // JSDOM não reproduz toda a cascata de !important; mantenha o CSS da aplicação por último.
  const style = document.createElement('style'); style.textContent = css; document.head.append(style);
  try { check(editor, dom.window, theme); }
  finally {
    editor.destroy(); dom.window.close();
    globals.forEach((name, i) => {
      if (previous[i]) Object.defineProperty(globalThis, name, previous[i]);
      else delete globalThis[name];
    });
  }
}

for (const dark of [false, true]) {
  test(`seleção fica livre do fundo da linha ativa no tema ${dark ? 'noturno' : 'claro'}`, () => {
    withEditor(dark, (editor, window) => {
      const background = () => window.getComputedStyle(editor.dom.querySelector('.cm-activeLine')).backgroundColor;
      const before = background();
      assert.equal(editor.dom.dataset.hasSelection, 'false');
      const start = editor.state.doc.toString().lastIndexOf('Teste');
      editor.dispatch({ selection: { anchor: start, head: start + 5 } });
      assert.equal(editor.dom.dataset.hasSelection, 'true');
      assert.equal(background(), 'rgba(0, 0, 0, 0)');
      const number = editor.dom.querySelector('.cm-lineNumbers .cm-activeLineGutter');
      assert.equal(number.textContent, '2');
      const numberStyle = window.getComputedStyle(number);
      assert.equal(numberStyle.backgroundColor, 'rgba(0, 0, 0, 0)');
      assert.equal(numberStyle.fontWeight, '500');
      assert.notEqual(numberStyle.color, window.getComputedStyle(editor.dom.querySelector('.cm-gutters')).color);
      editor.dispatch({ selection: { anchor: start + 5 } });
      assert.equal(editor.dom.dataset.hasSelection, 'false');
      assert.equal(background(), before);
    });
  });
}

test('estado de seleção em várias linhas ou múltiplos cursores sobrevive à troca de tema', () => {
  withEditor(false, (editor, _window, theme) => {
    editor.dispatch({ selection: { anchor: 3, head: 20 } });
    assert.equal(editor.dom.dataset.hasSelection, 'true');
    editor.dispatch({ selection: EditorSelection.create([EditorSelection.cursor(0), EditorSelection.range(21, 26)]) });
    assert.equal(editor.dom.dataset.hasSelection, 'true');
    const selection = editor.state.selection;
    editor.dispatch({ effects: theme.reconfigure(editorTheme(true)) });
    assert.equal(editor.dom.dataset.hasSelection, 'true');
    assert.ok(editor.state.selection.eq(selection));
    assert.equal(editor.state.doc.toString(), 'print("Teste")\nprint("Teste")');
    for (const line of editor.dom.querySelectorAll('.cm-activeLine')) {
      assert.ok(line.matches('.cm-editor[data-has-selection="true"] .cm-activeLine'));
    }
  });
});
