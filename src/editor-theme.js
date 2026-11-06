import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
export function editorTheme(dark) {
  const colors = dark ? { keyword: '#cfb7ff', string: '#b5dba0', number: '#f0c087', comment: '#91a28e', variable: '#e0e8dc', function: '#91cbe8' } : { keyword: '#7044a1', string: '#3b713d', number: '#986020', comment: '#6c7d68', variable: '#253c36', function: '#25627f' };
  return [EditorView.theme({}, { dark }), syntaxHighlighting(HighlightStyle.define([
    { tag: tags.keyword, color: colors.keyword },
    { tag: [tags.string, tags.special(tags.string)], color: colors.string },
    { tag: [tags.number, tags.bool, tags.null], color: colors.number },
    { tag: tags.comment, color: colors.comment, fontStyle: 'italic' },
    { tag: tags.variableName, color: colors.variable },
    { tag: tags.function(tags.variableName), color: colors.function },
  ]))];
}
