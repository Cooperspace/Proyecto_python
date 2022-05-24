from cmath import pi
from tkinter import W
import numpy as np

T= np.linspace(0,1000,10001)

print(T)
#Declaracion de variables generales
     #N
M=1000      #Kg
E=1500       #N
#Constantes aerodinamicas
#Resistencia
Cd0=0.0035
k= 0.0018

#Sustentacion
ClAlpha=2*pi
Cl0=0.4631

Sw=20      #m2
C=1        #m
#inicializar variables
V0= 0       #m/s
Vx= 0       #m/s
Vy= 0       #m/s
x=0
y=0
g= 9.81     #m/s2
Rho= 1.225  #kg/m3
Cl=0
alpha=0
Theta=0
vTheta=0
aTheta=0
I=3000 
delta=0

#funcion de Cl en funcion del angulo de ataque


# def Moms(Vo,alpha,delta): #suma de momentos previo a calcular el momento angular
#     M=(0.5*Rho*(Vo**2))*((Cl(alpha)*Sw*0.25)-(0.1*Sw*1)-(3*5*Cl(alpha+delta)))-g*20*5
#     return M


for i in range(1,300):

    a=0 #variable para pasar alpha a grados
    a=(alpha*180)/pi 
    if a>-20 and a<17 :
        Cl=Cl0 + ClAlpha*alpha
    if a<-20 :
        Cl=-0.5
    else :
        Cl=1
    

    Cd = Cd0 + k*(Cl**2)
    L= (0.5*Rho*Cl*Sw*(V0**2))
    D= 0.5*Rho*Cd*Sw*(V0**2)

    Dt=(T[i]-T[i-1])
    ax= (E/M)*np.cos(Theta)-(D/M)*np.cos(Theta)
    ay= (L/M)*np.cos(Theta)+(E/M)*np.sin(Theta)-(D/M)*np.sin(Theta)-g
    Vx=Vx+ax*Dt
    print(Vx,ax,ay)
    #Calculo del giro en theta
    #aTheta= (Moms(Vo,alpha,delta)/I)
    # if y<=0 and aTheta<0:
    #     aTheta=0
    #     vTheta=0
    #     Theta=0
    # else :
     
    #     vTheta=vTheta + aTheta*Dt
    #     Theta= Theta + vTheta*Dt + 0.5*aTheta*(Dt**2)

    V0=np.sqrt((Vx**2)+(Vy**2))
    if y==0 and ay<=0:
        Vy=0
        ay=0
    else :

        Vy=Vy+ay*Dt
    x= x+ Vx*Dt +0.5*ax*(Dt**2)
    y= y+ Vy*Dt +0.5*ay*(Dt**2)

    Theta= (pi/17)
    alpha=Theta-np.tan(Vy/Vx)

    #print(V0,ax,Vy,alpha)
        