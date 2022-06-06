# Proyecto pgaa2122



Pasos para hacer funcionar el simulador: 
1- Es ncesario tener instalado django y el modulo channels, para ello introducimos en el cmd lo siguiente: 
python -m pip install django 
python -m pip install -U channels

2- Cambiar la dirección de la carpeta templates en tu ordenador, esto se hace mediante el archivo settings.py dentro de la segunda carpeta djangoServer, en la linea 62 cambiamos la dirección 'D:/Java_Python/proyectoPython/Proyecto_python/djangoServer/templates' por la correspondiente en nuestro ordenador.

3- Por si acaso debemos realizar un comando para iniciar la base de datos en caso de que no estuviese inicializada:
Nos situamos en la primera carpeta djangoServer e introducimos el siguiente comando, en mi caso sería así -->
(pgaa2122) D:\Java_Python\proyectoPython\Proyecto_python\djangoServer> python manage.py migrate 

4- Finalmente ya solo queda iniciar el servidor y buscar la dirección:
Para iniciar el servidor--> (pgaa2122) D:\Java_Python\proyectoPython\Proyecto_python\djangoServer> python manage.py runserver
Buscamos la siguiente dirección: 127.0.0.1:8000/entorno/


