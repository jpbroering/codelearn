n = int(input())
maior = int(input())
for _ in range(n - 1):
    numero = int(input())
    if numero > maior:
        maior = numero
print(maior)
