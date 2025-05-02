import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { Tween } from "tween"
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
let latSegments = 36;  // 10° increments
let longSegments = 36; // 10° increments

let sGeometry = new THREE.SphereGeometry(radius, longSegments, latSegments);
let sMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/celestial_grid_16k_print.jpg"),
  alphaMap: loader.load("./textures/celestial_grid_16k_print.jpg"),
  side: THREE.DoubleSide,
  transparent: true
});
const sphere = new THREE.Mesh(sGeometry, sMaterial);


const sky = new THREE.Group();
sky.add(dome);
sky.add(stars);
sky.add(sphere)

// const skyAxesHelper = new THREE.AxesHelper(2000);
// sky.add(skyAxesHelper)
sky.position.set(earthPos.x, earthPos.y, earthPos.z);

sky.rotateX(Math.PI * 3 / 2 + 0) //for THREEJS coordinate system (PI) + Texture specific angle (PI/2)
sky.rotateZ(earthAxialTilt) // for Equatorial Coordinate system
scene.add(sky)

const zodiacPlaneGeometry = new THREE.RingGeometry(domeSize - 500, domeSize, 24);

const zodiacPlaneMaterial = new THREE.LineBasicMaterial({
  color: 0x000000,
  side: THREE.DoubleSide,
  wireframe: true,
  transparent: true
})
const zodiacPlaneMesh = new THREE.Mesh(zodiacPlaneGeometry, zodiacPlaneMaterial)
// const discLineMesh = new THREE.Mesh(discLine,discLineMaterial)

// const zodiacPlaneHelper = new THREE.AxesHelper(2000);
const zodiacPlaneGroup = new THREE.Group();

zodiacPlaneGroup.add(zodiacPlaneMesh)
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
      signGroup.add(sign)
    })
    zodiacPlaneGroup.add(signGroup)
  });
// zodiacPlaneGroup.rotateY(earthAxialTilt); 
// zodiacPlaneGroup.rotateX(earthAxialTilt); //need this bc the zodiac plane is an ecliptic path, convert zodiacPlaneMesh from equatorial -> ecliptic
scene.add(zodiacPlaneGroup);




const equatorialPlanPlanetsGroup = new THREE.Group
equatorialPlanPlanetsGroup.add(earth);
// equatorialPlanPlanetsGroup.position.set(earthPos.x, earthPos.y, earthPos.z);
equatorialPlanPlanetsGroup.add(mercury);
equatorialPlanPlanetsGroup.add(venus);
equatorialPlanPlanetsGroup.add(mars);
equatorialPlanPlanetsGroup.add(jupiter);
equatorialPlanPlanetsGroup.add(saturn);
scene.add(equatorialPlanPlanetsGroup);

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
controls.target = sunMesh.position;
// scene.add(hem);

camera.position.z = 1000;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const controlsPos = { x: controls.target.x ?? 0, y: controls.target.y ?? 0, z: controls.target.z ?? 0 };
let tween = new Tween(controlsPos)
// update the picking ray with the camera and pointer position

renderer.render(scene, camera);
function animate(time) {
  renderer.render(scene, camera);
  controls.update();
  tween.update(time);
}

renderer.setAnimationLoop(animate);
window.addEventListener('click', onClick,);

function onClick(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects[0] != undefined) {
    if (intersects[0].object.id == sunMesh.id) {
      // const originalCameraPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
      // const prevControlsPos = controlsPos
      tween.to({ x: 0, y: 0, z: 0 }).onUpdate(() => {
        // camera.position.set(originalCameraPos.x - controlsPos.x + prevControlsPos.x, originalCameraPos.y - controlsPos.y + prevControlsPos.y, originalCameraPos.z - controlsPos.z + prevControlsPos.z)
        
        controls.target = (new THREE.Vector3(controlsPos.x, controlsPos.y, controlsPos.z))
        console.log(controlsPos.x)
      }
      ).startFromCurrentValues().onComplete(() => {
        controls.update();
        console.log('sun')
      });
      zodiacPlaneGroup.rotation.set(earthAxialTilt, 0, 0)

    } if (intersects[0].object.id == earth.children[0].id) {
      // equatorialPlanPlanetsGroup

      zodiacPlaneGroup.rotation.set(0, 0, 0)
      const originalCameraPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
      tween.to({ x: earthPos.x, y: earthPos.y, z: earthPos.z }).onUpdate(() => {
        // camera.position.set(originalCameraPos.x - controlsPos.x, originalCameraPos.y - controlsPos.y, originalCameraPos.z - controlsPos.z)
        controls.target = (new THREE.Vector3(controlsPos.x, controlsPos.y, controlsPos.z))
        console.log(controlsPos.x)
      }
      ).startFromCurrentValues().onComplete(() => {
        controls.update();
      console.log('earth')
      });
    }
  }

}
