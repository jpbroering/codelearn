# Conteúdo e autoria

O catálogo tem **20 exercícios**: 7 de entrada e saída, 7 de decisões e 6 de repetições. A ampliação acrescentou 17 exercícios com enunciados originais, duas dicas graduais, três exemplos visíveis e pelo menos três testes ocultos por exercício.

O conjunto soma **134 casos oficiais** (60 visíveis e 74 ocultos), com 20 soluções de referência. Os novos exercícios incluem números negativos, zero, empates, limites das condições, formatação decimal e limites de repetição.

O material completo para proofreading está em [Revisão dos exercícios](revisao-exercicios.md). A revisão humana está pendente.

## Origem do conteúdo

Os três exercícios piloto foram redigidos para este projeto a partir de conceitos dos materiais locais:

| Exercício | Tema | Casos relevantes |
| --- | --- | --- |
| Área do terreno | Entrada e saída / operadores | Medidas mínimas, unidade e produto máximo. |
| Diferença entre números | Decisões | Ordem invertida, igualdade, negativos e extremos. |
| Soma dos negativos | Repetições / decisões | Sem negativos, todos negativos, zero e negativo na última leitura. |

Esses três pilotos contêm três testes visíveis e três ocultos, duas dicas graduais e uma solução de referência. A redação não é uma transcrição dos PDFs. Suas referências são:

- Área de terreno retangular: primeira lista de algoritmos, exercício 1, Faculdade Municipal de Palhoça, professor MSc. Clodomir Coradini, conforme identificação no material.
- Diferença do maior pelo menor: material de estrutura de decisão, exercício 4.
- Somatório de dez números negativos: material de laço de repetição, exercício 3.

Os arquivos originais permanecem em `pesquisa/exercicios_faculdade/` e não são distribuídos no build. Não foi identificada licença explícita para republicação dos PDFs; não se atribui uma licença a esses materiais. Novos conteúdos devem ter redação própria e registrar sua origem quando houver referência.

Os 17 exercícios da ampliação têm redação e seleção de casos próprias, sem transcrição dos PDFs.

## Preparar a revisão de texto

Execute `npm run review:content` para gerar novamente `docs/revisao-exercicios.md` a partir dos JSONs. O documento reúne enunciado, entrada, saída, restrições, exemplos e dicas, além de links para a conferência técnica dos testes e soluções.

Registre o feedback em um documento separado, citando o identificador do exercício. A geração substitui a cópia gerada; correções definitivas devem ser feitas nos JSONs e depois refletidas em uma nova geração. Validar as soluções automaticamente não substitui a revisão didática.

## Adicionar um exercício

1. Crie `content/exercises/<identificador>.json`, tomando um dos exercícios existentes como exemplo.
2. Mantenha identificador com letras minúsculas sem acentos, números e hífens, igual ao nome do arquivo sem extensão.
3. Preencha os campos de enunciado, entrada, saída, restrições, resumo, tema, dificuldade e versão inteira positiva. `starter` é opcional; `hints` é uma lista de textos.
4. Em `tests`, cada caso deve ter `input` e `expected` como texto, além de `visible` como booleano. Inclua ao menos um visível e um oculto. Os exemplos da interface são derivados dos casos visíveis.
5. Acrescente `content/solutions/<identificador>.py`. Escreva testes com fronteiras e soluções incorretas plausíveis em mente.
6. Execute `npm run validate:content`, `npm test` e `npm run build`. Os testes executam a solução de referência contra todos os casos oficiais.

Mude a versão quando alterar as exigências ou os testes de maneira que afete a correção. Preserve o identificador para manter os rascunhos e o histórico locais. O catálogo incorpora novos arquivos automaticamente no próximo build.
