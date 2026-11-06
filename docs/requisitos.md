# Requisitos do MVP

Status: especificação do MVP usado na implementação inicial. Consulte `arquitetura.md` para distinguir as verificações automatizadas das verificações em navegador e publicação ainda pendentes.

## 1. Objetivo e público

Permitir que o aluno pratique lógica de programação em Python por meio de exercícios com enunciado, exemplos, editor e correção automática, em uma experiência inspirada em LeetCode e beecrowd.

O público inicial é o responsável pelo projeto e seus colegas de sala. Não haverá competição, avaliação acadêmica formal ou consequência por consultar os testes da aplicação.

O MVP deve ser acessível online, sem cadastro e sem custo de infraestrutura. O uso principal será em computador. A interface e os materiais didáticos serão em português.

## 2. Escopo funcional

| ID | Requisito |
| --- | --- |
| RF01 | Listar exercícios com título, tema, dificuldade e situação local: não iniciado, em andamento ou resolvido. |
| RF02 | Permitir localizar exercícios por tema e abrir cada exercício por um endereço compartilhável. |
| RF03 | Exibir enunciado, formato de entrada, formato de saída, restrições e exemplos aplicáveis. |
| RF04 | Oferecer editor de Python com indentação e destaque de sintaxe. O exercício pode fornecer um código inicial. |
| RF05 | Oferecer uma área de testes de prática com entrada e saída esperada editáveis, permitindo adicionar casos próprios. |
| RF06 | Executar os testes de prática e apresentar, para cada caso, entrada, saída esperada, saída obtida e resultado da comparação ou erro. |
| RF07 | Enviar a solução para avaliação com os testes oficiais do exercício, incluindo os visíveis e os ocultos. |
| RF08 | Apresentar o resultado da submissão sem expor os dados dos testes ocultos. |
| RF09 | Disponibilizar dicas graduais previamente escritas, abertas por iniciativa do aluno. Não gerar dicas por IA. |
| RF10 | Salvar rascunho, progresso e histórico limitado às últimas 20 submissões por exercício no navegador. |
| RF11 | Permitir cancelar uma execução e continuar usando o editor após cancelamento, erro ou limite excedido. |
| RF12 | Permitir adicionar exercícios por arquivos versionados, sem alterar os componentes da interface. |
| RF13 | Seguir o tema do sistema por padrão e permitir selecionar claro ou noturno, salvando a preferência local. |
| RF14 | Organizar os testes de prática em abas com cores, símbolos e descrição do estado individual; permitir navegação por teclado e limpar indicadores quando seus dados mudarem. |
| RF15 | Oferecer navegação entre exercícios e identificação do exercício atual, com testes, resultado e histórico em um painel de abas. |

O catálogo inicial abrangerá entrada e saída, variáveis, operadores, decisões e repetições. A quantidade final e os exercícios serão definidos na etapa de conteúdo piloto.

## 3. Fluxos principais

### Escolher e retomar um exercício

1. O aluno abre o catálogo e consulta os exercícios e seu progresso local.
2. Escolhe um exercício e lê o enunciado e os exemplos.
3. O editor recupera seu rascunho, se houver; caso contrário, apresenta o código inicial ou um editor vazio.
4. As alterações no código são salvas automaticamente no navegador.

### Praticar com testes editáveis

1. Os casos visíveis oficiais são apresentados inicialmente como cópias editáveis na área de prática.
2. O aluno pode alterar entradas e saídas esperadas ou adicionar casos próprios.
3. Ao executar, o sistema usa o código atual do editor e os casos de prática.
4. A interface mostra os resultados e permite continuar editando.
5. Passar nesses testes não marca o exercício como resolvido.

Os casos de prática personalizados serão temporários no MVP; sua persistência não faz parte do requisito de salvamento de rascunho.

### Submeter uma solução

1. O aluno seleciona enviar solução.
2. O sistema avalia uma cópia do código naquele momento, usando exclusivamente os testes oficiais.
3. Alterações feitas na área de prática não interferem nessa avaliação.
4. O resultado é registrado no histórico local.
5. O exercício é marcado como resolvido apenas se todos os testes oficiais passarem.

O aluno pode continuar alterando o rascunho após a avaliação. Uma tentativa posterior incorreta não apaga uma aprovação da mesma versão do exercício.

### Consultar uma dica

O aluno abre as dicas progressivamente. Elas devem orientar o raciocínio ou chamar atenção para limites e formatação. Não dependem de analisar automaticamente o código nem de revelar um teste oculto que falhou.

## 4. Modelo dos exercícios

Cada exercício deverá conter:

- Identificador estável e versão do exercício.
- Título, tema e dificuldade.
- Enunciado, formato de entrada, formato de saída e restrições.
- Código inicial opcional e dicas em ordem de apresentação.
- Testes oficiais com entrada, saída esperada e indicação de visível ou oculto.

Os exemplos devem usar casos visíveis oficiais para evitar divergência entre o enunciado e a avaliação. Não é obrigatório ter exatamente três exemplos: a quantidade deve ser suficiente para explicar o exercício.

Uma solução de referência será mantida para revisão do conteúdo e validação dos testes, sem botão para exibi-la ao aluno no MVP. Seu formato será definido na etapa de conteúdo.

## 5. Regras de execução e correção

### Programa e entrada

- O aluno escreve um programa completo em Python, usando `input()` e `print()`.
- A entrada de cada teste é fornecida integralmente antes da execução. Não haverá terminal interativo.
- Cada teste começa com estado limpo, sem aproveitar variáveis ou saídas do anterior.
- O enunciado deve orientar a não imprimir mensagens de solicitação de entrada, como `Digite um número:`, salvo se fizerem parte da saída exigida.
- O MVP não oferecerá instalação de pacotes externos. A versão do Python e os módulos disponíveis serão documentados após o protótipo.

### Comparação da saída

- A saída é comparada como texto.
- Quebras de linha `CRLF` e `CR` são normalizadas para `LF`.
- Uma única quebra de linha no final é opcional; quebras extras continuam significativas.
- Espaços, linhas intermediárias, maiúsculas e minúsculas continuam significativos.
- Não haverá tolerância numérica automática no MVP. Quando houver decimais, o enunciado especificará a formatação esperada, incluindo quantidade de casas e separador decimal.

### Resultados

| Resultado | Significado |
| --- | --- |
| Aprovado | Todos os testes oficiais passaram. |
| Resposta incorreta | O programa terminou, mas a saída divergiu da esperada em pelo menos um caso. |
| Erro de execução | O programa apresentou erro de sintaxe ou exceção durante um teste. |
| Tempo excedido | A execução atingiu o limite de tempo. |
| Saída excedida | O programa produziu mais saída que o limite permitido. |
| Cancelado | O aluno interrompeu a execução. |
| Falha do ambiente | Não foi possível carregar ou usar o runtime; não caracteriza erro da solução. |

Nos casos visíveis, mostrar detalhes úteis à depuração. Nos ocultos, mostrar somente o resultado e um diagnóstico genérico, sem entrada, saída esperada, saída obtida ou mensagens que possam revelar o conteúdo do caso.

A submissão poderá encerrar no primeiro teste oficial que falhar. A mensagem não deverá sugerir que testes ainda não executados passaram.

Uma execução cancelada ou interrompida por falha do ambiente não conta como reprovação nem modifica a situação de resolução.

## 6. Persistência local

- O rascunho será associado ao identificador do exercício.
- Cada submissão concluída guardará data e hora, código enviado, versão do exercício e resultado. O histórico será limitado às 20 mais recentes por exercício.
- A versão do exercício mudará quando houver alteração de testes ou de requisitos que afete a correção. A aprovação anterior permanecerá no histórico, mas a interface solicitará uma nova submissão para validar a versão atual.
- Não haverá sincronização entre computadores, navegadores ou perfis de navegador.
- A interface informará que limpar os dados do navegador pode apagar o progresso.
- Se o armazenamento estiver indisponível ou cheio, o aluno poderá continuar praticando e receberá um aviso de que as alterações não estão sendo salvas.

## 7. Requisitos de qualidade e limitações

- Executar Python fora da thread da interface, com cancelamento e limites de tempo e saída.
- Mostrar estado de carregamento do runtime, execução e falhas, evitando cliques duplicados enquanto houver uma avaliação em andamento.
- Permitir navegação por teclado, usar rótulos nos campos e não depender somente de cor para comunicar resultados.
- Adaptar a disposição dos painéis a telas menores, priorizando a experiência de programação em computador.
- Funcionar no subdiretório de um projeto do GitHub Pages, inclusive ao abrir diretamente um exercício.
- Usar armazenamento e execução no dispositivo do aluno. Não haverá servidor de correção nem banco de dados na primeira versão.
- Os testes ocultos estarão apenas escondidos na interface. Serão tecnicamente acessíveis nos arquivos do site; não se exige ofuscação nem proteção contra fraude.
- O carregamento inicial dependerá de internet. Funcionamento offline não é um requisito do MVP.
- A execução no navegador não garante isolamento absoluto de memória ou execução confiável para avaliação formal. A viabilidade, os limites e a recuperação após falhas precisam ser testados antes de implementar a plataforma completa.

## 8. Critérios de aceite

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir o catálogo e selecionar um exercício | Exibir enunciado completo, exemplos e editor. |
| CA02 | Alterar um teste de prática e executar | Avaliar a entrada e a saída esperada editadas. |
| CA03 | Enviar após alterar os testes de prática | Usar os testes oficiais originais. |
| CA04 | Enviar solução correta de referência | Aprovar todos os testes e marcar como resolvido. |
| CA05 | Enviar solução com erro conhecido | Detectar o erro, sem aprovação indevida. |
| CA06 | Falhar em caso oculto | Mostrar o tipo de falha sem revelar os dados do caso. |
| CA07 | Executar código com erro de sintaxe ou exceção | Mostrar erro e permitir nova execução. |
| CA08 | Executar loop infinito ou saída excessiva | Interromper pelo limite e manter a página utilizável. |
| CA09 | Cancelar execução e executar novamente | Parar a execução anterior e iniciar uma nova normalmente. |
| CA10 | Recarregar a página ou reabrir o exercício | Recuperar rascunho, histórico e progresso locais. |
| CA11 | Abrir em outro navegador | Iniciar com progresso local independente. |
| CA12 | Alterar a versão que afeta a correção | Preservar o histórico e solicitar revalidação. |
| CA13 | Adicionar exercício válido por arquivo | Incorporar ao catálogo sem editar componentes da interface. |
| CA14 | Abrir diretamente o endereço de um exercício no GitHub Pages | Carregar o exercício e seus recursos corretamente. |
| CA15 | Comparar saídas com e sem uma quebra final | Aceitar ambas; rejeitar espaços ou linhas extras significativos. |
| CA16 | Executar testes sucessivos | Não compartilhar estado entre as execuções. |
| CA17 | Armazenamento indisponível ou runtime sem carregar | Informar a limitação sem perder silenciosamente o trabalho ou atribuir erro ao aluno. |
| CA18 | Alterar aparência do sistema no modo Sistema | Atualizar interface e editor sem perder o código. |
| CA19 | Selecionar claro ou noturno e recarregar | Preservar a escolha manual, independentemente do sistema. |
| CA20 | Alternar abas e editar testes | Preservar os campos de cada caso e mostrar apenas o caso selecionado. |
| CA21 | Executar testes de prática | Atualizar cada aba durante carregamento, execução e conclusão, com símbolo e descrição além da cor. |
| CA22 | Editar caso ou código depois de uma execução | Limpar os indicadores afetados e sinalizar que o resultado anterior precisa de nova execução. |

## 9. Fora do MVP

Contas e login, sincronização, ranking, competição, turmas, notas, painel de autoria, exercícios de implementação de funções, pacotes externos, terminal interativo, dicas por IA e mecanismos de proteção contra consulta aos testes.

Adicionar questões por arquivos faz parte do MVP. O painel para adicionar questões pela interface permanece como evolução futura.
