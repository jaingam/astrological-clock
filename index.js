import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
// import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat';
import { TextGeometry, FontLoader } from 'jsm/Addons.js';
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


const earthAxialTilt = 23.4392911 * Math.PI / 180;

const loader = new THREE.TextureLoader;


const [earth, earthPos] = getEarth();
const mercury = getMercury();
const venus = getVenus();
const mars = getMars();
const jupiter = getJupiter();
const saturn = getSaturn();

// const earthAxesHelper = new THREE.AxesHelper(2000);
// earthAxesHelper.position.set(earthPos.x, earthPos.y, earthPos.z)
// scene.add(earthAxesHelper);


const domeGeometry = new THREE.SphereGeometry(domeSize);
const domeMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/starmap_c8k.jpg"),
  side: THREE.DoubleSide,
  color: 0x888888
});

const constellTexture = loader.load("./textures/constellation_figures_8k.png") //cel
constellTexture.flipY = false;
const constellationsMaterial = new THREE.MeshBasicMaterial({
  map: constellTexture,
  alphaMap: constellTexture,
  side: THREE.DoubleSide,
  transparent: true
});

const dome = new THREE.Mesh(domeGeometry, domeMaterial);
const stars = new THREE.Mesh(domeGeometry, constellationsMaterial);
dome.renderDepth = domeSize;

let radius = domeSize - 10;
let latSegments = 18;  // 10° increments
let longSegments = 18; // 10° increments

let sGeometry = new THREE.SphereGeometry(radius, longSegments, latSegments);
let sMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/celestial_grid_16k_print.jpg") ,
  alphaMap: loader.load("./textures/celestial_grid_16k_print.jpg") ,
  side: THREE.DoubleSide,
  transparent: true
});
const sphere = new THREE.Mesh(sGeometry, sMaterial);


const sky = new THREE.Group();
sky.add(dome);
sky.add(stars);
sky.add(sphere)

const skyAxesHelper = new THREE.AxesHelper(2000);
sky.position.set(earthPos.x, earthPos.y, earthPos.z);

sky.add(skyAxesHelper)
sky.rotateX(Math.PI * 3 / 2 + 0) //for THREEJS coordinate system (PI) + Texture specific angle (PI/2)
sky.rotateZ(earthAxialTilt) // for Equatorial Coordinate system
// sky.rotateY(earthAxialTilt)
scene.add(sky)

const zodiacPlaneGeometry = new THREE.RingGeometry(domeSize - 500, domeSize, 24);

const zodiacPlaneMaterial = new THREE.LineBasicMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide,
  wireframe:true,
  transparent: true
})
const zodiacPlaneMesh = new THREE.Mesh(zodiacPlaneGeometry, zodiacPlaneMaterial)
// const discLineMesh = new THREE.Mesh(discLine,discLineMaterial)

// const zodiacPlaneHelper = new THREE.AxesHelper(2000);
const zodiacPlaneGroup = new THREE.Group();

// zodiacPlaneGroup.add(zodiacPlaneMesh)
// zodiacPlaneGroup.add(zodiacPlaneHelper);
zodiacPlaneGroup.position.set(earthPos.x, earthPos.y, earthPos.z,)


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
        (Math.sin(i / 12 * 2 * Math.PI) * (domeSize - 250)) + earthPos.y,
        earthPos.z)
      // console.log(sign.position);
      console.log(new THREE.Vector3(sign.position.x - earthPos.x, sign.position.y - earthPos.y, sign.position.z - earthPos.z));
      signGroup.add(sign)
    })

    // signGroup.translateX(earthPos.x);
    // signGroup.translateY(earthPos.y);
    // signGroup.translateY(earthPos.z);

    // signGroup.rotation.set (earthAxialTilt, 0, 0); // no need to set rotation, the normal plane is already ecliptic.

    // console.log(discGroup.position);
    // console.log(signGroup.position);
    // console.log(signGroup.children[1].position);
    zodiacPlaneGroup.add(signGroup)
  });
zodiacPlaneGroup.rotateY(earthAxialTilt); 
zodiacPlaneGroup.rotateX(earthAxialTilt); //should be value of sidereal why?
scene.add(zodiacPlaneGroup);




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

const sunGeometry = new THREE.SphereGeometry(7);
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
