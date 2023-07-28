import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const sizes = { width: window.innerWidth, height: window.innerHeight };
const cursor = {
  x: 0,
  y: 0,
};

const main = () => {
  // scene = camera + object inside
  // object (mesh) = geometry + material
  const canvas = document.querySelector('.webgl');
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 'red' }),
  );
  scene.add(mesh);

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  // const camera = new THREE.OrthographicCamera(
  //   -1 * aspectRatio,
  //   1 * aspectRatio,
  //   1,
  //   -1,
  //   0.1,
  //   100,
  // );
  // camera.position.x = 2;
  // camera.position.y = 2;
  camera.position.z = 3;
  scene.add(camera);
  // camera.lookAt(mesh.position);

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

  // const clock = new THREE.Clock();

  const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    // mesh.rotation.x = elapsedTime;
    // mesh.rotation.y = elapsedTime;
    // mesh.rotation.z = elapsedTime;
    // camera.position.x = cursor.x * 3;
    // camera.position.y = cursor.y * 3;
    // camera.lookAt(new THREE.Vector3());
    control.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();
};

main();
