import json
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
        response = json.loads(text_data)
        datos = operaciones(response)
        print(datos.diccionario)
        # datos.girar()
        # data = {'flecha_abajo':datos.ArrowDown}
        # print(data)
        # print("recibido", response)
        # respuesta = response["numero1"]+response["numero2"]
        # print("respuesta",respuesta)
        # await self.send(text_data=json.dumps(
        #     {"respuesta":respuesta}
        # ))

class operaciones:
    def __init__(self,diccionario):
        self.diccionario = diccionario
        self.ArrowDown = 1
    def girar(self):
        if self.diccionario["ArrowDown"] == True:
            self.ArrowDown = 0.05
            
        else:
            self.ArrowDown = 0
            
        


