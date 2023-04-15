import * as THREE from 'three';
import { Plane } from 'three';
import {OrbitControls, orbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const rendrer=new THREE.WebGLRenderer();
rendrer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(rendrer.domElement);


const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
camera.position.set(-10,30,30);
const orbit=new OrbitControls(camera,rendrer.domElement)
orbit.update()


const axesHelper= new THREE.AxesHelper(5);
scene.add(axesHelper);

const boxGeometry=new THREE.BoxGeometry();
const boxMaterial=new THREE.MeshBasicMaterial({color:0x0000FF});
const box=new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);

const planeGeometry=new THREE.PlaneGeometry(30,30);
const planeMaterial=new THREE.MeshBasicMaterial({color:0xFFFFFF,side:THREE.DoubleSide})
const plane=new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);

const sphereGeometry=new THREE.SphereGeometry(4,50,50);
const sphereMaterial=new THREE.MeshBasicMaterial({color:0x0000FF,wireframe:false})
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere)

sphere.position.set(10,10,10)
const gridHelper=new THREE.GridHelper(30);
gridHelper.rotation.x=Math.PI*0.5
scene.add(gridHelper)

function animate(){
    box.rotation.x+=0.01;
    box.rotation.y+=0.01;
    rendrer.render(scene,camera)
}
rendrer.setAnimationLoop(animate)

