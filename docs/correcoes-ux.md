# Correções das três auditorias de UX

## Estado

Etapa funcional implementada, com apresentação provisória. Verificações automatizadas aprovadas; a validação manual no Chrome/Browser e no Pages permanece pendente. Os dois conectores retornaram “browser access host is unavailable”. Nenhuma proposta nova ou identidade visual foi aplicada no Stitch nesta etapa.

Os relatórios são de personas simuladas e não equivalem a pesquisa com participantes reais. Os arquivos originais em `auditoria-ux/` permanecem fora deste commit, assim como a alteração local do `.gitignore`.

## Rastreabilidade

| Achado | Implementação funcional | Situação |
| --- | --- | --- |
| B1 das três personas | Atalho foca o main sem alterar o fragmento de rota | Teste DOM aprovado; navegador pendente |
| P1 U1, P2 U4, P3 U1 | Tipo e linha do erro, orientação local em português e mensagem original | Verificado com seis erros reais no Pyodide |
| P1 U2, P3 U6 | Novas tentativas guardam o primeiro diagnóstico; registros antigos continuam legíveis | Testes de persistência e privacidade aprovados |
| P2 U3 | Primeira linha divergente, incluindo espaços, ausência e linha vazia | Testes aprovados; comparação exata preservada |
| P1 U5, P2 U5, P3 U3 | Atalhos Ver dicas revelam a próxima dica e levam o foco à ajuda | DOM do bundle aprovado |
| P1 U3, P2 U6, P3 termos | Explicações de executar/enviar, caso oculto, limite e versão | Implementado; revisão dos textos pendente |
| P1 U4, P2 U10, P3 U7 | Comandos junto ao editor na apresentação estreita, com bloqueio e cancelamento compartilhados | Implementado; teste de uso móvel pendente |
| P1 S1, P2 U1, P3 S1 | Começar ou Continuar conforme a atividade local | Testes aprovados |
| P2 U11 | Busca inclui temas, ignora acentos e reconhece laço/laços | Testes aprovados |
| P2 U2, P3 U2/U4 | Orientação geral sobre input sem mensagem e dica de conversão em Antecessor | Conteúdo atualizado para proofreading; versões preservadas |
| P3 U5 | Pré-requisitos nos 20 exercícios | Catálogo validado; ordem e nível mantidos |
| P2 U7 | Expandir/recolher testes sem desmontar o editor | DOM aprovado; encaixe visual pendente |

## Interface e dados

O Worker retorna `errorType` e `errorLine` opcionais, além da mensagem técnica. O avaliador aplica uma allowlist antes de emitir resultados. Diagnósticos ocultos contêm apenas índice, sinalização de oculto e estado. A mesma seleção de campos protege a persistência.

O histórico continua em `codelearn:v1:`, limitado a 20 entradas por exercício. `diagnostic` é opcional e guarda apenas a primeira falha; dados opcionais inválidos são descartados sem remover rascunhos, aprovações ou tentativas antigas. Cancelamento e falha do ambiente não criam reprovação.

Cada exercício ganhou `prerequisites`, uma lista não vazia de conhecimentos usados. Esse campo é validado e incluído no documento de proofreading. Não houve mudança de respostas, testes oficiais, versões ou sequência do catálogo.

## Roteiro manual antes da etapa visual

1. No catálogo e no exercício, Tab/Enter em Pular para o conteúdo: confirmar foco sem mudança de URL ou perda do rascunho.
2. Em Antecessor, executar `n = input()` seguido de `print(n - 1)`: conferir orientação em português, TypeError e linha 2. Usar Ver dicas para encontrar a conversão.
3. Submeter uma solução com sucessor incorreto e depois uma correta. Recarregar e conferir o diagnóstico da tentativa antiga no histórico.
4. Falhar em um teste oculto: conferir que nenhum dado do caso aparece na tela ou no registro local.
5. No catálogo, buscar laços, lacos e repetições; combinar a busca com o filtro de tema.
6. Em 1280×720, expandir e recolher testes, preservando código e seleção. Em 390×844, executar, enviar e cancelar usando os comandos junto ao editor.
7. Repetir nos temas claro, noturno e sistema, por teclado, sem rolagem horizontal global. Verificar os avisos de armazenamento indisponível.
8. Publicar pelo fluxo existente e repetir o percurso no Pages.

## Etapa visual posterior

Após a validação funcional, criar no Stitch duas direções de identidade para o exercício desktop/noturno, sem substituir as telas e o design system existentes. A escolha do responsável antecede a implementação visual e a extensão para catálogo, modo claro e mobile.

Requisitos visuais: instruções essenciais de 12–13 px ou mais, placeholder com contraste adequado, alvos de toque mais generosos, descoberta da ajuda, painéis expansíveis e estados completos de erro/execução/aprovação. Não adicionar contas, ranking, IA, sincronização ou filtros de ordenação nesta rodada.

Direção A: bancada técnica editorial, superfícies grafite, tipografia humanista e acento azul/cobre. Direção B: caderno de laboratório digital, superfícies escuras neutras, títulos com identidade tipográfica própria e acento violeta/âmbar. Ambas devem manter o código como área principal e o ciclo experimentar → entender → corrigir → enviar.
