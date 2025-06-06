import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// cubeMesh.position.y = 1;

// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

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
controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene in loop
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
