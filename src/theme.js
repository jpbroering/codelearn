export const THEME_KEY = 'codelearn:theme';
const preferences = ['system', 'light', 'dark'];
export function resolveTheme(preference, systemDark) {
  return preference === 'dark' || (preference !== 'light' && systemDark) ? 'dark' : 'light';
}

export function initTheme({ root, select, media, storage, onChange = () => {} }) {
  let preference = 'system';
  try {
    const saved = storage.getItem(THEME_KEY);
    if (preferences.includes(saved)) preference = saved;
  } catch { /* A preferência ainda pode ser alterada nesta sessão. */ }
  function apply() {
    const theme = resolveTheme(preference, media.matches);
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    select.value = preference;
    onChange(theme);
  }
  const onSelect = () => {
    preference = preferences.includes(select.value) ? select.value : 'system';
    try { storage.setItem(THEME_KEY, preference); } catch { /* Sem armazenamento. */ }
    apply();
  };
  select.addEventListener('change', onSelect);
  media.addEventListener('change', apply);
  apply();
  return () => {
    select.removeEventListener('change', onSelect);
    media.removeEventListener('change', apply);
  };
}
