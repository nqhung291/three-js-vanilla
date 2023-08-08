import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const sizes = { width: window.innerWidth, height: window.innerHeight };
const cursor = {
  x: 0,
  y: 0,
};
const clock = new THREE.Clock();

const main = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000,
  );
  camera.position.z = 3;
  scene.add(camera);

  const canvas = document.querySelector('.webgl');
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const textureLoader = new THREE.TextureLoader();
  const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
  const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
  const doorAmbientOcclusionTexture = textureLoader.load(
    '/textures/door/ambientOcclusion.jpg',
  );
  const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
  const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
  const doorMetalnessTexture = textureLoader.load(
    '/textures/door/metalness.jpg',
  );
  const doorRoughnessTexture = textureLoader.load(
    '/textures/door/roughness.jpg',
  );
  const matcapTexture = textureLoader.load('/textures/matcaps/8.png');
  const gradientTexture = textureLoader.load('/textures/gradients/5.jpg');
  gradientTexture.minFilter = THREE.NearestFilter;
  gradientTexture.magFilter = THREE.NearestFilter;
  gradientTexture.generateMipmaps = false;

  // const material = new THREE.MeshBasicMaterial();
  // material.color = new THREE.Color('#00ff00');
  // material.wireframe = true;
  // material.transparent = true;
  // material.alphaMap = doorAlphaTexture;
  // const material = new THREE.MeshNormalMaterial();
  // const material = new THREE.MeshMatcapMaterial();
  // material.matcap = matcapTexture;
  // const material = new THREE.MeshDepthMaterial();
  // const material = new THREE.MeshLambertMaterial();
  // const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
  // // scene.add(ambientLight);
  const pointLight = new THREE.PointLight('#ffffff', 0.5);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 4;
  scene.add(pointLight);
  const material = new THREE.MeshToonMaterial({
    gradientMap: gradientTexture,
  });

  material.side = THREE.DoubleSide;

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5), material);
  sphere.position.x = -1.5;
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.1, 16, 32),
    material,
  );
  torus.position.x = 1.5;

  scene.add(sphere, plane, torus);

  const control = new OrbitControls(camera, canvas);
  control.enableDamping = true;

  window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = -(e.clientY / sizes.height - 0.5);
  });
  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    sphere.rotation.x = 0.1 * elapsedTime;
    plane.rotation.x = 0.1 * elapsedTime;
    torus.rotation.x = 0.1 * elapsedTime;

    sphere.rotation.y = 0.15 * elapsedTime;
    plane.rotation.y = 0.15 * elapsedTime;
    torus.rotation.y = 0.15 * elapsedTime;
    control.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();
};

main();
