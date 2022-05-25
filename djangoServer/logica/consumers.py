import json
import numpy as np
from channels.generic.websocket import AsyncJsonWebsocketConsumer

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
        
        print(r['x'])

        
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
        Theta=np.zeros(101)
        Phi=np.zeros(101)
        Chi=np.zeros(101)
        vTheta=np.zeros(101)
        vPhi=np.zeros(101)
        vChi=np.zeros(101)
        V0=np.zeros(101)
        ########################################
        #Valores iniciales de las variables recogidos en JS
        x[0]= self.diccionario['x0']
        y[0]= self.diccionario['y0']
        z[0]=0
        vx[0]=0
        vy[0]=0
        vz[0]=0
        V0[0]=np.sqrt((vx[0]**2)+(vy[0]**2)+(vz[0]**2))
        #Variables angulares en  radianes
        Theta[0]=0
        Phi[0]=0
        Chi[0]=0
        vTheta[0]=0
        vPhi[0]=0
        vChi[0]=0
        #######################################################################################################

        #Parametros
        M=1100 #kg
        Sw= 20 #m2
        Rho= 1.225 #densidad kg/m3
        Cd= 0.0035
        E= self.diccionario['E']*(7000/9)
        Nu = np.arctan(vz[0]/np.sqrt((vx[0]**2)+(vy[0]**2)))
        alpha=0
        print(self.diccionario['E'])


        #iniciamos bucle temporal de un segundo
        for i in range (1,101):
            #moviento en x
            D=0.5*Sw*Rho*Cd*(V0[i-1]**2)
            ax= (E/M)-(D/M)
            vx[i]=vx[i-1]+ax*DT
            x[i]= x[i-1]+ (vx[i]*DT) + (0.5*ax*(DT**2))
            #alpha= Theta[i-1]-Nu
            V0[i]=np.sqrt((vx[i]**2)+(vy[i]**2)+(vz[i]**2))
            data[i]=[]
            data[i].append({
            #posicion  
                'x': x[i],
                # 'y': y[i],
                # 'z': x[i],
                'vx': vx[i],
                # 'vy': x[i],
                # 'vz': x[i],
            #angulos
                # 'Theta': x[i],
                # 'Phi': x[i],
                # 'Chi': x[i],
                # 'vTheta': x[i],
                # 'vPhi': x[i],
                # 'vChi': x[i]


            })


            


            Nu = np.arctan(vz[0]/np.sqrt((vx[0]**2)+(vy[0]**2)))
            self.data = data

        self.data = data

        with open('data.json', 'w') as file:
            json.dump(data, file, indent=1)         
        


