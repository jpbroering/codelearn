n = int(input())
menor = int(input())
for _ in range(n - 1):
    valor = int(input())
    if valor < menor:
        menor = valor
print(menor)
