total = int(input())
horas = total // 3600
restante = total % 3600
minutos = restante // 60
segundos = restante % 60
print(horas, minutos, segundos)
