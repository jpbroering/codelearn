a = int(input())
b = int(input())
c = int(input())
if a + b <= c or a + c <= b or b + c <= a:
    print("INVALIDO")
elif a == b == c:
    print("EQUILATERO")
elif a == b or a == c or b == c:
    print("ISOSCELES")
else:
    print("ESCALENO")
