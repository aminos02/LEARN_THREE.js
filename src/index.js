import * as THREE from 'three';
import { DirectionalLight, Plane } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';


const rendrer=new THREE.WebGLRenderer();
rendrer.shadowMap.enabled=true;
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
const planeMaterial=new THREE.MeshStandardMaterial({color:0xFFFFFF,side:THREE.DoubleSide})
const plane=new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow=true;
plane.rotateX(Math.PI/2)
scene.add(plane);

const sphereGeometry=new THREE.SphereGeometry(4,50,50);
const sphereMaterial=new THREE.MeshStandardMaterial({color:0x0000FF,wireframe:false})
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.castShadow=true;
sphere.position.set(-10,10,0)
scene.add(sphere)

const gridHelper=new THREE.GridHelper(30);

const ambientLight=new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight=new THREE.DirectionalLight(0xFFFFFF,0.8)
scene.add(directionalLight);
directionalLight.position.set(-30,50,0)
directionalLight.castShadow=true;
const dlightHelper=new THREE.DirectionalLightHelper(directionalLight,5);
scene.add(dlightHelper)

const dlightShadowHelper=new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dlightShadowHelper)

gridHelper.rotation.x=-Math.PI
scene.add(gridHelper)

const gui = new dat.GUI();
const options = {
    sphereColor:'#ffea00',
    wireframe:false,
    speed:0.01
}

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
})

gui.add(options,'wireframe').onChange(e=>{
    sphere.material.wireframe=e;
})


let step=0;

gui.add(options,'speed',0,0.1)

function animate(){
    box.rotation.x+=0.01;
    box.rotation.y+=0.01;

    step+=options.speed;
    sphere.position.y=10*Math.abs(Math.sin(step))

    rendrer.render(scene,camera)
}
rendrer.setAnimationLoop(animate)

