# Arquitetura do MVP

## Componentes e tecnologias

- **Vite e JavaScript em módulos:** build estático com caminhos relativos (`base: './'`). Não há backend nem API HTTP.
- **CodeMirror 6:** editor com sintaxe Python, indentação, numeração de linhas e navegação por teclado.
- **Pyodide 0.29.2:** Python executado em Web Worker clássico. Os arquivos do runtime são copiados da dependência instalada para o build; não há download de runtime de CDN em produção.
- **localStorage:** rascunho, até 20 submissões por exercício e versão aprovada. Em caso de bloqueio, corrupção ou falta de espaço, a aplicação usa memória e apresenta um aviso.
- **Rotas por fragmento:** `#/exercicio/area-do-terreno`, por exemplo. Abrir um link direto não exige regras de reescrita no GitHub Pages.

## Organização

| Diretório / módulo | Responsabilidade |
| --- | --- |
| `content/exercises/` | Arquivos JSON descobertos automaticamente pelo catálogo durante o build. |
| `content/solutions/` | Soluções de referência utilizadas pelos testes; não fazem parte do build da interface. |
| `src/main.js` | Catálogo, workspace, editor, dicas, testes de prática e histórico. |
| `src/executor.js` | Ciclo de vida do Worker, fases, timeout e cancelamento. |
| `src/evaluator.js` | Comparação textual, interrupção na primeira falha oficial e supressão de dados ocultos. |
| `src/storage.js` | Persistência e regras de progresso/versionamento. |
| `public/python-worker.js` | Carregamento do Python, entrada, captura de saída e tratamento de erros. |
| `scripts/` | Validação do catálogo e preparação dos arquivos do runtime. |
| `tests/` | Testes de regras e integração com o runtime Python real. |

## Contratos internos

`execute(code, input, options)` retorna uma Promise com `status` e, quando disponíveis, `output` e `error`. Recebe um `AbortSignal` e informa as fases `loading` e `running`. O Worker é encerrado em todos os resultados.

Mensagens para o Worker: `{ code, input, outputLimit }`. Mensagens de retorno: `{ type: 'ready' }`, `{ type: 'result', result }` ou `{ type: 'failure' }`.

O resultado do executor pode ser `completed`, `runtime-error`, `time-limit`, `output-limit`, `cancelled` ou `environment-error`. O avaliador converte `completed` em `accepted` ou `wrong-answer`.

`evaluate(code, tests, options)` recebe os casos de prática ou os casos oficiais. Na avaliação oficial, interrompe na primeira falha e remove os campos de entrada, saída e erro dos resultados ocultos antes de entregá-los à interface. A avaliação de prática continua após falhas individuais, exceto cancelamento ou falha do ambiente.

Cada teste tem um Worker novo, inclusive na mesma submissão. Isso evita compartilhamento de variáveis, módulos e alterações em builtins. Não é um mecanismo antifraude: a avaliação inteira acontece no dispositivo do aluno.

## Limites iniciais

| Limite | Valor |
| --- | --- |
| Carregamento do runtime por teste | 60 segundos |
| Execução após o runtime ficar pronto | 3 segundos por teste |
| Saída capturada | 20 mil caracteres por teste |
| Código enviado | 100 mil caracteres |
| Testes de prática simultaneamente cadastrados | 20 |

Esses limites são constantes em `src/executor.js`, com exceção da quantidade de testes de prática, controlada pela interface. As execuções são sequenciais. O carregamento usa o cache HTTP normal do navegador, mas o interpretador é reinicializado a cada teste.

Não há controle rígido de memória do interpretador; código que aloque memória excessiva ainda pode afetar a aba. Não se trata de um sandbox para avaliação formal ou execução de código de terceiros. O editor aceita apenas o código que o próprio aluno decide executar.

## Conteúdo e publicação

O build valida os campos mínimos do catálogo e copia os arquivos de runtime. Os JSONs contêm testes visíveis e ocultos, todos disponíveis no bundle do navegador. As cópias editadas na prática são temporárias e não modificam os testes oficiais.

O build publicado contém apenas a aplicação e seu runtime. PDFs de referência e soluções Python de referência não são copiados para `dist/`.

O workflow de Pages testa e compila antes de publicar em pushes para `main` ou execução manual. Ele depende de um repositório GitHub configurado com Pages usando GitHub Actions. O deploy é disparado pelo push para `main`; alterações locais precisam ser enviadas ao GitHub para atualizar o site.

## Verificação e limites da validação

Os testes de integração executam o mesmo arquivo `public/python-worker.js` com Pyodide real, usando um adaptador para Workers do Node. Esse adaptador substitui o carregamento dos arquivos pelo caminho local da dependência. Ele valida Python, correção, cancelamento e isolamento, mas **não valida as APIs de navegador nem a aparência da interface**.

A sessão não dispõe de navegador na ferramenta de automação. A revisão visual, a interação com CodeMirror em navegador, o teste em dispositivos móveis e a abertura do site efetivamente publicado no GitHub Pages permanecem pendentes. O build e os testes automatizados não devem ser apresentados como substitutos dessas verificações.

## Tema, abas e navegação

A interface inicia com o tema do sistema. A preferência manual (`system`, `light` ou `dark`) usa a chave `codelearn:theme`, independente dos dados de progresso. A opção Sistema acompanha `prefers-color-scheme` em tempo real. O tema é aplicado antes da pintura inicial, e o editor é reconfigurado sem perder o código ou o histórico de edição.

`src/tabs.js` implementa o comportamento de abas com setas, Home, End, seleção e relações ARIA entre abas e painéis. `src/practice-tests.js` mantém os casos editáveis em memória, com apenas um painel visível, adição e remoção e estados individuais. Abas continuam navegáveis enquanto os campos ficam bloqueados durante execução.

O avaliador emite `onCaseResult` após cada caso, já sem dados dos testes ocultos na avaliação oficial. A interface usa esse evento apenas para atualizar os indicadores dos testes de prática. Uma submissão oficial não substitui os resultados dos casos personalizados. Editar um caso limpa seu resultado; editar o código limpa todos os indicadores de prática. A aba Resultado pode continuar exibindo a avaliação anterior, identificada pela mensagem de alteração.

Testes DOM com JSDOM verificam o comportamento das abas e não substituem a revisão visual em navegador. O editor fica em leitura durante a execução, evitando que os resultados sejam atribuídos a um código diferente do efetivamente enviado.

## Identidade visual e uso da janela

A paleta usa superfícies neutras em ambos os temas, azul para navegação e entradas, roxo para saídas e elementos de código, âmbar para restrições e dicas e cores de sucesso/erro para resultados. Os textos usam Inter; código e exemplos usam JetBrains Mono, com alternativas locais. As fontes continuam sendo carregadas pelo Google Fonts quando disponível.

Na rota válida de exercício, `body.is-exercise` ocupa `100dvh`, e o main divide a altura restante entre a barra de ações e o workspace. No desktop, enunciado e coluna de edição têm largura flexível, sem limite central de conteúdo. A coluna direita divide a altura entre editor e testes. `min-height: 0` e áreas de overflow internas evitam que conteúdos longos aumentem a altura da página. O rodapé fica restrito ao catálogo. Avisos de armazenamento continuam visíveis e descontam espaço do workspace.

Em janelas com largura de até 760 px ou altura de até 480 px, o layout usa fluxo vertical para preservar a leitura e o acesso aos controles. A suíte verifica também o contraste mínimo de 4,5:1 das cores de texto da interface nos dois temas. A aparência e o encaixe real nas dimensões do navegador ainda exigem revisão visual; os testes DOM e de contraste não medem layout.
