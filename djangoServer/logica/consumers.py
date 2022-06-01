from cmath import pi
import json
import numpy as np
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import time

class entornoConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        print("congratulations it is connected")

        await self.accept()
        await self.send(text_data=json.dumps({
            'type': 'connection_established',
            'message': 'You are now connected!'
        }))

        # await self.send({"type": "websocket.accept",})
                        



        # await self.send({"type":"websocket.send","text":0})
                        

        

    async def disconnect(self,Close_code):
        print("Now it is disconnected",Close_code)

    async def receive(self, text_data):
        """
        Receive message from WebSocket.
        Get the event and send the appropriate event
        """
        diccionario = json.loads(text_data)
        datos = Prueba(diccionario)
        coordenadas = datos.data
        l=coordenadas[3]
        r=l[0]
        
        #print(diccionario)

        #time.sleep(1)
        await self.send(text_data=json.dumps(coordenadas))
        #print(datos.diccionario)

        # datos.girar()
        # data = {'flecha_abajo':datos.ArrowDown}
        # print(data)
        # print("recibido", response)
        # respuesta = response["numero1"]+response["numero2"]
        # print("respuesta",respuesta)
        # await self.send(text_data=json.du3mps(
        #     {"respuesta":respuesta}
        # ))
        


# class operaciones:
#     def __init__(self,diccionario):
#         self.diccionario = diccionario
#         self.ArrowDown = 1
#     def girar(self):
#         if self.diccionario["ArrowDown"] == True:
#             self.ArrowDown = 0.05
            
#         else:
#             self.ArrowDown = 0
class Prueba:
    def __init__(self,diccionario):
        self.diccionario = diccionario

# diccionario= clase.receive()

        T= np.linspace(0,1,101) #se divide un segundo en 100 partes 
        DT= 0.01 #diferencial de tiempo
        data= {}
        
        #Variables de posicion
        x=np.zeros(101)
        y=np.zeros(101)
        z=np.zeros(101)
        vx=np.zeros(101)
        vy=np.zeros(101)
        vz=np.zeros(101)
        #Variables angulares en radianes
        Th=np.zeros(101)
        Ph=np.zeros(101)
        Chi=np.zeros(101)
        vTheta=np.zeros(101)
        vPhi=np.zeros(101)
        vChi=np.zeros(101)
        V0=np.zeros(101)
        ########################################
        #Valores iniciales de las variables recogidos en JS
        x[0]= self.diccionario['x0']
        y[0]= self.diccionario['y0']
        z[0]= self.diccionario['z0']

        vx[0]=self.diccionario['Vx']
        vy[0]=self.diccionario['Vy']
        vz[0]=self.diccionario['Vz']+0.00001
        V0[0]=np.sqrt((vx[0]**2)+(vz[0]**2))
        #Variables angulares en  radianes
        Th[0]=self.diccionario['Theta']
        Ph[0]=self.diccionario['Phi']
        Chi[0]=self.diccionario['Chi']
        vTheta[0]=0
        vPhi[0]=0
        vChi[0]=0
        
        #######################################################################################################

        #Parametros
        g= 9.81 #gravedad
        M=1100 #kg
        Sw= 20 #m2
        Rho= 1.225 #densidad kg/m3
        Cd= 0.035
        Clalpha= 0.5
        E= self.diccionario['E']*(8000/9)
    
        
        #print(self.diccionario['E'])
        cX=np.cos(Th[0])
        sX=np.sin(Th[0])
        cY=np.cos(Ph[0])
        sY=np.sin(Ph[0])
        cZ=np.cos(Chi[0])
        sZ=np.sin(Chi[0])

        CB=np.array([[cX*cZ, sY*sX*cZ - cY*sZ , cY*sX*cZ + sY*sZ],[cX*sZ, sY*sX*sZ + cY*cZ , cY*sX*sZ - sY*cZ ],[ -sX, sY*cX , cY*cX ]],float)


        #iniciamos bucle temporal de un segundo
        for i in range (1,11):
            c=np.cos(Th[0])
            #print(c)
            Nu = np.arctan(vy[i-1]/np.sqrt((vx[i-1]**2)+(vz[i-1]**2)))
            Theta= Th[0]
            Phi= Ph[0]
            alpha= Theta-Nu
            #moviento en x
            D=0.5*Sw*Rho*Cd*(V0[i-1]**2)
            L=0.5*Sw*Rho*Clalpha*(V0[i-1]**2)
            Fuerzascuerpo=np.array([E-np.cos(alpha)*D + np.sin(alpha)*L, 0, np.cos(alpha)*L + np.sin(alpha)*D])
            Fuerzas=np.dot(Fuerzascuerpo,CB)
            ###### Fuerza x
            Fx=Fuerzas[0]
            #Fx= np.cos(Theta)*(E+(L*np.cos(Phi)*np.sin(alpha)-(D*np.cos(alpha)))) - np.sin(Theta)*(L*np.cos(Phi)*np.cos(alpha)+D*np.cos(alpha))
            ###### Fuerza en y
            Fy=Fuerzas[2]
            #Fy= np.sin(Theta)*(E+(L*np.cos(Phi)*np.sin(alpha)-(D*np.cos(alpha)))) + np.cos(Theta)*(L*np.cos(Phi)*np.cos(alpha)+D*np.cos(alpha))
            ###### Fuerza en z
            Fz=Fuerzas[1]
            #Fz= L*np.sin(Phi)
            ###### posicion en x

            #print(Fy)
            ax= Fx/M
            vx[i]=vx[i-1]+ax*DT
            x[i]= x[i-1]+ (vx[i-1]*DT) + (0.5*ax*(DT**2))

            ##### posicion en y 
            ay= (Fy/M)-g
            if y[i-1]==0 and ay<=0:
                ay=0
            else :
                ay=ay

            vy[i]=vy[i-1]+ay*DT
            y[i]= y[i-1]+ (vy[i-i]*DT) + (0.5*ay*(DT**2))

            ###### Posicion en z
            az=Fz/M
            vz[i]=vz[i-1]+az*DT
            z[i]= z[i-1]+ (vz[i-i]*DT) + (0.5*az*(DT**2))


            #alpha= Theta[i-1]-Nu
            V0[i]=np.sqrt((vx[i-1]**2)+(vz[i]**2))
            data[i]=[]
            data[i].append({
            #posicion  
                'x': x[i],
                'y': y[i],
                'z': z[i],
                'vx': vx[i],

                'vy': vy[i],
                'Theta': Th[0],
                'Phi': Ph[0],
                'Chi': Chi[0],
                'vz': vz[i],
            #angulos
                # 'Theta': x[i],
                # 'Phi': x[i],
                # 'Chi': x[i],
                # 'vTheta': x[i],
                # 'vPhi': x[i],
                # 'vChi': x[i]


            })


        


            
            self.data = data

        self.data = data
        #print(Fz)
        # with open('data.json', 'w') as file:
        #     json.dump(data, file, indent=1)   
