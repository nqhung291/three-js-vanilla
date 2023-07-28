import './style.css';
import * as THREE from 'three';

const sizes = { width: 800, height: 600 };

const main = () => {
  // scene = camera + object inside
  // object (mesh) = geometry + material
  const scene = new THREE.Scene();

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 'red' }),
  );
  scene.add(mesh);

  // const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 2;
  camera.lookAt(mesh.position);
  scene.add(camera);

  // need a renderer to render scene to html
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl'),
  });
  renderer.setSize(sizes.width, sizes.height);

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    mesh.rotation.x = elapsedTime;
    mesh.rotation.y = elapsedTime;
    mesh.rotation.z = elapsedTime;
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();
};

main();
