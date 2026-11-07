n = int(input())
soma = 0
for _ in range(n):
    valor = int(input())
    if valor % 2 == 0:
        soma += valor
print(soma)
