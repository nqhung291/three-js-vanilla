import '@/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// texture loader
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/17/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/17/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
  '/17/door/ambientOcclusion.jpg',
);
const doorHeightTexture = textureLoader.load('/17/door/height.jpg');
const doorNormalTexture = textureLoader.load('/17/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/17/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/17/door/roughness.jpg');

const bricksColorTexture = textureLoader.load('/17/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load(
  '/17/bricks/ambientOcclusion.jpg',
);
const bricksNormalTexture = textureLoader.load('/17/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/17/bricks/roughness.jpg');

const grassColorTexture = textureLoader.load('/17/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load(
  '/17/grass/ambientOcclusion.jpg',
);
const grassNormalTexture = textureLoader.load('/17/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/17/grass/roughness.jpg');

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

// Scene
const scene = new THREE.Scene();
// Fog
const fog = new THREE.Fog('#262837', 1, 20);
scene.fog = fog;

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.2);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(moonLight);

const doorLight = new THREE.PointLight('#ff7d46', 1, 5);
doorLight.position.set(0, 2.2, 2.7);

// Ghosts
const ghost1 = new THREE.PointLight('#fc03e3', 2, 3);
const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
const ghost3 = new THREE.PointLight('#ffff00', 2, 3);
scene.add(ghost1, ghost2, ghost3);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  }),
);
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2),
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

// House
const house = new THREE.Group();
scene.add(house);
// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  }),
);
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2),
);
walls.position.y = 1.25;
// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({
    color: '#b35f45',
  }),
);
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI / 4;
// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  }),
);
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2),
);
door.position.y = 1;
door.position.z = 2.01;
// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: '#89c854',
});
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.25, 0.25, 0.25);
bush4.position.set(-1, 0.05, 2.6);

house.add(walls, roof, door, bush1, bush2, bush3, bush4, doorLight);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });
for (let i = 0; i < 50; i++) {
  const angle = Math.random() * 2 * Math.PI;
  const radius = 3 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.3, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.castShadow = true;
  graves.add(grave);
}
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837');

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

[
  moonLight,
  doorLight,
  ghost1,
  ghost2,
  ghost3,
  walls,
  bush1,
  bush2,
  bush3,
  bush4,
].forEach((e) => {
  e.castShadow = true;
});
[moonLight, doorLight, ghost1, ghost2, ghost3].forEach((e) => {
  e.shadow.mapSize.width = 256;
  e.shadow.mapSize.height = 256;
  e.shadow.camera.far = 7;
});
floor.receiveShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animate ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = 4 * Math.cos(ghost1Angle);
  ghost1.position.z = 4 * Math.sin(ghost1Angle);
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.5;
  ghost2.position.x = 5 * Math.cos(ghost2Angle);
  ghost2.position.z = 5 * Math.sin(ghost2Angle);
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = elapsedTime * 0.25;
  ghost3.position.x = 5 * Math.cos(ghost3Angle) * Math.sin(ghost3Angle);
  ghost3.position.z = 8 * Math.sin(ghost3Angle) * Math.sin(ghost3Angle);
  ghost3.position.y = Math.sin(elapsedTime * 2) + Math.sin(elapsedTime * 1.75);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
