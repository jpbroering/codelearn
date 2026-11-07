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
| [Acesso ao evento](../content/exercises/acesso-ao-evento.json) | Decisões | 3 / 3 |
| [Desconto de compra](../content/exercises/desconto-de-compra.json) | Decisões | 3 / 3 |
| [Entrada acompanhada](../content/exercises/maioridade-com-acompanhante.json) | Decisões | 3 / 3 |
| [Múltiplo de cinco](../content/exercises/multiplo-de-cinco.json) | Decisões | 3 / 3 |
| [Temperatura em faixa](../content/exercises/intervalo-de-temperatura.json) | Decisões | 3 / 3 |
| [Contagem até negativo](../content/exercises/contagem-ate-negativo.json) | Repetições | 3 / 3 |
| [Contar múltiplos de três](../content/exercises/contar-multiplos-de-tres.json) | Repetições | 3 / 3 |
| [Contar positivos](../content/exercises/contar-valores-positivos.json) | Repetições | 3 / 3 |
| [Ímpares até N](../content/exercises/impares-ate-n.json) | Repetições | 3 / 3 |
| [Intervalo crescente](../content/exercises/intervalo-crescente.json) | Repetições | 3 / 3 |
| [Menor valor](../content/exercises/menor-de-n-valores.json) | Repetições | 3 / 3 |
| [Números até N](../content/exercises/numeros-ate-n.json) | Repetições | 3 / 3 |
| [Pares até N](../content/exercises/pares-ate-n.json) | Repetições | 3 / 3 |
| [Potência por repetição](../content/exercises/potencia-por-repeticao.json) | Repetições | 3 / 3 |
| [Produto de 1 até N](../content/exercises/produto-de-um-ate-n.json) | Repetições | 3 / 3 |
| [Quantidade de divisores](../content/exercises/quantidade-de-divisores.json) | Repetições | 3 / 3 |
| [Soma até zero](../content/exercises/soma-ate-zero.json) | Repetições | 3 / 3 |
| [Soma de intervalo](../content/exercises/soma-de-intervalo.json) | Repetições | 3 / 3 |
| [Soma de N valores](../content/exercises/soma-de-n-valores.json) | Repetições | 3 / 3 |
| [Soma dos pares lidos](../content/exercises/soma-dos-pares-da-sequencia.json) | Repetições | 3 / 3 |

## 1. Acesso ao evento

Identificador: `acesso-ao-evento` · Tema: Decisões · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, comparações.

**Resumo:** Decida se uma pessoa tem idade para entrar.

**Enunciado**

Uma atividade aceita pessoas com 16 anos ou mais. Leia a idade e informe se a entrada é permitida.

**Entrada**

Uma linha com a idade inteira.

**Saída**

PERMITIDA se a idade for pelo menos 16; caso contrário, NEGADA.

**Restrições**

0 ≤ idade ≤ 120.

#### Exemplo 1

Entrada:

```text
16
```

Saída esperada:

```text
PERMITIDA
```

#### Exemplo 2

Entrada:

```text
15
```

Saída esperada:

```text
NEGADA
```

#### Exemplo 3

Entrada:

```text
30
```

Saída esperada:

```text
PERMITIDA
```

**Dicas**

1. Compare a idade com o limite usando >=.
2. Use if e else para escolher uma das duas mensagens.

[Enunciado e todos os testes](../content/exercises/acesso-ao-evento.json) · [Solução de referência](../content/solutions/acesso-ao-evento.py)

## 2. Desconto de compra

Identificador: `desconto-de-compra` · Tema: Decisões · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, comparações.

**Resumo:** Aplique um desconto fixo a compras elegíveis.

**Enunciado**

Uma loja concede desconto de 10 centavos para compras a partir de 100 centavos. Leia o valor da compra e calcule quanto será pago.

**Entrada**

Uma linha com o valor inteiro em centavos.

**Saída**

Uma linha com o valor final em centavos, sem símbolo de moeda.

**Restrições**

0 ≤ valor ≤ 100 000.

#### Exemplo 1

Entrada:

```text
100
```

Saída esperada:

```text
90
```

#### Exemplo 2

Entrada:

```text
99
```

Saída esperada:

```text
99
```

#### Exemplo 3

Entrada:

```text
250
```

Saída esperada:

```text
240
```

**Dicas**

1. Compare o valor com 100.
2. Subtraia 10 apenas quando a condição for verdadeira.

[Enunciado e todos os testes](../content/exercises/desconto-de-compra.json) · [Solução de referência](../content/solutions/desconto-de-compra.py)

## 3. Entrada acompanhada

Identificador: `maioridade-com-acompanhante` · Tema: Decisões · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, comparações.

**Resumo:** Combine duas condições para permitir uma entrada.

**Enunciado**

Uma pessoa pode entrar se tiver pelo menos 18 anos ou se estiver acompanhada por um responsável. Leia a idade e a indicação de acompanhamento.

**Entrada**

Duas linhas: idade inteira e, depois, 1 se acompanhada ou 0 caso contrário.

**Saída**

PERMITIDA se uma das condições permitir a entrada; caso contrário, NEGADA.

**Restrições**

0 ≤ idade ≤ 120; acompanhamento é 0 ou 1.

#### Exemplo 1

Entrada:

```text
17
0
```

Saída esperada:

```text
NEGADA
```

#### Exemplo 2

Entrada:

```text
17
1
```

Saída esperada:

```text
PERMITIDA
```

#### Exemplo 3

Entrada:

```text
18
0
```

Saída esperada:

```text
PERMITIDA
```

**Dicas**

1. Basta uma das duas condições ser verdadeira.
2. Combine as comparações com or.

[Enunciado e todos os testes](../content/exercises/maioridade-com-acompanhante.json) · [Solução de referência](../content/solutions/maioridade-com-acompanhante.py)

## 4. Múltiplo de cinco

Identificador: `multiplo-de-cinco` · Tema: Decisões · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, comparações.

**Resumo:** Verifique a divisibilidade de um inteiro.

**Enunciado**

Leia um inteiro e determine se ele é múltiplo de 5. O zero também é múltiplo de 5.

**Entrada**

Uma linha com um inteiro.

**Saída**

SIM se for múltiplo de 5; caso contrário, NAO, sem acento.

**Restrições**

−1 000 000 ≤ número ≤ 1 000 000.

#### Exemplo 1

Entrada:

```text
10
```

Saída esperada:

```text
SIM
```

#### Exemplo 2

Entrada:

```text
13
```

Saída esperada:

```text
NAO
```

#### Exemplo 3

Entrada:

```text
0
```

Saída esperada:

```text
SIM
```

**Dicas**

1. O operador % calcula o resto da divisão.
2. Um múltiplo de 5 tem resto zero ao ser dividido por 5.

[Enunciado e todos os testes](../content/exercises/multiplo-de-cinco.json) · [Solução de referência](../content/solutions/multiplo-de-cinco.py)

## 5. Temperatura em faixa

Identificador: `intervalo-de-temperatura` · Tema: Decisões · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, comparações.

**Resumo:** Classifique um valor em três faixas.

**Enunciado**

Leia uma temperatura inteira em graus Celsius. Classifique como FRIO se for menor que 15, AGRADAVEL se estiver entre 15 e 25 inclusive, ou QUENTE se for maior que 25.

**Entrada**

Uma linha com a temperatura inteira.

**Saída**

Uma linha com FRIO, AGRADAVEL ou QUENTE, em maiúsculas e sem acento.

**Restrições**

−50 ≤ temperatura ≤ 60.

#### Exemplo 1

Entrada:

```text
14
```

Saída esperada:

```text
FRIO
```

#### Exemplo 2

Entrada:

```text
15
```

Saída esperada:

```text
AGRADAVEL
```

#### Exemplo 3

Entrada:

```text
26
```

Saída esperada:

```text
QUENTE
```

**Dicas**

1. Verifique primeiro se a temperatura é menor que 15.
2. Use elif para verificar o limite superior da faixa intermediária.

[Enunciado e todos os testes](../content/exercises/intervalo-de-temperatura.json) · [Solução de referência](../content/solutions/intervalo-de-temperatura.py)

## 6. Contagem até negativo

Identificador: `contagem-ate-negativo` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Conte leituras até uma sentinela.

**Enunciado**

Leia inteiros até encontrar um número negativo. Conte quantos valores não negativos foram lidos antes dele; o valor negativo não entra na contagem.

**Entrada**

Uma sequência de inteiros, um por linha, terminada por um número negativo.

**Saída**

Uma linha com a contagem.

**Restrições**

Há no máximo 100 valores antes da sentinela; valores entre −1 000 e 1 000.

#### Exemplo 1

Entrada:

```text
3
0
8
-1
```

Saída esperada:

```text
3
```

#### Exemplo 2

Entrada:

```text
-5
```

Saída esperada:

```text
0
```

#### Exemplo 3

Entrada:

```text
0
-1
```

Saída esperada:

```text
1
```

**Dicas**

1. O valor negativo encerra a repetição.
2. Conte cada valor maior ou igual a zero antes de ler o próximo.

[Enunciado e todos os testes](../content/exercises/contagem-ate-negativo.json) · [Solução de referência](../content/solutions/contagem-ate-negativo.py)

## 7. Contar múltiplos de três

Identificador: `contar-multiplos-de-tres` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Conte valores divisíveis por três.

**Enunciado**

Leia N inteiros e conte quantos são múltiplos de 3. Considere zero múltiplo de 3.

**Entrada**

Primeira linha: N. Em seguida, N linhas com um inteiro cada.

**Saída**

Uma linha com a quantidade de múltiplos de 3.

**Restrições**

1 ≤ N ≤ 100; cada valor está entre −1 000 e 1 000.

#### Exemplo 1

Entrada:

```text
4
3
4
0
-6
```

Saída esperada:

```text
3
```

#### Exemplo 2

Entrada:

```text
1
2
```

Saída esperada:

```text
0
```

#### Exemplo 3

Entrada:

```text
3
1
2
3
```

Saída esperada:

```text
1
```

**Dicas**

1. Teste o resto da divisão por 3.
2. Aumente o contador quando esse resto for zero.

[Enunciado e todos os testes](../content/exercises/contar-multiplos-de-tres.json) · [Solução de referência](../content/solutions/contar-multiplos-de-tres.py)

## 8. Contar positivos

Identificador: `contar-valores-positivos` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Conte valores positivos em uma sequência.

**Enunciado**

Leia N inteiros e conte quantos são maiores que zero. Zero não é positivo.

**Entrada**

Primeira linha: N. Em seguida, N linhas com um inteiro cada.

**Saída**

Uma linha com a quantidade de valores positivos.

**Restrições**

1 ≤ N ≤ 100; cada valor está entre −1 000 e 1 000.

#### Exemplo 1

Entrada:

```text
4
2
0
-1
5
```

Saída esperada:

```text
2
```

#### Exemplo 2

Entrada:

```text
1
0
```

Saída esperada:

```text
0
```

#### Exemplo 3

Entrada:

```text
3
1
2
3
```

Saída esperada:

```text
3
```

**Dicas**

1. Use uma variável contadora iniciada em zero.
2. Incremente a contagem apenas quando o valor for maior que zero.

[Enunciado e todos os testes](../content/exercises/contar-valores-positivos.json) · [Solução de referência](../content/solutions/contar-valores-positivos.py)

## 9. Ímpares até N

Identificador: `impares-ate-n` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Liste os números ímpares de uma faixa.

**Enunciado**

Leia N e mostre os números ímpares de 1 até N, inclusive, em ordem crescente.

**Entrada**

Uma linha com N inteiro.

**Saída**

Um número ímpar por linha.

**Restrições**

1 ≤ N ≤ 100.

#### Exemplo 1

Entrada:

```text
5
```

Saída esperada:

```text
1
3
5
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
6
```

Saída esperada:

```text
1
3
5
```

**Dicas**

1. O primeiro número é 1.
2. Avance de 2 em 2 sem ultrapassar N.

[Enunciado e todos os testes](../content/exercises/impares-ate-n.json) · [Solução de referência](../content/solutions/impares-ate-n.py)

## 10. Intervalo crescente

Identificador: `intervalo-crescente` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Percorra uma faixa com início e fim.

**Enunciado**

Leia dois inteiros A e B e mostre todos os inteiros de A até B, inclusive, em ordem crescente.

**Entrada**

Duas linhas: A e depois B.

**Saída**

Um número por linha.

**Restrições**

−50 ≤ A ≤ B ≤ 50.

#### Exemplo 1

Entrada:

```text
2
5
```

Saída esperada:

```text
2
3
4
5
```

#### Exemplo 2

Entrada:

```text
-2
1
```

Saída esperada:

```text
-2
-1
0
1
```

#### Exemplo 3

Entrada:

```text
4
4
```

Saída esperada:

```text
4
```

**Dicas**

1. Inclua os dois extremos.
2. O limite superior de range precisa ser B + 1.

[Enunciado e todos os testes](../content/exercises/intervalo-crescente.json) · [Solução de referência](../content/solutions/intervalo-crescente.py)

## 11. Menor valor

Identificador: `menor-de-n-valores` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Encontre o menor entre vários valores.

**Enunciado**

Leia N inteiros e mostre o menor deles.

**Entrada**

Primeira linha: N. Em seguida, N linhas com um inteiro cada.

**Saída**

Uma linha com o menor valor.

**Restrições**

1 ≤ N ≤ 100; cada valor está entre −1 000 e 1 000.

#### Exemplo 1

Entrada:

```text
4
8
3
6
5
```

Saída esperada:

```text
3
```

#### Exemplo 2

Entrada:

```text
1
-7
```

Saída esperada:

```text
-7
```

#### Exemplo 3

Entrada:

```text
3
4
4
4
```

Saída esperada:

```text
4
```

**Dicas**

1. Use o primeiro valor como menor inicial.
2. Compare cada um dos demais valores com o menor encontrado.

[Enunciado e todos os testes](../content/exercises/menor-de-n-valores.json) · [Solução de referência](../content/solutions/menor-de-n-valores.py)

## 12. Números até N

Identificador: `numeros-ate-n` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Mostre uma sequência crescente.

**Enunciado**

Leia N e imprima os inteiros de 1 até N, inclusive, em ordem crescente.

**Entrada**

Uma linha com N inteiro.

**Saída**

Um número por linha.

**Restrições**

1 ≤ N ≤ 100.

#### Exemplo 1

Entrada:

```text
3
```

Saída esperada:

```text
1
2
3
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
5
```

Saída esperada:

```text
1
2
3
4
5
```

**Dicas**

1. Comece em 1 e avance de um em um.
2. Em range, o limite final não é incluído.

[Enunciado e todos os testes](../content/exercises/numeros-ate-n.json) · [Solução de referência](../content/solutions/numeros-ate-n.py)

## 13. Pares até N

Identificador: `pares-ate-n` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Liste os números pares de uma faixa.

**Enunciado**

Leia N e mostre os números pares de 2 até N, inclusive, em ordem crescente.

**Entrada**

Uma linha com N inteiro.

**Saída**

Um número par por linha.

**Restrições**

2 ≤ N ≤ 100.

#### Exemplo 1

Entrada:

```text
6
```

Saída esperada:

```text
2
4
6
```

#### Exemplo 2

Entrada:

```text
2
```

Saída esperada:

```text
2
```

#### Exemplo 3

Entrada:

```text
7
```

Saída esperada:

```text
2
4
6
```

**Dicas**

1. Comece em 2.
2. Avance de 2 em 2 ou verifique o resto da divisão.

[Enunciado e todos os testes](../content/exercises/pares-ate-n.json) · [Solução de referência](../content/solutions/pares-ate-n.py)

## 14. Potência por repetição

Identificador: `potencia-por-repeticao` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Multiplique uma base repetidamente.

**Enunciado**

Leia uma base inteira e um expoente inteiro não negativo. Calcule a potência multiplicando a base por ela mesma a quantidade de vezes indicada pelo expoente. Qualquer base elevada a zero resulta em 1, inclusive zero.

**Entrada**

Duas linhas: base e depois expoente.

**Saída**

Uma linha com o resultado inteiro.

**Restrições**

−10 ≤ base ≤ 10; 0 ≤ expoente ≤ 6.

#### Exemplo 1

Entrada:

```text
2
3
```

Saída esperada:

```text
8
```

#### Exemplo 2

Entrada:

```text
-2
3
```

Saída esperada:

```text
-8
```

#### Exemplo 3

Entrada:

```text
0
0
```

Saída esperada:

```text
1
```

**Dicas**

1. Inicie o resultado com 1.
2. Repita a multiplicação pela base expoente vezes.

[Enunciado e todos os testes](../content/exercises/potencia-por-repeticao.json) · [Solução de referência](../content/solutions/potencia-por-repeticao.py)

## 15. Produto de 1 até N

Identificador: `produto-de-um-ate-n` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Calcule um produto usando acumulador.

**Enunciado**

Leia N e calcule o produto dos inteiros de 1 até N, inclusive. Para N igual a zero, o produto é 1.

**Entrada**

Uma linha com N inteiro.

**Saída**

Uma linha com o produto inteiro.

**Restrições**

0 ≤ N ≤ 10.

#### Exemplo 1

Entrada:

```text
4
```

Saída esperada:

```text
24
```

#### Exemplo 2

Entrada:

```text
0
```

Saída esperada:

```text
1
```

#### Exemplo 3

Entrada:

```text
1
```

Saída esperada:

```text
1
```

**Dicas**

1. Comece o acumulador em 1.
2. Multiplique o acumulador por cada número de 1 até N.

[Enunciado e todos os testes](../content/exercises/produto-de-um-ate-n.json) · [Solução de referência](../content/solutions/produto-de-um-ate-n.py)

## 16. Quantidade de divisores

Identificador: `quantidade-de-divisores` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Conte os divisores positivos de um número.

**Enunciado**

Leia um inteiro positivo N e conte quantos inteiros positivos dividem N exatamente, incluindo 1 e o próprio N.

**Entrada**

Uma linha com N inteiro.

**Saída**

Uma linha com a quantidade de divisores positivos.

**Restrições**

1 ≤ N ≤ 1000.

#### Exemplo 1

Entrada:

```text
6
```

Saída esperada:

```text
4
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
7
```

Saída esperada:

```text
2
```

**Dicas**

1. Teste os candidatos de 1 até N.
2. Um divisor deixa resto zero em N % candidato.

[Enunciado e todos os testes](../content/exercises/quantidade-de-divisores.json) · [Solução de referência](../content/solutions/quantidade-de-divisores.py)

## 17. Soma até zero

Identificador: `soma-ate-zero` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Use uma sentinela para encerrar leituras.

**Enunciado**

Leia inteiros até encontrar zero. Some os valores anteriores ao zero. O zero encerra a leitura e não precisa ser somado.

**Entrada**

Uma sequência de inteiros, um por linha, terminada por zero.

**Saída**

Uma linha com a soma dos valores anteriores ao zero.

**Restrições**

Há no máximo 100 valores antes do zero; cada um está entre −1 000 e 1 000.

#### Exemplo 1

Entrada:

```text
3
5
0
```

Saída esperada:

```text
8
```

#### Exemplo 2

Entrada:

```text
0
```

Saída esperada:

```text
0
```

#### Exemplo 3

Entrada:

```text
-2
4
0
```

Saída esperada:

```text
2
```

**Dicas**

1. Leia um valor antes de verificar a condição.
2. Enquanto o valor for diferente de zero, acumule e leia o próximo.

[Enunciado e todos os testes](../content/exercises/soma-ate-zero.json) · [Solução de referência](../content/solutions/soma-ate-zero.py)

## 18. Soma de intervalo

Identificador: `soma-de-intervalo` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Acumule os valores de um intervalo.

**Enunciado**

Leia A e B e calcule a soma de todos os inteiros de A até B, incluindo os extremos.

**Entrada**

Duas linhas: A e depois B.

**Saída**

Uma linha com a soma inteira.

**Restrições**

−100 ≤ A ≤ B ≤ 100.

#### Exemplo 1

Entrada:

```text
1
4
```

Saída esperada:

```text
10
```

#### Exemplo 2

Entrada:

```text
-2
2
```

Saída esperada:

```text
0
```

#### Exemplo 3

Entrada:

```text
5
5
```

Saída esperada:

```text
5
```

**Dicas**

1. Comece a soma em zero.
2. Para cada número do intervalo, acrescente-o ao acumulador.

[Enunciado e todos os testes](../content/exercises/soma-de-intervalo.json) · [Solução de referência](../content/solutions/soma-de-intervalo.py)

## 19. Soma de N valores

Identificador: `soma-de-n-valores` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Leia vários valores e calcule a soma.

**Enunciado**

Leia uma quantidade N e, em seguida, N inteiros. Calcule a soma dos valores lidos.

**Entrada**

Primeira linha: N. Em seguida, N linhas com um inteiro cada.

**Saída**

Uma linha com a soma.

**Restrições**

1 ≤ N ≤ 100; cada valor está entre −1 000 e 1 000.

#### Exemplo 1

Entrada:

```text
3
2
4
6
```

Saída esperada:

```text
12
```

#### Exemplo 2

Entrada:

```text
1
-5
```

Saída esperada:

```text
-5
```

#### Exemplo 3

Entrada:

```text
4
1
-1
2
-2
```

Saída esperada:

```text
0
```

**Dicas**

1. Leia N antes de iniciar a repetição.
2. Repita a leitura N vezes e acumule cada valor.

[Enunciado e todos os testes](../content/exercises/soma-de-n-valores.json) · [Solução de referência](../content/solutions/soma-de-n-valores.py)

## 20. Soma dos pares lidos

Identificador: `soma-dos-pares-da-sequencia` · Tema: Repetições · Nível: Básico · Versão: 1

**Você vai usar:** leitura com input(), conversão com int(), saída com print(), if/elif/else, laços de repetição, contadores e acumuladores.

**Resumo:** Some apenas os valores pares de uma sequência.

**Enunciado**

Leia N inteiros e some somente os valores pares.

**Entrada**

Primeira linha: N. Em seguida, N linhas com um inteiro cada.

**Saída**

Uma linha com a soma dos pares; se não houver pares, imprima 0.

**Restrições**

1 ≤ N ≤ 100; cada valor está entre −1 000 e 1 000.

#### Exemplo 1

Entrada:

```text
4
2
3
4
5
```

Saída esperada:

```text
6
```

#### Exemplo 2

Entrada:

```text
2
1
3
```

Saída esperada:

```text
0
```

#### Exemplo 3

Entrada:

```text
3
-2
0
4
```

Saída esperada:

```text
2
```

**Dicas**

1. Use % 2 para identificar pares.
2. Acumule apenas os valores com resto zero.

[Enunciado e todos os testes](../content/exercises/soma-dos-pares-da-sequencia.json) · [Solução de referência](../content/solutions/soma-dos-pares-da-sequencia.py)
