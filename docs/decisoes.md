# Decisões e sequência de trabalho

## Estado atual

A documentação foi revisada pelo responsável, que autorizou prosseguir. Os três exercícios piloto e a implementação estática do MVP foram preparados. O build e os testes automatizados são verificáveis pelos comandos do README. A revisão em navegador e a publicação no GitHub Pages permanecem pendentes; não há remoto configurado neste repositório.

## Decisões alinhadas com o responsável

| Tema | Direção |
| --- | --- |
| Público | Estudo pessoal com apoio a colegas de sala. |
| Conteúdo | Exercícios em arquivos, com possibilidade futura de painel de autoria. |
| Modelo | Programas Python completos, com entrada e saída, focados em lógica. |
| Prática | Entrada e saída esperada editáveis. |
| Submissão | Testes oficiais independentes das alterações na área de prática. |
| Feedback | Não revelar casos ocultos; oferecer dicas quando possível. |
| Identidade | Sem contas; progresso neste navegador. |
| Custo | Custo zero como restrição inicial. |
| Sigilo dos testes | Ocultação na interface é suficiente para o objetivo do projeto. |

A exigência inicial de correção no servidor foi flexibilizada na conversa para viabilizar custo zero. A arquitetura proposta passou a ser estática, com execução no navegador. Isso não oferece sigilo real dos testes.

## Direção de arquitetura

Fluxo principal:

```text
Catálogo de arquivos → Interface → Executor Python em Worker
                          ↓                   ↓
                  Persistência local ← Avaliador de resultados
```

| Componente | Responsabilidade |
| --- | --- |
| Interface | Catálogo, leitura do exercício, editor, testes e resultados. |
| Conteúdo | Metadados, enunciados, dicas e testes oficiais versionados. |
| Executor | Receber código e entrada, executar com cancelamento e retornar saída, erro ou limite excedido. |
| Avaliador | Comparar saídas e consolidar o resultado, distinguindo testes de prática dos oficiais. |
| Persistência | Salvar e recuperar rascunho, histórico e progresso por exercício. |

O contrato do executor deve ser independente da interface para permitir substituir o runtime local por um serviço no futuro. Não haverá API HTTP pública no MVP. O formato exato das mensagens do Worker e dos arquivos de conteúdo será definido após o protótipo, antes da implementação da plataforma.

**Hipótese técnica:** hospedar os arquivos estáticos no GitHub Pages e executar Python com Pyodide em Web Worker. GitHub Pages não executa Python no servidor. O protótipo precisa confirmar entrada via `input()`, captura de `print()`, estado limpo por teste, cancelamento, tratamento de erros e desempenho aceitável.

Referências oficiais consultadas em 06/11/2026:

- [GitHub Pages: hospedagem estática](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
- [Pyodide: uso no navegador](https://pyodide.org/en/0.29.2/usage/index.html).

A implementação escolheu Vite, CodeMirror 6 e Pyodide 0.29.2, com runtime incluído no build e publicação preparada via GitHub Actions. Os contratos e as limitações de validação estão em [Arquitetura](arquitetura.md).

## Defaults adotados após autorização para prosseguir

Os itens abaixo detalham o plano anterior, mas não foram escolhidos individualmente pelo responsável:

- Histórico de até 20 submissões por exercício.
- Testes de prática personalizados temporários; rascunho de código persistente.
- Comparação textual, sem tolerância numérica, com uma quebra final opcional.
- Encerramento da submissão na primeira falha oficial.
- Dicas escritas e graduais, consultadas por iniciativa do aluno.
- Alterações que afetem a correção exigem revalidar uma aprovação anterior.
- Computador como dispositivo principal; sem compromisso de funcionamento offline.

Esses defaults estão expressos nos requisitos e foram usados na implementação.

## Sequência do trabalho

1. **Conteúdo piloto:** selecionar três exercícios representativos, adaptar os enunciados para Python e preparar soluções de referência, dicas e testes de borda. Candidatos: área de terreno, diferença entre dois números e soma de negativos, a confirmar nesta etapa. Revisar também a atribuição e as condições de uso antes de publicar adaptações dos materiais.
2. **Protótipo de execução:** comprovar o fluxo de entrada e saída no navegador e testar loops, erros, limite de saída, cancelamento e carregamento no GitHub Pages. Se a hipótese falhar, revisar a arquitetura mantendo custo zero; não iniciar a plataforma completa antes dessa decisão.
3. **Consolidação técnica:** registrar os resultados do protótipo e fechar tecnologias, organização de código, formatos de conteúdo e contratos internos. Fixar limites de tempo e saída com base nas medições.
4. **Implementação incremental:** catálogo e página; editor e testes; avaliação oficial; persistência e dicas.
5. **Validação e publicação:** executar os critérios de aceite, revisar acessibilidade e uso com colegas, documentar limitações observadas e publicar.

O conteúdo piloto está documentado em [Conteúdo e autoria](conteudo.md). A validação usa o runtime Python real com um adaptador Node; não comprova o comportamento das APIs do navegador. Não foi possível validar o site em navegador nesta sessão, e o funcionamento no GitHub Pages ainda depende de publicação.

## Próxima evolução após validação no Pages

O responsável conectará o repositório ao GitHub e validará o MVP no GitHub Pages. Depois dessa validação, a próxima evolução deve melhorar a interface, adicionar uma opção de modo noturno e tornar a navegação mais intuitiva, ajudando o aluno a identificar onde está e quais ações pode realizar. As melhorias foram autorizadas após a validação do responsável: tema Sistema/Claro/Noturno, testes de prática em abas com indicadores, painel com abas de resultado e histórico, breadcrumbs e navegação entre exercícios. A implementação e os testes automatizados estão disponíveis; a revisão visual desta evolução em navegador permanece pendente nesta sessão.

A branch principal do projeto é `main`, também usada pelo workflow de publicação.
