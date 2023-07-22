import './style.css'
import * as THREE from 'three'

const sizes = {
  width: 800,
  height: 600
}

const main = () => {
  // scene = camera + object inside
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  camera.position.z = 3
  scene.add(camera)

  const geometry = new THREE.BoxGeometry(1,1,1)
  const material = new THREE.MeshBasicMaterial({
    color: 'red'
  })
  // object (mesh) = geometry + material
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // need a renderer to render scene to html
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
}

main()
