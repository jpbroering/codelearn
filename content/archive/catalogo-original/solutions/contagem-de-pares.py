n = int(input())
pares = 0
for _ in range(n):
    numero = int(input())
    if numero % 2 == 0:
        pares += 1
print(pares)
