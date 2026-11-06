const prefix = 'codelearn:v1:';
export function emptyRecord() { return { draft: null, history: [], passedVersion: null }; }
function validRecord(value) {
  return value && (value.draft === null || typeof value.draft === 'string') && Array.isArray(value.history) && value.history.every(h => h && typeof h.code === 'string' && typeof h.date === 'string' && Number.isInteger(h.version) && typeof h.status === 'string') && (value.passedVersion === null || Number.isInteger(value.passedVersion));
}
export function createStore(storage, onError = () => {}) {
  const memory = new Map();
  return {
    get(id) {
      if (memory.has(id)) return structuredClone(memory.get(id));
      let record = emptyRecord();
      try {
        const raw = storage.getItem(prefix + id);
        if (raw) { const parsed = JSON.parse(raw); if (!validRecord(parsed)) throw Error('Dados inválidos'); record = parsed; }
      } catch { onError(); }
      memory.set(id, record);
      return structuredClone(record);
    },
    save(id, record) {
      memory.set(id, structuredClone(record));
      try { storage.setItem(prefix + id, JSON.stringify(record)); } catch { onError(); }
    },
  };
}
export function addSubmission(record, exercise, code, status, date = new Date().toISOString()) {
  if (['cancelled', 'environment-error'].includes(status)) return record;
  return { ...record, passedVersion: status === 'accepted' ? exercise.version : record.passedVersion,
    history: [{ date, code, version: exercise.version, status }, ...record.history].slice(0, 20) };
}
export function progress(record, exercise) {
  if (record.passedVersion === exercise.version) return 'Resolvido';
  if (record.passedVersion !== null) return 'Revalidar';
  if (record.draft !== null || record.history.length) return 'Em andamento';
  return 'Não iniciado';
}
