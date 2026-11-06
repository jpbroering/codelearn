import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
export function editorTheme(dark) {
  const colors = dark
    ? { keyword: '#c4a7f5', string: '#d9be8a', number: '#f3a578', comment: '#939cad', variable: '#dde2ef', function: '#89c8ed' }
    : { keyword: '#8044b5', string: '#9b5825', number: '#a04b20', comment: '#657386', variable: '#263449', function: '#196e9c' };
  return [EditorView.theme({}, { dark }), syntaxHighlighting(HighlightStyle.define([
    { tag: [tags.operator, tags.punctuation], color: dark ? '#aebbd0' : '#52617a' },
    { tag: tags.keyword, color: colors.keyword },
    { tag: [tags.string, tags.special(tags.string)], color: colors.string },
    { tag: [tags.number, tags.bool, tags.null], color: colors.number },
    { tag: tags.comment, color: colors.comment, fontStyle: 'italic' },
    { tag: tags.variableName, color: colors.variable },
    { tag: tags.function(tags.variableName), color: colors.function },
  ]))];
}
