base = int(input())
expoente = int(input())
resultado = 1
for _ in range(expoente):
    resultado *= base
print(resultado)
