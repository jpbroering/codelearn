/* Worker clássico: runtime servido junto com o site, sem CDN. */
(async () => {
  try {
    importScripts('./runtime/pyodide.js');
    const py = await loadPyodide({ indexURL: new URL('./runtime/', self.location.href).href });
    self.onmessage = async ({ data }) => {
      try {
        py.globals.set('__code', data.code);
        py.globals.set('__input', data.input);
        py.globals.set('_output_limit', data.outputLimit);
        const json = await py.runPythonAsync(`
import sys, io, json, traceback
class OutputLimit(Exception):
    pass
class LimitedOutput(io.StringIO):
    def write(self, text):
        if self.tell() + len(text) > _output_limit:
            raise OutputLimit('Limite de saída excedido')
        return super().write(text)
old_streams = (sys.stdin, sys.stdout, sys.stderr)
output = LimitedOutput()
sys.stdin = io.StringIO(__input)
sys.stdout = output
sys.stderr = output
result = {'status': 'completed', 'output': '', 'error': ''}
try:
    exec(compile(__code, '<solucao>', 'exec'), {'__name__': '__main__'})
except OutputLimit:
    result['status'] = 'output-limit'
except BaseException as error:
    result['status'] = 'runtime-error'
    result['errorType'] = type(error).__name__
    frames = traceback.extract_tb(error.__traceback__)
    lines = [frame.lineno for frame in frames if frame.filename == '<solucao>']
    if isinstance(error, SyntaxError) and error.filename == '<solucao>':
        result['errorLine'] = error.lineno
    elif lines:
        result['errorLine'] = lines[-1]
    result['error'] = ''.join(traceback.format_exception_only(type(error), error))[:2000]
finally:
    sys.stdin, sys.stdout, sys.stderr = old_streams
    result['output'] = output.getvalue()
json.dumps(result)
`);
        self.postMessage({ type: 'result', result: JSON.parse(json) });
      } catch {
        self.postMessage({ type: 'failure' });
      }
    };
    self.postMessage({ type: 'ready' });
  } catch {
    self.postMessage({ type: 'failure' });
  }
})();
