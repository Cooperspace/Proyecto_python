import numpy as np

T= np.linspace(0,10,101,)

print(T)

E= 1000
W=10000
Cd=0.0035
Cl=0.5
Sw=100
Vo= 0
g= 9.81
Rho= 1.225

for i in range ():

    ax= (E/W)-((0.5*Rho*Cd*Sw(Vo**2))/W)
    ay= ((0.5*Rho*Cl*Sw*(Vo**2))/W)-g 
    Vo=Vo+ax*(T(i)-T(i-1))