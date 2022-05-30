console.log("El documento Javascript se ha cargado correctamente")

let connectionString = 'ws://' + window.location.host + '/ws/logica/' ;
const Socket = new WebSocket(connectionString);
console.log(connectionString)

//##########################################################################################################
//##########################################################################################################
Socket.onopen =function(e){
    console.log('open',e)
    // Socket.send(1)
    }
    
    
Socket.onmessage =function(e){
let data = JSON.parse(e.data)
// console.log(data)
// console.log('Data:', data)
// Socket.send(1)
}

    
    
const handleSend = (a) => {
    if (Socket.readyState === WebSocket.OPEN) {
        Socket.send(a)
    } else if (Socket.readyState == WebSocket.CONNECTING) {
        // Wait for the open event, maybe do something with promises
        // depending on your use case. I believe in you developer!
        Socket.addEventListener('open', () => handleSend(a))
    } else {
        // etc.
    }
};

//######################################################################################################################
//######################################################################################################################

let keysPressed = {'x0': 0, 'y0': 0, 'z0': 0,'Vx':0,'Vy':0,'Vz':0,'E':0,'Theta':0,'Phi':0}
document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    if (event.key == 1) {
        keysPressed['E'] = 1

    }
    else if (event.key == 2){
        keysPressed['E'] = 2

    
    }
    else if (event.key == 3){
        keysPressed['E'] = 3

    
    }else if (event.key == 4){
        keysPressed['E'] = 4

    
    }else if (event.key == 5){
        keysPressed['E'] = 5

    
    }else if (event.key == 6){
        keysPressed['E'] = 6

    
    }else if (event.key == 7){
        keysPressed['E'] = 7

    
    }else if (event.key == 8){
        keysPressed['E'] = 8

    
    }
    else if (event.key == 9){
        keysPressed['E'] = 9

    
    }
});
 
document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
    // delete keysPressed[event.key];
    // console.log(keysPressed)
});

//######################################################################################################################
//######################################################################################################################
// let Posiciones_2 = {}
function start() {
    // let startTime = [];
    // startTime[0] = Date.now();
    // console.time('t1')
    Socket.send(JSON.stringify(keysPressed));

    Socket.addEventListener('message', (event) => {
    
            const POSICIONES = JSON.parse(event.data);
        //    console.timeEnd('t1')
        //    console.log('t1')
            // let endTime = [];
            // endTime[0] = Date.now();
            // let timediff = [];
            // timediff[0] = endTime[0] - startTime[0]
            // console.log(startTime[0])
            keysPressed['x0']=  POSICIONES['3'][0]['x']
            keysPressed['y0']=  POSICIONES['3'][0]['y']
            keysPressed['Vx']= POSICIONES['3'][0]['vx']
            keysPressed['Vy']= POSICIONES['3'][0]['vy']
            keysPressed['Vz']= POSICIONES['3'][0]['vz']
            // console.log(keysPressed['x0'])
            // console.log(POSICIONES)
         });
         

}

document.addEventListener('click', () => {
    setInterval(start,1000/30);
  },);




//######################################################################################################################
//######################################################################################################################

// import * as THREE from '../../../../three_repository/build/three.module.js'

// import { OrbitControls } from '../../../../three_repository/examples/jsm/controls/OrbitControls.js'

import * as THREE from './three.module.js'
import { OrbitControls } from './OrbitControls.js'
import {TreesGeometry, SkyGeometry} from './RollerCoaster.js'
import { GLTFLoader } from './GLTFLoader.js';


// // let mouse = new THREE.Vector2();


// Crear la escena
var scene = new THREE.Scene();
scene.background = new THREE.Color(`rgb(${0},${255},${255})`);
//Añadir camara
var camera = new THREE.PerspectiveCamera(
    75,window.innerWidth/window.innerHeight
);


//Añadir geometria
let geometry
let material
// var geometry = new THREE.BoxGeometry(2,2,2,2,2,2);
// var material = new THREE.MeshBasicMaterial({color:`rgb(${0},${125},${200})`, wireframe: true });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// cube.position.x = 0;
// cube.position.z = 0;
// cube.position.y = 3;
camera.position.z = 15;
camera.position.y = 5;
camera.position.x = -2;
// camera.lookAt (new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
// camera.rotation.x = -0.5;

// // CIRCULO 

// var circle = new THREE.Mesh(new THREE.CircleGeometry(2,32),material);
// scene.add(circle);
// circle.position.x = 8; 
// circle.position.y = 5;
//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
let avion
let loader = new GLTFLoader();
loader.setPath('../static/JS/german_ww2_aircraft_messerschmitt_109/')
loader.load('scene.gltf',function(gltf){
    gltf.scene.scale.multiplyScalar(1 / 60); // adjust scalar factor to match your scene scale
    gltf.scene.rotation.y = 3.14;
    gltf.scene.position.y = 1;
    avion = gltf.scene;
    scene.add(avion)
});
// camera.lookAt (new THREE.Vector3(avion.position.x,avion.position.y,avion.position.z));
// //////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//Light

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 200, 0 );
scene.add( hemiLight );

const directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 200, 100 );
directionalLight.castShadow = true;
directionalLight.shadow.camera.top = 180;
directionalLight.shadow.camera.bottom = - 100;
directionalLight.shadow.camera.left = - 120;
directionalLight.shadow.camera.right = 120;
scene.add( directionalLight );


// ground

// const ground = new THREE.Mesh( new THREE.PlaneGeometry( 20000, 20000 ), new THREE.MeshPhongMaterial( { color: 0x445544, depthWrite: false } ) );
// ground.rotation.x = - Math.PI / 2;
// ground.receiveShadow = true;
// scene.add( ground );

// const grid = new THREE.GridHelper( 20000, 2000, 0x998652, 0x998652 );
// grid.material.opacity = 0.5;
// grid.material.transparent = true;
// scene.add( grid );
////////////////////////////////////////////////////////////////////////////
// const GroundGeo = new THREE.PlaneGeometry(10000,10000,300,200);
// let disMap = new THREE.TextureLoader()
//     .setPath('../static/IMAGES/')
//     .load('Terrain-Heightmap.png')
     
//     disMap.wrapS = disMap.wrapT = THREE.RepeatWrapping;
//     disMap.repeat.set(1,1)

// const groundMat = new THREE.MeshStandardMaterial({
//     color:0x445544,
//     wireframe: true,
//     displacementMap: disMap,
//     displacementScale: 330,
// })

// const groundMesh = new THREE.Mesh(GroundGeo,groundMat);
// scene.add(groundMesh);
// groundMesh.rotation.x = Math.PI/2;
// groundMesh.position.y = -1;
// groundMesh.receiveShadow = true;
// groundMesh.color = 0xff0000;
///////////////////////////////////////////////////////////////////////////

// environment

geometry = new THREE.PlaneGeometry( 500, 500, 10, 10 );
geometry.rotateX( - Math.PI / 2 );

const positions = geometry.attributes.position.array;
const vertex = new THREE.Vector3();

for ( let i = 0; i < positions.length; i += 6 ) {

    vertex.fromArray( positions, i );

    vertex.x += Math.random() * 10 - 5;
    vertex.z += Math.random() * 10 - 5;

    const distance = ( vertex.distanceTo( scene.position ) / 5 ) - 25;
    vertex.y = Math.random() * Math.max( 0, distance );

    vertex.toArray( positions, i );

}

geometry.computeVertexNormals();

material = new THREE.MeshLambertMaterial( {
    color: 0x407000
} );

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
mesh.position.y = -0.5;

geometry = new TreesGeometry( mesh );
material = new THREE.MeshBasicMaterial( {
    side: THREE.DoubleSide, vertexColors: true
} );
const mesh2 = new THREE.Mesh( geometry, material );
scene.add( mesh2 );
mesh2.position.y = -0.5;

geometry = new SkyGeometry();
material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const mesh3 = new THREE.Mesh( geometry, material );
scene.add( mesh3 );
mesh3.position.y = -0.5;
//


//Agregar el renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);



// 
var controls = new OrbitControls(camera,renderer.domElement);

// controls.minDistance = 5; // acercar zoom
// controls.maxDistance = 20; // alejar zoom 

// controls.enableZoom = false; // quitar el zoom, por defecto esta en true

// controls.enableRotate = false; // quitar la rotacion con el mouse, por defecto esta en true

controls.enableDamping = true; // inercia en la rotacion, por defecto esta en false
controls.dampingFactor = 0.3; // valor del factor de inercia

controls.maxPolarAngle = Math.PI; // maximo angulo para girar la camara

controls.screenSpacePanning = true; // poder mover la panoramica de la imagen en cualquier eje cartesiano

// ANIMACION

var animate = function(){


    // updateCamera();
    requestAnimationFrame(animate);
    avion.position.z =-keysPressed['x0']
    avion.position.y = keysPressed['y0']
    avion.position.z = keysPressed['z0']
    camera.position.x= avion.position.x -15
    camera.position.y= avion.position.y +2
    camera.position.z= avion.position.z

    // camera.position.z = cube.position.z + 15;
    // camera.position.y = cube.position.y + 2;
    // camera.position.x = cube.position.x;
    if (keysPressed['ArrowDown'] == true) {
        // console.log('Esto funciona bien!');
        avion.rotation.x += 0.05
    }

    if (keysPressed['ArrowRight'] == true) {
        // console.log('Esto funciona bien!');
        avion.rotation.z -= 0.05
    }
    if (keysPressed['ArrowLeft'] == true) {
        // console.log('Esto funciona bien!');
        avion.rotation.z += 0.05
    }

    if (keysPressed['ArrowUp'] == true) {
        // console.log('Esto funciona bien!');
        avion.rotation.x -= 0.05
    }

    keysPressed['Theta']=avion.rotation.x


    // camera.position.x += 0.005;

    // scene.traverse(function(object){
    //     if(object === ground){

    //     } else if(object.isMesh === true) {
    //         object.rotation.x += 0.01;
    //         object.rotation.y += 0.01;
    //     }
        
    // });
    
    // camera.lookAt (new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
    // cube.rotation.x += 0.02;
    // cube.rotation.y -= 0.01;

    renderer.render(scene,camera);  //ESTO SIEMPRE DEBE IR AL FINAL PARA QUE FUNCIONE!!

}

function init(){
    //set up mouse stuff
    // document.addEventListener('mousemove',onDocumentMouseMove,false);
    window.addEventListener('resize',onWindowResize,false);
    // document.addEventListener('mouseclick',onDocumentMouseClick,false);

}

// function updateCamera() {
//     //offset the camera x/y based on the mouse's position in the window
//     camera.position.x = camera.position.x + (mouse.x);
//     camera.position.y = camera.position.y + (mouse.y);
//     // camera.position.z = cameraCenter.z + (cameraVertLimit * mouse.z);
//     camera.lookAt (new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
// }

// function onDocumentMouseMove(event) {
//     event.preventDefault();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }

// function onDocumentMouseClick(event) {
//     event.preventDefault();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }


function onWindowResize() {  // Esta funcion redimensiona la camara cuanfdo se modifica el tamaño de la ventana
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

setTimeout(animate,500);
init();
// ####################################################################################################
// ####################################################################################################
// async function Alert(){
//     // document.getElementById("alerta").value = 1
//    let a = {"numero1":2,"numero2":3};
//     // const response = await fetch(`http://127.0.0.1:8000/prueba/${a}`);
//     // const data = await response.json();
//     // document.getElementById("alerta").value = data.respuesta

//     Socket.send(JSON.stringify(a))
//     Socket.addEventListener('message', (event) => {
//         console.log('Recibido nuevo mensaje');
//         const NUEVA_DATA_JSON= JSON.parse(event.data);
//         let NUEVA_DATA = NUEVA_DATA_JSON["respuesta"];
//         document.getElementById("alerta").value = NUEVA_DATA
//     });
    
// };
// const button1 = document.getElementById("button1");
// button1.addEventListener('click', Alert)
// Alert();
// #########################################################################################################
// #########################################################################################################



// Socket.send(JSON.stringify({"numero1":2,"numero2":3}))
// handleSend(JSON.stringify({"numero1":2,"numero2":3}))


// Socket.addEventListener('open', () => {
//     console.log('Conectado');
// });
// // Desconectado
// Socket.addEventListener('close', () => {
//      console.log('Desconectado');
//  });

// // Recibir mensaje
// Socket.addEventListener('message', (event) => {
    
//     const MI_NUEVA_DATA = JSON.parse(event.data);
//     console.log('Recibido nuevo mensaje',MI_NUEVA_DATA);
//  });

//#############################################################################################
//####################################################################################################



// function movimiento(){
//     requestAnimationFrame(movimiento)
//     if (keysPressed['ArrowDown'] == true) {
//         // console.log('Esto funciona bien!');
//         cube.rotation.x += 0.05
//     }

//     if (keysPressed['ArrowRight'] == true) {
//         // console.log('Esto funciona bien!');
//         cube.rotation.z -= 0.05
//     }
//     if (keysPressed['ArrowLeft'] == true) {
//         // console.log('Esto funciona bien!');
//         cube.rotation.z += 0.05
//     }

//     if (keysPressed['ArrowUp'] == true) {
//         // console.log('Esto funciona bien!');
//         cube.rotation.x -= 0.05
//     }
// //    console.log(keysPressed)
// }
// // document.addEventListener('keydown',movimiento)
// movimiento();
//####################################################################################################
//####################################################################################################
// document.addEventListener('keydown', (event) => {
//     var name = event.key;
//     var code = event.code;
//     // Alert the key name and key code on keydown
//     // console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
//     if (name === 'ArrowDown'){
//         cube.rotation.x += 0.1
//     }
// }, false);
//####################################################################################################
//####################################################################################################

// PRUEBA CON PYTHON 
// document.addEventListener('keydown', () => {
    
//   Socket.send(JSON.stringify(keysPressed))
    
 
// });

// setInterval(Socket.send(JSON.stringify(keysPressed)),100)

// function start() {
//     let startTime = Date.now();
//     Socket.send(JSON.stringify(keysPressed));

//     Socket.addEventListener('message', (event) => {
    
//             const MI_NUEVA_DATA = JSON.parse(event.data);
//             let endTime = Date.now();
//             let timediff = endTime - startTime
//             console.log(timediff)
            
//          });

// }

// document.addEventListener('click', () => {
//     setInterval(start(),3000);
//   },);
//###################################################################################################
//###################################################################################################

// function rota(){
//     console.log("Hola mundo");
//     cube.rotation.x = parseInt(document.getElementById('alerta').value);
// }

// const boton = document.getElementById('button1');
// boton.addEventListener('click',rota)
//###################################################################################################


