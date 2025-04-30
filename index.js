import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
// import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat';
import { TextGeometry,FontLoader  } from 'jsm/Addons.js';
import { getEarth, getJupiter, getMars, getMercury, getSaturn, getVenus } from "./getPlanets.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
const domeSize = 2000;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.maxDistance = domeSize - 100;


const earthAxialTilt = -23.439 * Math.PI / 180;

const loader = new THREE.TextureLoader;

const domeGeometry = new THREE.IcosahedronGeometry(domeSize, 30);
const domeMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("/textures/starmap_c8k.jpg"),
  side: THREE.DoubleSide,
  color: 0x888888
});

const constellTexture = loader.load("/textures/constellation_figures_8k.png") //cel
constellTexture.flipY = false;
const constellationsMaterial = new THREE.MeshBasicMaterial({
  map: constellTexture,
  alphaMap: constellTexture,
  side: THREE.DoubleSide,
  transparent: true
});

const [earth, earthPos] = getEarth();
const mercury = getMercury();
const venus = getVenus();
const mars = getMars();
const jupiter = getJupiter();
const saturn = getSaturn();

// const xGeometry = new THREE.BufferGeometry().setFromPoints( [new THREE.Vector3( -0, earthPos.y, earthPos.z ) ,new THREE.Vector3( 500, earthPos.y, earthPos.z) ] );
// const yGeometry = new THREE.BufferGeometry().setFromPoints( [new THREE.Vector3( earthPos.x, -0, earthPos.z ) ,new THREE.Vector3( earthPos.x, 500, earthPos.z) ] );
// const zGeometry = new THREE.BufferGeometry().setFromPoints( [new THREE.Vector3(earthPos.x, earthPos.y, -0 ) ,new THREE.Vector3( earthPos.x, earthPos.y, 500) ] );
// const poleGeometry = new THREE.BufferGeometry().setFromPoints( [new THREE.Vector3(earthPos.x, earthPos.y, -0 ) ,new THREE.Vector3( earthPos.x, earthPos.y, 500) ] );
// const lineXMaterial = new THREE.LineBasicMaterial( {
// 	color: 0xff0000,
// 	linewidth: 20,
// 	linecap: 'round', //ignored by WebGLRenderer
// 	linejoin:  'round' //ignored by WebGLRenderer
// } );
// const lineYMaterial = new THREE.LineBasicMaterial( {
// 	color: 0x00ff00,
// 	linewidth: 20,
// 	linecap: 'round', //ignored by WebGLRenderer
// 	linejoin:  'round' //ignored by WebGLRenderer
// } );
// const lineZMaterial = new THREE.LineBasicMaterial( {
// 	color: 0x0000ff,
// 	linewidth: 20,
// 	linecap: 'round', //ignored by WebGLRenderer
// 	linejoin:  'round' //ignored by WebGLRenderer
// } );
// const linePoleMaterial = new THREE.LineBasicMaterial( {
// 	color: 0x00FFff,
// 	linewidth: 20,
// 	linecap: 'round', //ignored by WebGLRenderer
// 	linejoin:  'round' //ignored by WebGLRenderer
// } );

// const xLine = new THREE.Line(xGeometry,lineXMaterial)
// const yLine = new THREE.Line(yGeometry,lineYMaterial)
// const zLine = new THREE.Line(zGeometry,lineZMaterial)

// const poleLine = new THREE.Line(poleGeometry,linePoleMaterial)
// const sunPoleGeo = new THREE.BufferGeometry().setFromPoints( [new THREE.Vector3( 0, 0, -1000 ) ,new THREE.Vector3( 0, 0, 1000) ] );
// const sunPole = new THREE.Line(sunPoleGeo,linePoleMaterial)
// poleLine.rotateX(earthAxialTilt)

// scene.add(xLine)
// scene.add(yLine)
// scene.add(zLine)
// scene.add(poleLine)
// scene.add(sunPole)



const dome = new THREE.Mesh(domeGeometry, domeMaterial);
const stars = new THREE.Mesh(domeGeometry, constellationsMaterial);
dome.renderDepth = domeSize;
const sky = new THREE.Group();
sky.add(dome);
sky.add(stars);
sky.position.set(earthPos.x, earthPos.y, earthPos.z);
sky.rotateX(earthAxialTilt) // for Celestial Coordinate system
sky.rotateY(Math.PI); // for Celestial Coordinate system
sky.rotateX(Math.PI / 2); // for Celestial Coordinate system


const disc = new THREE.RingGeometry(domeSize - 500, domeSize, 24);
const discLineMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide,
  transparent: true
})
const discMesh = new THREE.Mesh(disc, discLineMaterial)
// const discLineMesh = new THREE.Mesh(discLine,discLineMaterial)
const discGroup = new THREE.Group();

// discGroup.add(discLineMesh)

// discMesh.position.set(earthPos.x, earthPos.y, earthPos.z,)
// discTestMesh.position.set(earthPos.x, earthPos.y, earthPos.z + 1,)
// discGroup.add(discMesh)

discGroup.position.set(earthPos.x, earthPos.y, earthPos.z,)
discMesh.rotateX(earthAxialTilt);
scene.add(sky)


new FontLoader().load(
  './fonts/NotoSansSymbols-Regular.typeface.json', function (font) {
    const fontProperties = {
      font: font,
      size: 300,
      height: 12,
      curveSegments: 12,
      bevelEnabled: false,
      // bevelThickness: 10,
      // bevelSize: 8,
      bevelOffset: 0,
      // bevelSegments: 15
    };
    const signsGeometry = [new TextGeometry('♈', fontProperties),
    new TextGeometry('♉', fontProperties),
    new TextGeometry('♊', fontProperties),
    new TextGeometry('♋', fontProperties),
    new TextGeometry('♌', fontProperties),
    new TextGeometry('♍', fontProperties),
    new TextGeometry('♎', fontProperties),
    new TextGeometry('♏', fontProperties),
    new TextGeometry('♐', fontProperties),
    new TextGeometry('♑', fontProperties),
    new TextGeometry('♒', fontProperties),
    new TextGeometry('♓', fontProperties),
    ];
    const signGroup = new THREE.Group();
    signGroup.position.set(earthPos.x, earthPos.y, earthPos.z)
    const signMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
    });

    const signs = signsGeometry.map(signGeometry => new THREE.Mesh(signGeometry, signMaterial))

    signs.forEach((sign, i) => {
      sign.position.set((Math.cos(i / 12 * 2 * Math.PI) * (domeSize - 250)) + earthPos.x,
      (Math.sin(i / 12 * 2 * Math.PI) * (domeSize - 250)) +earthPos.y,
      earthPos.z)
      // console.log(sign.position);
      console.log(new THREE.Vector3(sign.position.x -earthPos.x,sign.position.y -earthPos.y ,sign.position.z - earthPos.z));
      signGroup.add(sign)
    })

    // signGroup.translateX(earthPos.x);
    // signGroup.translateY(earthPos.y);
    // signGroup.translateY(earthPos.z);

    signGroup.rotation.set (earthAxialTilt, 0, 0);

    // console.log(discGroup.position);
    // console.log(signGroup.position);
    // console.log(signGroup.children[1].position);
    discGroup.add(signGroup)
    // scene.add(signGroup);
  });
    scene.add(discGroup);




scene.add(earth);
scene.add(mercury);
scene.add(venus);
scene.add(mars);
scene.add(jupiter);
scene.add(saturn);


const sunMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/sunmap.jpg",),
  emissiveMap: loader.load("./textures/sunmap.jpg"),
  emissive: 0xFFFFFF,
  emissiveIntensity: 100
});

const sunGeometry = new THREE.IcosahedronGeometry(7, 5);
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);

const sunLight = new THREE.PointLight(0xffffff, 500, 0, 1);
// const hem = new THREE.HemisphereLight(0xffffff,0x000000, 1,);
sunLight.castShadow = true; // default false

sunLight.shadow.camera.far = 2000;
sunMesh.add(sunLight)

// sunMesh.position.set(0, 0, 0)

scene.add(sunMesh);
// scene.add(hem);

camera.position.z = 1000;


function animate() {
  renderer.render(scene, camera);
  controls.update();
}
renderer.setAnimationLoop(animate);
