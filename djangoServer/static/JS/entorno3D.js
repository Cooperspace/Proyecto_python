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

//######################################################################################################################
//######################################################################################################################

let keysPressed = {'x0': 0, 'y0': 0, 'z0': 0,'Vx':0,'Vy':0,'Vz':0,'E':0,'Theta':0,'Phi':0,'Chi': 0}
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

});

//######################################################################################################################
//######################################################################################################################
function start() {
    Socket.send(JSON.stringify(keysPressed));

    Socket.addEventListener('message', (event) => {
    
            const POSICIONES = JSON.parse(event.data);

            keysPressed['x0']=  POSICIONES['3'][0]['x']
            keysPressed['y0']=  POSICIONES['3'][0]['y']
            keysPressed['z0']=  POSICIONES['3'][0]['z']
            
            keysPressed['Vx']= POSICIONES['3'][0]['vx']
            keysPressed['Vy']= POSICIONES['3'][0]['vy']
            keysPressed['Vz']= POSICIONES['3'][0]['vz']

         });
         

}

document.addEventListener('click', () => {
    setInterval(start,1000/30);
  },);




//######################################################################################################################
//######################################################################################################################



import * as THREE from './three.module.js'
import { OrbitControls } from './OrbitControls.js'
import {TreesGeometry, SkyGeometry} from './RollerCoaster.js'
import { GLTFLoader } from './GLTFLoader.js';


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
// EL CUBO!!

// var geometry = new THREE.BoxGeometry(2,2,2,2,2,2);
// var material = new THREE.MeshBasicMaterial({color:`rgb(${0},${125},${200})`, wireframe: true });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// cube.position.x = 0;
// cube.position.z = 0;
// cube.position.y = 3;
//camera.position.z = 15;
//camera.position.y = 5;
//camera.position.x = -2;
// camera.lookAt (new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
// camera.rotation.x = -0.5;
//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
let avion
let loader = new GLTFLoader();
loader.setPath('../static/JS/german_ww2_aircraft_messerschmitt_109/')
loader.load('scene.gltf',function(gltf){
    gltf.scene.scale.multiplyScalar(1 / 60); // adjust scalar factor to match your scene scale
    gltf.scene.rotation.y = 1.57
    ;
    gltf.scene.position.y = 1;
    avion = gltf.scene;
    scene.add(avion)
});

var plasmaballs= [];
window.addEventListener('space', Shoot)

function Shoot(){
    let plasmaball = new THREE.Mesh(new THREE.SphereGeometry(100, 3, 2), new THREE.MeshBasicMaterial({
        color: 'red'
    }))
    plasmaball.position= avion.position
    plasmaball.quaternion.copy(avion.quaternion);
    scene.add(plasmaball)
    plasmaballs.push(plasmaball)
};


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
//////////////////////////////////////////////////////////////////////////
const GroundGeo = new THREE.PlaneGeometry(10000,10000,300,200);
let disMap = new THREE.TextureLoader()
    .setPath('../static/IMAGES/')
    .load('Terrain-Heightmap.png')
     
    disMap.wrapS = disMap.wrapT = THREE.RepeatWrapping;
    disMap.repeat.set(1,1)

const groundMat = new THREE.MeshStandardMaterial({
    color:0x445544,
    wireframe: true,
    displacementMap: disMap,
    displacementScale: 330,
})

const groundMesh = new THREE.Mesh(GroundGeo,groundMat);
scene.add(groundMesh);
groundMesh.rotation.x = Math.PI/2;
groundMesh.position.y = -1;
groundMesh.receiveShadow = true;
groundMesh.color = 0xff0000;
/////////////////////////////////////////////////////////////////////////

//environment

geometry = new THREE.PlaneGeometry( 20000, 20000, 10, 10 );
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

var plasmaBalls = [];
window.addEventListener("mousedown", onMouseDown);

function onMouseDown() {
let plasmaBall = new THREE.Mesh(new THREE.SphereGeometry(0.1, 3, 2), new THREE.MeshBasicMaterial({
    color: "red"
}));
plasmaBall.position.copy(avion.position); // start position - the tip of the weapon
plasmaBall.quaternion.copy(avion.quaternion); // apply camera's quaternion
scene.add(plasmaBall);
plasmaBalls.push(plasmaBall);
}

var speed = 50;
var clock = new THREE.Clock();
var delta = 0;


(function render() {
    requestAnimationFrame(render);
    delta = clock.getDelta();
    plasmaBalls.forEach(b => {
      b.translateZ(speed * delta); // move along the local z-axis
    });
    renderer.render(scene, camera);
})()
// ANIMACION

var animate = function(){


    // updateCamera();
    requestAnimationFrame(animate);
    avion.position.x = keysPressed['x0']
    avion.position.y = keysPressed['y0']
    avion.position.z = keysPressed['z0']

    if (keysPressed['ArrowDown'] == true) {
        avion.rotateX(-0.005)
        keysPressed['Theta']-=0.005    
    }

    if (keysPressed['ArrowRight'] == true) {
        avion.rotateZ(0.005)
        avion.rotateY(-0.005)
        keysPressed['Phi']+=0.005
        keysPressed['Chi']-=0.005
        
    }
    if (keysPressed['ArrowLeft'] == true) {
        avion.rotateZ(-0.005)
        avion.rotateY(0.005)
        keysPressed['Phi']-=0.005
        keysPressed['Chi']+=0.005
    }

    if (keysPressed['ArrowUp'] == true) {
        avion.rotateX(0.005)
        keysPressed['Theta']+=0.005
    }

    camera.position.x= avion.position.x - 10*( Math.cos(keysPressed['Chi'])*Math.cos(keysPressed['Theta']) + Math.sin(keysPressed['Chi'])*Math.sin(keysPressed['Phi'])*Math.sin(keysPressed['Theta']))
    camera.position.z= avion.position.z - 10*( Math.cos(keysPressed['Chi'])*Math.sin(keysPressed['Phi'])*Math.sin(keysPressed['Theta']) -Math.sin(keysPressed['Chi'])*Math.cos(keysPressed['Theta']) )
    camera.position.y= avion.position.y + 10*( Math.cos(keysPressed['Phi'])*Math.sin(keysPressed['Theta'])) + 3


   
    
    camera.lookAt (new THREE.Vector3(avion.position.x,avion.position.y,avion.position.z));

    renderer.render(scene,camera);  //ESTO SIEMPRE DEBE IR AL FINAL PARA QUE FUNCIONE!!

}

function init(){
    window.addEventListener('resize',onWindowResize,false);

}

// function updateCamera() {
//     //offset the camera x/y based on the mouse's position in the window
//     camera.position.x = camera.position.x + (mouse.x);
//     camera.position.y = camera.position.y + (mouse.y);
//     // camera.position.z = cameraCenter.z + (cameraVertLimit * mouse.z);
//     camera.lookAt (new THREE.Vector3(cube.position.x,cube.position.y,cube.position.z));
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