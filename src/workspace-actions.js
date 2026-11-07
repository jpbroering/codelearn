export function installSkipLink(link, main) {
  link.addEventListener('click', event => { event.preventDefault(); main.focus(); });
}
export function installWorkbenchToggle(button, column, editorPanel) {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'Recolher painel' : 'Expandir painel';
    column.classList.toggle('workbench-expanded', expanded);
    editorPanel.hidden = expanded;
  });
}
