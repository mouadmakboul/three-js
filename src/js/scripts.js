import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight ,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 2, 5);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00F900});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xd1fae5,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x1d4ed8,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);

const gui = new dat.GUI();
const option = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01
};
gui.addColor(option, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(option, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
});

gui.add(option, 'speed', 0, 0.1)

let step = 0;


function animite(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += option.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    renderer.render(scene, camera);

}

renderer.setAnimationLoop(animite);
 

