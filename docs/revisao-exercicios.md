# Revisão dos exercícios

Material preparado para proofreading. A revisão humana dos textos ainda está pendente.

Este arquivo é gerado a partir dos JSONs. Registre sugestões por identificador em um documento separado; gerar novamente substitui esta cópia.

## Roteiro de revisão

- O enunciado explica o problema sem exigir conhecimento de contexto?
- A entrada informa quantidade, ordem, tipo e organização das linhas?
- A saída define palavras exatas, espaços e formatação decimal quando necessário?
- Os exemplos estão de acordo com as regras e podem ser calculados à mão?
- As restrições incluem os casos mencionados no texto?
- As dicas ajudam progressivamente e não contradizem o enunciado?

## Catálogo para revisão

20 exercícios. A ordem abaixo acompanha a organização por tema e título do site. As soluções de referência e os testes ocultos estão nos arquivos vinculados, para conferência técnica.

| Exercício | Tema | Casos visíveis / ocultos |
| --- | --- | --- |
| [Antecessor e sucessor](../content/exercises/antecessor-e-sucessor.json) | Entrada e saída | 3 / 3 |
| [Área do terreno](../content/exercises/area-do-terreno.json) | Entrada e saída | 3 / 3 |
| [Conversão de tempo](../content/exercises/conversao-de-tempo.json) | Entrada e saída | 3 / 4 |
| [Média de três notas](../content/exercises/media-de-tres-notas.json) | Entrada e saída | 3 / 3 |
| [Perímetro do retângulo](../content/exercises/perimetro-do-retangulo.json) | Entrada e saída | 3 / 3 |
| [Soma de dois números](../content/exercises/soma-de-dois-numeros.json) | Entrada e saída | 3 / 3 |
| [Troco da compra](../content/exercises/troco-da-compra.json) | Entrada e saída | 3 / 3 |
| [Ano bissexto](../content/exercises/ano-bissexto.json) | Decisões | 3 / 6 |
| [Classificação de triângulos](../content/exercises/classificacao-de-triangulos.json) | Decisões | 3 / 7 |
| [Diferença entre números](../content/exercises/diferenca-entre-numeros.json) | Decisões | 3 / 3 |
| [Maior de três números](../content/exercises/maior-de-tres-numeros.json) | Decisões | 3 / 6 |
| [Par ou ímpar](../content/exercises/par-ou-impar.json) | Decisões | 3 / 3 |
| [Sinal do número](../content/exercises/sinal-do-numero.json) | Decisões | 3 / 3 |
| [Situação do aluno](../content/exercises/situacao-do-aluno.json) | Decisões | 3 / 6 |
| [Contagem de pares](../content/exercises/contagem-de-pares.json) | Repetições | 3 / 3 |
| [Contagem regressiva](../content/exercises/contagem-regressiva.json) | Repetições | 3 / 3 |
| [Maior da sequência](../content/exercises/maior-da-sequencia.json) | Repetições | 3 / 3 |
| [Soma de um até N](../content/exercises/soma-de-um-ate-n.json) | Repetições | 3 / 3 |
| [Soma dos negativos](../content/exercises/soma-dos-negativos.json) | Repetições | 3 / 3 |
| [Tabuada](../content/exercises/tabuada.json) | Repetições | 3 / 3 |

## 1. Antecessor e sucessor

Identificador: `antecessor-e-sucessor` · Tema: Entrada e saída · Nível: Básico · Versão: 1

**Resumo:** Encontre os inteiros imediatamente antes e depois de um número.

**Enunciado**

Leia um número inteiro e descubra seu antecessor e seu sucessor. O antecessor é o número uma unidade menor; o sucessor é o número uma unidade maior.

**Entrada**

Uma linha contendo um número inteiro.

**Saída**

Duas linhas: na primeira, o antecessor; na segunda, o sucessor.

**Restrições**

−1 000 000 ≤ número ≤ 1 000 000.

#### Exemplo 1

Entrada:

```text
8
```

Saída esperada:

```text
7
9
```

#### Exemplo 2

Entrada:

```text
0
```

Saída esperada:

```text
-1
1
```

#### Exemplo 3

Entrada:

```text
-3
```

Saída esperada:

```text
-4
-2
```

**Dicas**

1. Guarde o número lido para usar o mesmo valor nos dois cálculos.
2. Subtraia 1 para obter o antecessor e some 1 para obter o sucessor. Use um print() para cada linha.

[Enunciado e todos os testes](../content/exercises/antecessor-e-sucessor.json) · [Solução de referência](../content/solutions/antecessor-e-sucessor.py)

## 2. Área do terreno

Identificador: `area-do-terreno` · Tema: Entrada e saída · Nível: Básico · Versão: 1

**Resumo:** Transforme duas medidas na área de um terreno retangular.

**Enunciado**

Uma horta comunitária ocupará um terreno retangular. Leia a largura e o comprimento do terreno e calcule sua área em metros quadrados.

**Entrada**

Duas linhas, cada uma com um número inteiro: a largura e o comprimento, nessa ordem.

**Saída**

Um único número inteiro, correspondente à área. Não imprima unidades ou mensagens adicionais.

**Restrições**

1 ≤ largura, comprimento ≤ 10 000.

#### Exemplo 1

Entrada:

```text
3
5
```

Saída esperada:

```text
15
```

#### Exemplo 2

Entrada:

```text
1
8
```

Saída esperada:

```text
8
```

#### Exemplo 3

Entrada:

```text
10
10
```

Saída esperada:

```text
100
```

**Dicas**

1. Leia cada medida com input() e converta o texto para inteiro usando int().
2. A área de um retângulo é largura × comprimento. Use * para multiplicar.

[Enunciado e todos os testes](../content/exercises/area-do-terreno.json) · [Solução de referência](../content/solutions/area-do-terreno.py)

## 3. Conversão de tempo

Identificador: `conversao-de-tempo` · Tema: Entrada e saída · Nível: Básico · Versão: 1

**Resumo:** Transforme uma duração em segundos em horas, minutos e segundos.

**Enunciado**

Um cronômetro informa uma duração total em segundos. Converta essa duração em horas completas, minutos restantes e segundos restantes. Cada hora tem 3 600 segundos e cada minuto tem 60 segundos. As horas não devem voltar a zero ao completar um dia.

**Entrada**

Uma linha contendo a duração total, como um número inteiro de segundos.

**Saída**

Uma linha com três inteiros separados por um único espaço, nesta ordem: horas, minutos e segundos. Não use zeros à esquerda nem imprima unidades.

**Restrições**

0 ≤ duração total ≤ 86 400. Os minutos e segundos da resposta devem estar entre 0 e 59.

#### Exemplo 1

Entrada:

```text
3661
```

Saída esperada:

```text
1 1 1
```

#### Exemplo 2

Entrada:

```text
59
```

Saída esperada:

```text
0 0 59
```

#### Exemplo 3

Entrada:

```text
7200
```

Saída esperada:

```text
2 0 0
```

**Dicas**

1. Use // para contar horas completas. O operador % permite encontrar quantos segundos sobraram.
2. Depois de separar as horas, divida o restante por 60 para obter os minutos e use o resto dessa divisão para os segundos.

[Enunciado e todos os testes](../content/exercises/conversao-de-tempo.json) · [Solução de referência](../content/solutions/conversao-de-tempo.py)

## 4. Média de três notas

Identificador: `media-de-tres-notas` · Tema: Entrada e saída · Nível: Básico · Versão: 1

**Resumo:** Calcule uma média aritmética e formate a resposta com duas casas decimais.

**Enunciado**

Uma atividade tem três notas inteiras, todas com o mesmo peso. Leia as notas e calcule a média aritmética: a soma das notas dividida por três.

**Entrada**

Três linhas, cada uma contendo uma nota inteira de 0 a 100.

**Saída**

Uma linha com a média, usando ponto como separador decimal e exatamente duas casas decimais, com arredondamento. Por exemplo, a média 8 deve aparecer como 8.00.

**Restrições**

0 ≤ cada nota ≤ 100.

#### Exemplo 1

Entrada:

```text
60
70
80
```

Saída esperada:

```text
70.00
```

#### Exemplo 2

Entrada:

```text
1
2
2
```

Saída esperada:

```text
1.67
```

#### Exemplo 3

Entrada:

```text
0
0
0
```

Saída esperada:

```text
0.00
```

**Dicas**

1. Some as três notas antes de dividir por 3. Parênteses ajudam a indicar a ordem do cálculo.
2. Para mostrar duas casas decimais, você pode usar print(f"{media:.2f}").

[Enunciado e todos os testes](../content/exercises/media-de-tres-notas.json) · [Solução de referência](../content/solutions/media-de-tres-notas.py)

## 5. Perímetro do retângulo

Identificador: `perimetro-do-retangulo` · Tema: Entrada e saída · Nível: Básico · Versão: 1

**Resumo:** Some os lados de um retângulo para descobrir seu perímetro.

**Enunciado**

Uma moldura retangular precisa de uma fita que percorra toda a sua borda. Leia a largura e a altura da moldura, em centímetros, e calcule seu perímetro. O perímetro é a soma das medidas dos quatro lados.

**Entrada**

Duas linhas com números inteiros: a largura e a altura, nessa ordem.

**Saída**

Um único inteiro com o perímetro em centímetros. Não imprima a unidade.

**Restrições**

1 ≤ largura, altura ≤ 10 000.

#### Exemplo 1

Entrada:

```text
3
5
```

Saída esperada:

```text
16
```

#### Exemplo 2

Entrada:

```text
4
4
```

Saída esperada:

```text
16
```

#### Exemplo 3

Entrada:

```text
1
8
```

Saída esperada:

```text
18
```

**Dicas**

1. Um retângulo tem dois lados com a medida da largura e dois com a medida da altura.
2. Some largura e altura e multiplique essa soma por 2.

[Enunciado e todos os testes](../content/exercises/perimetro-do-retangulo.json) · [Solução de referência](../content/solutions/perimetro-do-retangulo.py)

## 6. Soma de dois números

Identificador: `soma-de-dois-numeros` · Tema: Entrada e saída · Nível: Básico · Versão: 1

**Resumo:** Leia dois inteiros e mostre o resultado da soma.

**Enunciado**

Uma atividade registra dois valores inteiros. Leia os dois valores e calcule a soma deles. Os valores podem ser positivos, negativos ou zero.

**Entrada**

Duas linhas, cada uma contendo um número inteiro.

**Saída**

Um único inteiro com a soma dos dois valores. Não imprima mensagens adicionais.

**Restrições**

−1 000 000 ≤ cada valor ≤ 1 000 000.

#### Exemplo 1

Entrada:

```text
3
5
```

Saída esperada:

```text
8
```

#### Exemplo 2

Entrada:

```text
-4
9
```

Saída esperada:

```text
5
```

#### Exemplo 3

Entrada:

```text
0
0
```

Saída esperada:

```text
0
```

**Dicas**

1. Cada chamada de input() lê uma linha. Use int() para transformar o texto em inteiro.
2. O operador + soma dois números. Imprima o resultado com print().

[Enunciado e todos os testes](../content/exercises/soma-de-dois-numeros.json) · [Solução de referência](../content/solutions/soma-de-dois-numeros.py)

## 7. Troco da compra

Identificador: `troco-da-compra` · Tema: Entrada e saída · Nível: Básico · Versão: 1

**Resumo:** Calcule o troco usando valores inteiros em centavos.

**Enunciado**

Uma compra é registrada em centavos para evitar contas com valores decimais. Leia o preço total e o valor pago, ambos em centavos, e calcule o troco. O valor pago será sempre suficiente para a compra.

**Entrada**

Duas linhas: a primeira contém o preço total e a segunda contém o valor pago, ambos como números inteiros em centavos.

**Saída**

Um único inteiro com o troco em centavos. Não converta para reais nem imprima símbolo de moeda.

**Restrições**

0 ≤ preço total ≤ valor pago ≤ 1 000 000.

#### Exemplo 1

Entrada:

```text
1350
2000
```

Saída esperada:

```text
650
```

#### Exemplo 2

Entrada:

```text
500
500
```

Saída esperada:

```text
0
```

#### Exemplo 3

Entrada:

```text
99
100
```

Saída esperada:

```text
1
```

**Dicas**

1. As duas entradas já usam a mesma unidade: centavos. Não é necessário dividir por 100.
2. O troco é o valor pago menos o preço total.

[Enunciado e todos os testes](../content/exercises/troco-da-compra.json) · [Solução de referência](../content/solutions/troco-da-compra.py)

## 8. Ano bissexto

Identificador: `ano-bissexto` · Tema: Decisões · Nível: Básico · Versão: 1

**Resumo:** Combine condições de divisibilidade para classificar um ano.

**Enunciado**

Para esta atividade, aplique a seguinte regra a qualquer ano informado: um ano é bissexto se for divisível por 400 ou se for divisível por 4 e não for divisível por 100. Leia o ano e informe se ele é bissexto. Não é necessário considerar quando essa regra passou a ser usada na história.

**Entrada**

Uma linha contendo o ano, como um número inteiro positivo.

**Saída**

Uma linha com BISSEXTO ou COMUM, em letras maiúsculas.

**Restrições**

1 ≤ ano ≤ 9 999.

#### Exemplo 1

Entrada:

```text
2024
```

Saída esperada:

```text
BISSEXTO
```

#### Exemplo 2

Entrada:

```text
2023
```

Saída esperada:

```text
COMUM
```

#### Exemplo 3

Entrada:

```text
2000
```

Saída esperada:

```text
BISSEXTO
```

**Dicas**

1. Use % para descobrir se a divisão por cada um dos três números deixa resto zero.
2. A divisibilidade por 400 é suficiente. Nos demais casos, o ano precisa ser divisível por 4 e não ser divisível por 100.

[Enunciado e todos os testes](../content/exercises/ano-bissexto.json) · [Solução de referência](../content/solutions/ano-bissexto.py)

## 9. Classificação de triângulos

Identificador: `classificacao-de-triangulos` · Tema: Decisões · Nível: Básico · Versão: 1

**Resumo:** Verifique se três medidas formam um triângulo e classifique seus lados.

**Enunciado**

Leia três comprimentos inteiros positivos. Eles formam um triângulo somente se a soma de quaisquer dois lados for estritamente maior que o terceiro. Se não formarem um triângulo, informe INVALIDO. Caso contrário, classifique-o: EQUILATERO para três lados iguais, ISOSCELES para exatamente dois lados iguais ou ESCALENO para três lados diferentes.

**Entrada**

Três linhas, cada uma contendo o comprimento inteiro de um lado. Os lados podem ser informados em qualquer ordem.

**Saída**

Uma linha com INVALIDO, EQUILATERO, ISOSCELES ou ESCALENO. Use letras maiúsculas e não use acentos.

**Restrições**

1 ≤ cada lado ≤ 10 000.

#### Exemplo 1

Entrada:

```text
3
3
3
```

Saída esperada:

```text
EQUILATERO
```

#### Exemplo 2

Entrada:

```text
2
2
3
```

Saída esperada:

```text
ISOSCELES
```

#### Exemplo 3

Entrada:

```text
3
4
5
```

Saída esperada:

```text
ESCALENO
```

**Dicas**

1. Verifique as três somas: a + b > c, a + c > b e b + c > a. Uma igualdade não é suficiente.
2. Depois de validar o triângulo, teste primeiro se todos os lados são iguais. Em seguida, procure um par de lados iguais.

[Enunciado e todos os testes](../content/exercises/classificacao-de-triangulos.json) · [Solução de referência](../content/solutions/classificacao-de-triangulos.py)

## 10. Diferença entre números

Identificador: `diferenca-entre-numeros` · Tema: Decisões · Nível: Básico · Versão: 1

**Resumo:** Descubra o maior valor e calcule a diferença entre dois inteiros.

**Enunciado**

Dois participantes anotaram números inteiros. Leia os números e mostre a diferença do maior pelo menor. O resultado deve ser sempre maior ou igual a zero.

**Entrada**

Duas linhas com um número inteiro em cada uma.

**Saída**

Um único inteiro: o maior número menos o menor.

**Restrições**

−1 000 000 ≤ cada número ≤ 1 000 000. Os números podem ser iguais.

#### Exemplo 1

Entrada:

```text
9
4
```

Saída esperada:

```text
5
```

#### Exemplo 2

Entrada:

```text
2
8
```

Saída esperada:

```text
6
```

#### Exemplo 3

Entrada:

```text
5
5
```

Saída esperada:

```text
0
```

**Dicas**

1. Compare os dois números usando if e else.
2. Se a for maior que b, calcule a - b; caso contrário, calcule b - a.

[Enunciado e todos os testes](../content/exercises/diferenca-entre-numeros.json) · [Solução de referência](../content/solutions/diferenca-entre-numeros.py)

## 11. Maior de três números

Identificador: `maior-de-tres-numeros` · Tema: Decisões · Nível: Básico · Versão: 1

**Resumo:** Compare três inteiros, incluindo empates e valores negativos.

**Enunciado**

Três participantes anotaram números inteiros. Leia os três valores e mostre o maior deles. Se o maior aparecer mais de uma vez, imprima esse valor apenas uma vez.

**Entrada**

Três linhas, cada uma contendo um número inteiro.

**Saída**

Uma linha com o maior dos três valores.

**Restrições**

−1 000 000 ≤ cada valor ≤ 1 000 000. Valores repetidos são permitidos.

#### Exemplo 1

Entrada:

```text
9
4
2
```

Saída esperada:

```text
9
```

#### Exemplo 2

Entrada:

```text
3
8
5
```

Saída esperada:

```text
8
```

#### Exemplo 3

Entrada:

```text
1
2
7
```

Saída esperada:

```text
7
```

**Dicas**

1. Comece considerando o primeiro valor como o maior. Assim, valores negativos também serão tratados corretamente.
2. Compare o segundo e o terceiro com o maior guardado e atualize a variável quando encontrar um valor maior.

[Enunciado e todos os testes](../content/exercises/maior-de-tres-numeros.json) · [Solução de referência](../content/solutions/maior-de-tres-numeros.py)

## 12. Par ou ímpar

Identificador: `par-ou-impar` · Tema: Decisões · Nível: Básico · Versão: 1

**Resumo:** Use o resto da divisão para verificar a paridade de um inteiro.

**Enunciado**

Leia um número inteiro e informe se ele é par ou ímpar. Um número é par quando é divisível por 2, isto é, quando essa divisão deixa resto zero. O número zero é par.

**Entrada**

Uma linha contendo um número inteiro.

**Saída**

Uma linha com PAR ou IMPAR, em letras maiúsculas e sem acento.

**Restrições**

−1 000 000 ≤ número ≤ 1 000 000.

#### Exemplo 1

Entrada:

```text
8
```

Saída esperada:

```text
PAR
```

#### Exemplo 2

Entrada:

```text
7
```

Saída esperada:

```text
IMPAR
```

#### Exemplo 3

Entrada:

```text
0
```

Saída esperada:

```text
PAR
```

**Dicas**

1. O operador % calcula o resto de uma divisão.
2. Compare numero % 2 com zero e escolha a mensagem com if e else.

[Enunciado e todos os testes](../content/exercises/par-ou-impar.json) · [Solução de referência](../content/solutions/par-ou-impar.py)

## 13. Sinal do número

Identificador: `sinal-do-numero` · Tema: Decisões · Nível: Básico · Versão: 1

**Resumo:** Diferencie números positivos, negativos e o zero.

**Enunciado**

Leia um número inteiro e classifique seu sinal. Um número maior que zero é positivo; um número menor que zero é negativo. O zero deve receber uma classificação própria.

**Entrada**

Uma linha contendo um número inteiro.

**Saída**

Uma linha com POSITIVO, NEGATIVO ou ZERO, de acordo com o valor lido. Use exatamente essas palavras em letras maiúsculas.

**Restrições**

−1 000 000 ≤ número ≤ 1 000 000.

#### Exemplo 1

Entrada:

```text
12
```

Saída esperada:

```text
POSITIVO
```

#### Exemplo 2

Entrada:

```text
-8
```

Saída esperada:

```text
NEGATIVO
```

#### Exemplo 3

Entrada:

```text
0
```

Saída esperada:

```text
ZERO
```

**Dicas**

1. Há três possibilidades que não se sobrepõem: maior que zero, menor que zero e igual a zero.
2. Você pode testar os sinais com if e elif e reservar o else para o zero.

[Enunciado e todos os testes](../content/exercises/sinal-do-numero.json) · [Solução de referência](../content/solutions/sinal-do-numero.py)

## 14. Situação do aluno

Identificador: `situacao-do-aluno` · Tema: Decisões · Nível: Básico · Versão: 1

**Resumo:** Classifique uma nota usando dois limites de aprovação.

**Enunciado**

Nesta atividade, uma escola fictícia usa uma nota inteira de 0 a 100. Uma nota maior ou igual a 70 significa aprovação. Uma nota de 50 a 69 significa recuperação. Uma nota menor que 50 significa reprovação. Leia a nota e informe a situação correspondente.

**Entrada**

Uma linha contendo uma nota inteira de 0 a 100.

**Saída**

Uma linha com APROVADO, RECUPERACAO ou REPROVADO. Use letras maiúsculas e não use acentos.

**Restrições**

0 ≤ nota ≤ 100.

#### Exemplo 1

Entrada:

```text
85
```

Saída esperada:

```text
APROVADO
```

#### Exemplo 2

Entrada:

```text
60
```

Saída esperada:

```text
RECUPERACAO
```

#### Exemplo 3

Entrada:

```text
35
```

Saída esperada:

```text
REPROVADO
```

**Dicas**

1. Teste primeiro a faixa mais alta: notas maiores ou iguais a 70.
2. Se a nota não entrou na primeira faixa, teste se ela é maior ou igual a 50. O restante corresponde à reprovação.

[Enunciado e todos os testes](../content/exercises/situacao-do-aluno.json) · [Solução de referência](../content/solutions/situacao-do-aluno.py)

## 15. Contagem de pares

Identificador: `contagem-de-pares` · Tema: Repetições · Nível: Básico · Versão: 1

**Resumo:** Conte quantos valores de uma sequência são divisíveis por 2.

**Enunciado**

Leia a quantidade de valores de uma sequência e depois leia cada valor. Conte quantos deles são pares. O zero e os números negativos divisíveis por 2 também devem ser contados.

**Entrada**

A primeira linha contém um inteiro N, a quantidade de valores. As próximas N linhas contêm um inteiro em cada linha.

**Saída**

Uma linha com a quantidade de números pares, como um inteiro.

**Restrições**

1 ≤ N ≤ 100. −1 000 ≤ cada valor ≤ 1 000.

#### Exemplo 1

Entrada:

```text
5
1
2
3
4
5
```

Saída esperada:

```text
2
```

#### Exemplo 2

Entrada:

```text
3
1
3
5
```

Saída esperada:

```text
0
```

#### Exemplo 3

Entrada:

```text
4
0
-2
-3
8
```

Saída esperada:

```text
3
```

**Dicas**

1. Use um contador que começa em zero e faça exatamente N leituras dentro de um laço.
2. Aumente o contador somente quando o resto da divisão do valor por 2 for zero.

[Enunciado e todos os testes](../content/exercises/contagem-de-pares.json) · [Solução de referência](../content/solutions/contagem-de-pares.py)

## 16. Contagem regressiva

Identificador: `contagem-regressiva` · Tema: Repetições · Nível: Básico · Versão: 1

**Resumo:** Mostre os inteiros de um valor inicial até zero.

**Enunciado**

Leia um inteiro N e faça uma contagem regressiva: imprima N, depois N - 1, e continue até imprimir zero. Se N for zero, imprima somente zero.

**Entrada**

Uma linha contendo o inteiro N.

**Saída**

Uma linha para cada número da contagem, começando em N e terminando em zero. Não imprima mensagens adicionais.

**Restrições**

0 ≤ N ≤ 100.

#### Exemplo 1

Entrada:

```text
3
```

Saída esperada:

```text
3
2
1
0
```

#### Exemplo 2

Entrada:

```text
1
```

Saída esperada:

```text
1
0
```

#### Exemplo 3

Entrada:

```text
0
```

Saída esperada:

```text
0
```

**Dicas**

1. Um laço while pode continuar enquanto o valor atual for maior ou igual a zero.
2. Imprima o valor atual e depois diminua-o em 1. Não se esqueça de incluir o zero na saída.

[Enunciado e todos os testes](../content/exercises/contagem-regressiva.json) · [Solução de referência](../content/solutions/contagem-regressiva.py)

## 17. Maior da sequência

Identificador: `maior-da-sequencia` · Tema: Repetições · Nível: Básico · Versão: 1

**Resumo:** Encontre o maior valor entre N inteiros, sem esquecer os negativos.

**Enunciado**

Leia a quantidade de valores de uma sequência e depois leia os valores. Mostre o maior número informado. A sequência terá pelo menos um valor e poderá conter somente números negativos.

**Entrada**

A primeira linha contém um inteiro N. As próximas N linhas contêm os valores da sequência, um inteiro por linha.

**Saída**

Uma linha com o maior valor da sequência. Em caso de empate, imprima o valor apenas uma vez.

**Restrições**

1 ≤ N ≤ 100. −1 000 ≤ cada valor ≤ 1 000.

#### Exemplo 1

Entrada:

```text
4
3
8
2
5
```

Saída esperada:

```text
8
```

#### Exemplo 2

Entrada:

```text
3
-9
-2
-7
```

Saída esperada:

```text
-2
```

#### Exemplo 3

Entrada:

```text
1
6
```

Saída esperada:

```text
6
```

**Dicas**

1. Leia o primeiro valor como maior inicial. Depois, faltam N - 1 leituras.
2. Compare cada novo valor com o maior atual e atualize apenas quando o novo valor for maior.

[Enunciado e todos os testes](../content/exercises/maior-da-sequencia.json) · [Solução de referência](../content/solutions/maior-da-sequencia.py)

## 18. Soma de um até N

Identificador: `soma-de-um-ate-n` · Tema: Repetições · Nível: Básico · Versão: 1

**Resumo:** Acumule os inteiros de 1 até um limite informado.

**Enunciado**

Leia um inteiro N e calcule a soma de todos os inteiros de 1 até N, incluindo N. Se N for zero, não há valores nesse intervalo e a soma deve ser zero.

**Entrada**

Uma linha contendo o inteiro N.

**Saída**

Uma linha com a soma calculada, como um número inteiro.

**Restrições**

0 ≤ N ≤ 10 000.

#### Exemplo 1

Entrada:

```text
5
```

Saída esperada:

```text
15
```

#### Exemplo 2

Entrada:

```text
1
```

Saída esperada:

```text
1
```

#### Exemplo 3

Entrada:

```text
0
```

Saída esperada:

```text
0
```

**Dicas**

1. Inicie a soma com zero antes do laço.
2. Percorra range(1, n + 1) para incluir N. Se N for zero, esse laço não terá repetições.

[Enunciado e todos os testes](../content/exercises/soma-de-um-ate-n.json) · [Solução de referência](../content/solutions/soma-de-um-ate-n.py)

## 19. Soma dos negativos

Identificador: `soma-dos-negativos` · Tema: Repetições · Nível: Básico · Versão: 1

**Resumo:** Percorra dez números e acumule somente os valores negativos.

**Enunciado**

Uma estação registra dez variações de temperatura. Leia os dez números inteiros e calcule a soma apenas das variações negativas. Se não houver números negativos, a soma será zero.

**Entrada**

Dez linhas, cada uma contendo um número inteiro.

**Saída**

Um único inteiro com a soma dos valores negativos.

**Restrições**

−1 000 ≤ cada número ≤ 1 000. Sempre serão fornecidos exatamente dez números.

#### Exemplo 1

Entrada:

```text
1
-2
3
-4
5
6
7
8
9
10
```

Saída esperada:

```text
-6
```

#### Exemplo 2

Entrada:

```text
0
1
2
3
4
5
6
7
8
9
```

Saída esperada:

```text
0
```

#### Exemplo 3

Entrada:

```text
-1
-1
-1
-1
-1
-1
-1
-1
-1
-1
```

Saída esperada:

```text
-10
```

**Dicas**

1. Comece com uma variável acumuladora igual a zero e use um laço com dez repetições.
2. A cada leitura, some o número ao acumulador somente se ele for menor que zero.

[Enunciado e todos os testes](../content/exercises/soma-dos-negativos.json) · [Solução de referência](../content/solutions/soma-dos-negativos.py)

## 20. Tabuada

Identificador: `tabuada` · Tema: Repetições · Nível: Básico · Versão: 1

**Resumo:** Use uma repetição para mostrar dez multiplicações.

**Enunciado**

Leia um número inteiro e mostre sua tabuada, do multiplicador 1 ao multiplicador 10, em ordem crescente. Cada linha deve indicar o número, o multiplicador e o produto.

**Entrada**

Uma linha contendo um número inteiro.

**Saída**

Dez linhas no formato N x I = P, em que N é o número lido, I é o multiplicador e P é o produto. Use a letra x minúscula e um único espaço antes e depois de x e de =. Por exemplo: 3 x 2 = 6.

**Restrições**

−100 ≤ número ≤ 100.

#### Exemplo 1

Entrada:

```text
3
```

Saída esperada:

```text
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15
3 x 6 = 18
3 x 7 = 21
3 x 8 = 24
3 x 9 = 27
3 x 10 = 30
```

#### Exemplo 2

Entrada:

```text
0
```

Saída esperada:

```text
0 x 1 = 0
0 x 2 = 0
0 x 3 = 0
0 x 4 = 0
0 x 5 = 0
0 x 6 = 0
0 x 7 = 0
0 x 8 = 0
0 x 9 = 0
0 x 10 = 0
```

#### Exemplo 3

Entrada:

```text
-2
```

Saída esperada:

```text
-2 x 1 = -2
-2 x 2 = -4
-2 x 3 = -6
-2 x 4 = -8
-2 x 5 = -10
-2 x 6 = -12
-2 x 7 = -14
-2 x 8 = -16
-2 x 9 = -18
-2 x 10 = -20
```

**Dicas**

1. range(1, 11) gera os multiplicadores de 1 até 10; o limite final não é incluído.
2. Dentro do laço, calcule o produto e monte a linha com uma f-string, respeitando os espaços pedidos.

[Enunciado e todos os testes](../content/exercises/tabuada.json) · [Solução de referência](../content/solutions/tabuada.py)
