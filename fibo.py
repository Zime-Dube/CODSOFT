def n_fibo (n):
    if n==0:
        return 0
    elif n==1:
        return 1
    else:
        return n_fibo(n-2) + n_fibo(n-1)
    
for i in range(10):
    print(n_fibo(i))
