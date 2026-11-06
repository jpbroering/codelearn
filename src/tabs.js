// Padrão de abas com ativação automática por setas, Home e End.
export function createTabs(root, { onChange = () => {} } = {}) {
  const list = root.querySelector('[role="tablist"]');
  const buttons = () => [...list.querySelectorAll('[role="tab"]')];
  function select(id, { focus = false } = {}) {
    const tabs = buttons();
    const selected = tabs.find(tab => tab.id === id) ?? tabs[0];
    if (!selected) return;
    for (const tab of tabs) {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = root.ownerDocument.getElementById(tab.getAttribute('aria-controls'));
      if (panel && root.contains(panel)) panel.hidden = !active;
    }
    if (focus) {
      selected.focus();
      selected.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    }
    onChange(selected.id);
  }
  list.addEventListener('click', event => {
    const tab = event.target.closest('[role="tab"]');
    if (tab && list.contains(tab)) select(tab.id);
  });
  list.addEventListener('keydown', event => {
    const tabs = buttons();
    const index = tabs.indexOf(event.target.closest('[role="tab"]'));
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    select(tabs[next].id, { focus: true });
  });
  select(buttons().find(tab => tab.getAttribute('aria-selected') === 'true')?.id);
  return { select };
}
