import json
import numpy as np

T= np.linspace(0,1,101) #se divide un segundo en 100 partes 


data = {}
#Variables de posicion
x=np.zeros(101)
y=np.zeros(101)
z=np.zeros(101)
vx=np.zeros(101)
vy=np.zeros(101)
vz=np.zeros(101)
#Variables angulares en radianes
Theta=np.zeros(101)
Phi=np.zeros(101)
Chi=np.zeros(101)
vTheta=np.zeros(101)
vPhi=np.zeros(101)
vChi=np.zeros(101)
########################################
#Valores iniciales de las variables recogidos en JS
x[0]=0
y[0]=0
z[0]=0
vx[0]=0
vy[0]=0
vz[0]=0
#Variables angulares en  radianes
Theta[0]=0
Phi[0]=0
Chi[0]=0
vTheta[0]=0
vPhi[0]=0
vChi[0]=0

Nu = np.arctan(vz[0]/np.sqrt((vx[0]**2)+(vy[0]**2)))
alpha=0



#iniciamos bucle temporal de un segundo
for i in range (1,101):

    x[i]= x[i-1] + 2
    alpha= Theta[i-1]-Nu

    

    data[i]= []

    data[i].append({
    #posicion  
        'x': x[i],
        'y': y[i],
        'z': x[i],
        'vx': x[i],
        'vy': x[i],
        'vz': x[i],
    #angulos
        'Theta': x[i],
        'Phi': x[i],
        'Chi': x[i],
        'vTheta': x[i],
        'vPhi': x[i],
        'vChi': x[i]

    })
    Nu = np.arctan(vz[0]/np.sqrt((vx[0]**2)+(vy[0]**2)))

with open('data.json', 'w') as file:
    json.dump(data, file, indent=1)