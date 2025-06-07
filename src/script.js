import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "violet",
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// initialize the axis
const axesHelper = new THREE.AxesHelper(2);
cubeMesh.add(axesHelper);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);
camera.position.z = 5;
scene.add(camera);

// initialize render
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// initialize the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

// render the scene in loop
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;
  cubeMesh.scale.x = Math.sin(currentTime) + 2;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
