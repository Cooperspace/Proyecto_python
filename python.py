import numpy as np
from cmath import pi
from tkinter import W


class avion(object):
    def __init__(self,diccionario) :
        self.diccionario= diccionario
        self.peso= 1000 #Kg
        self.Sw=20      #m2
        self.C=1        #m
        self.E=1500     #N
        self.Rho=1.225  #Kg/m3
        self.delta=0    #rad
    def Girar(self): #giro respecto el plano horizontal
        if self.diccionario['ArrowDown'] == True:
            self.delta= (5/180)*pi
        else :
            self.delta= 0
    
        


class Aerodinamica(object):
    def _init_(self):
        self.diccionario=diccionario2
        self.V0=0.5
        self.ClAlpha=2*pi
        self.Cd0=0.0018
        self.k=0.0036
        self.Cm=-0.1
        self.L=0

    def Lift(self,avioneta):
        self.Cl0=0.5

        self.L=(*(avioneta.Sw))
        
Realidad= Aerodinamica()
    #def Lift(self):
cessna= avion({})

Realidad.Lift(cessna)

print("Lift=", Realidad.L)

# class posiciones:
#     def __init__(self,diccionario):
#         self.diccionario= diccionario
#         self.x= self.diccionario['x0']
#         self.y= self.diccionario['y0']
#         self.z= self.diccionario['z0']
#         self.vx=0
#         self.vy=0

#     def ecuaciones(self):
#         x 
