import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth +50, window.innerHeight + 100);
document.body.appendChild( renderer.domElement );

//Load model in GLB format
const loader = new GLTFLoader();
let model;
loader.load('building.glb', function(gltf) {
  model = gltf.scene;
  model.scale.set(5,5,5);
  model.position.x = 5;
  scene.add(model);
  // Animate model rotation function
});

const cubeGeometry = new THREE.BoxGeometry(5,5,5);
const cubeTexture = new THREE.TextureLoader().load('myPic.jpg');
const cubeMaterial = new THREE.MeshBasicMaterial({map: cubeTexture});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -5;
scene.add(cube);

let cubeRotationX = 0.002;
let cubeRotationY = 0.002;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const directionLight = new THREE.DirectionalLight(0xffffff,2);
directionLight.position.set(0,1,0);
scene.add(directionLight);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += cubeRotationX;
  cube.rotation.y += cubeRotationY;
  renderer.render(scene, camera);
}
animate();

function animateModelRotaton() {
  requestAnimationFrame(animateModelRotaton);
  if (model) {
    model.rotation.x += 0.001;
    model.rotation.y += 0.001;
  }
}
animateModelRotaton();