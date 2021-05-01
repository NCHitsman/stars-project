import * as THREE from '../three.js/build/three.module.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
const scene = new THREE.Scene();
// scene.background = new THREE.Color('grey');

//------------------------------------------------------------------------------

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100000);
camera.position.z = 1;
new OrbitControls(camera, canvas)

const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);

//------------------------------------------------------------------------------
let starCount = 0;

function createStar() {

    if (starCount > 2500) {
        return;
    }

    let color;
    let size;
    let maxSize;

    let ran = Math.random()
    if (ran > 0.99) {
        color = 0xFFF8C2;
        size = 10;
        maxSize = 750;
    } else {
        let ran = Math.round(Math.random() * 4);
        let colors = [0x91171F, 0xA3C3D9, 0x5C6D70, 0xDDCECD, 0x311847]
        color = colors[ran]
        size = (Math.random() * 2) + 100
        maxSize = 1000;
    }

    let starGeo = new THREE.SphereGeometry(size, 32, 32);
    let starMat = new THREE.MeshBasicMaterial({ color });
    let star = new THREE.Mesh(starGeo, starMat);


    const spriteMat = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader('stars/glow.png'),
		color: 0x0000ff,
    })
    const sprite = new THREE.Sprite(spriteMat);
    console.log(sprite)


    let randX = Math.random() * maxSize;
    let randXtwo = Math.random();
    if (randXtwo > .5) {
        star.position.x = randX;
        sprite.position.x = 0;
    } else {
        star.position.x = -(randX);
        sprite.position.x = 0;
    }

    let randY = Math.random() * maxSize;
    let randYtwo = Math.random();
    if (randYtwo > .5) {
        star.position.y = randY;
        sprite.position.y = 0;
    } else {
        star.position.y = -(randY);
        sprite.position.y = 0;
    }

    let randZ = Math.random() * maxSize;
    let randZtwo = Math.random();
    if (randZtwo > .5) {
        star.position.z = randZ;
        sprite.position.z = 0;
    } else {
        star.position.z = -(randZ);
        sprite.position.z = 0;
    }



    starCount++;
    console.log('ran')
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
// setInterval(() => { createStar() }, 1)
createStar()
