import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import gsap from 'gsap';

const sizes = { width: window.innerWidth, height: window.innerHeight };
const cursor = {
  x: 0,
  y: 0,
};
const gui = new GUI();

const main = () => {
  // scene = camera + object inside
  const scene = new THREE.Scene();
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
  // camera.lookAt(mesh.position);
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  scene.add(camera);

  // object (mesh) = geometry + material
  const canvas = document.querySelector('.webgl');
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const boxGeometry = new THREE.BoxGeometry(2, 2, 2, 2, 2, 2);
  const count = 100;
  // const positions = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
  let positions = new Float32Array(
    [...Array(count * 3 * 3).keys()].map(() => 2 * (Math.random() - 0.5)),
  );
  const positionAttributes = new THREE.BufferAttribute(positions, 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', positionAttributes);

  const loadingManager = new THREE.LoadingManager(
    () => {
      console.log('on loaded');
    },
    () => {
      console.log('on progress');
    },
    () => {
      console.log('on error');
    },
  );
  const textureLoader = new THREE.TextureLoader(loadingManager);
  const texture = textureLoader.load('/textures/door/color.jpg');

  const textureMaterial = new THREE.MeshBasicMaterial({
    map: texture,
  });
  const material = new THREE.MeshBasicMaterial({
    color: 'green',
    wireframe: true,
  });
  const boxMaterial = new THREE.MeshBasicMaterial({
    color: 'yellow',
    wireframe: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(mesh, boxMesh);

  const control = new OrbitControls(camera, canvas);
  control.enableDamping = true;

  const parameters = {
    spin: () => {
      gsap.to(boxMesh.rotation, {
        duration: 1,
        x: boxMesh.rotation.x + Math.PI * 2,
        y: boxMesh.rotation.y - Math.PI * 2,
      });
      gsap.to(mesh.rotation, {
        duration: 1,
        z: mesh.rotation.z + Math.PI * 2,
      });
    },
  };
  gui.add(mesh.position, 'x', -3, 3, 0.01);
  gui.add(mesh.position, 'y', -3, 3, 0.01);
  gui.add(mesh.position, 'z', -3, 3, 0.01);
  gui.add(mesh, 'visible');
  gui.add(mesh.material, 'wireframe');
  gui.addColor(material, 'color');
  gui.addColor(boxMaterial, 'color').name('boxColor');
  gui.add(parameters, 'spin');

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
