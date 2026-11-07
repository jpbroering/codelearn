n = int(input())
contagem = 0
for _ in range(n):
    valor = int(input())
    if valor % 3 == 0:
        contagem += 1
print(contagem)
