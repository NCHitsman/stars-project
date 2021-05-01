import * as THREE from '../three.js/build/three.module.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
const scene = new THREE.Scene();
// scene.background = new THREE.Color('grey');

//------------------------------------------------------------------------------

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 10000);
camera.position.z = 150;
new OrbitControls(camera, canvas)

// const axesHelper = new THREE.AxesHelper(150);
// scene.add(axesHelper);

//------------------------------------------------------------------------------
let starCount = 0;

function createStar() {

    if (starCount > 2000) {
        return;
    }

    let color;
    let size;

    let ran = Math.random()
    if (ran > 0.98) {
        color = 0xFFF8C2;
        size = 10;
    } else {
        let ran = Math.round(Math.random() * 4);
        let colors = [0x91171F, 0xA3C3D9, 0x5C6D70, 0xDDCECD, 0x311847]
        color = colors[ran]
        size = (Math.random() * 2) + 1
    }

    let starGeo = new THREE.SphereGeometry(size, 32, 32);
    let starMat = new THREE.MeshBasicMaterial({ color });
    let star = new THREE.Mesh(starGeo, starMat);

    let randX = Math.random() * 1000;
    let randXtwo = Math.random();
    if (randXtwo > .5) {
        star.position.x = randX;
    } else {
        star.position.x = -(randX);
    }

    let randY = Math.random() * 1000;
    let randYtwo = Math.random();
    if (randYtwo > .5) {
        star.position.y = randY;
    } else {
        star.position.y = -(randY);
    }

    let randZ = Math.random() * 1000;
    let randZtwo = Math.random();
    if (randZtwo > .5) {
        star.position.z = randZ;
    } else {
        star.position.z = -(randZ);
    }

    starCount++;

    scene.add(star)
}

const cubeGeo = new THREE.BoxGeometry(2000, 2000, 2000);
const cubeMat = new THREE.MeshBasicMaterial({ wireframe: true })
const cube = new THREE.Mesh(cubeGeo, cubeMat);
scene.add(cube)


//------------------------------------------------------------------------------

function render(time) {
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}
requestAnimationFrame(render)
setInterval(() => { createStar() }, 1)
