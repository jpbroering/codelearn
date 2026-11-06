const prefix = 'codelearn:v1:';
const historyLimit = 20;

export function emptyRecord() {
  return { draft: null, history: [], passedVersion: null };
}

function validSubmission(submission) {
  return submission
    && typeof submission.code === 'string'
    && typeof submission.date === 'string'
    && Number.isInteger(submission.version)
    && typeof submission.status === 'string';
}

function validRecord(value) {
  return value
    && (value.draft === null || typeof value.draft === 'string')
    && Array.isArray(value.history)
    && value.history.every(validSubmission)
    && (value.passedVersion === null || Number.isInteger(value.passedVersion));
}

export function createStore(storage, onError = () => {}) {
  const memory = new Map();

  function readRecord(id) {
    try {
      const raw = storage.getItem(prefix + id);
      if (!raw) return emptyRecord();

      const record = JSON.parse(raw);
      if (!validRecord(record)) throw Error('Dados inválidos');
      return record;
    } catch {
      onError();
      return emptyRecord();
    }
  }

  return {
    get(id) {
      if (!memory.has(id)) memory.set(id, readRecord(id));
      return structuredClone(memory.get(id));
    },
    save(id, record) {
      memory.set(id, structuredClone(record));
      try {
        storage.setItem(prefix + id, JSON.stringify(record));
      } catch {
        onError();
      }
    },
  };
}

export function addSubmission(record, exercise, code, status, date = new Date().toISOString()) {
  if (['cancelled', 'environment-error'].includes(status)) return record;

  return {
    ...record,
    passedVersion: status === 'accepted' ? exercise.version : record.passedVersion,
    history: [{ date, code, version: exercise.version, status }, ...record.history].slice(0, historyLimit),
  };
}

export function progress(record, exercise) {
  if (record.passedVersion === exercise.version) return 'Resolvido';
  if (record.passedVersion !== null) return 'Revalidar';
  if (record.draft !== null || record.history.length) return 'Em andamento';
  return 'Não iniciado';
}
