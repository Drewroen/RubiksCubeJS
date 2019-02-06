//Creating the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;
var center = new THREE.Group();
scene.add(center);
var pivot = new THREE.Group();
pivot.name = "centerPivot";
center.add(pivot);
var renderer = new THREE.WebGLRenderer();
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa);
document.body.appendChild(renderer.domElement);

var rotations = {
  x: 0,
  y: 0,
  z: 0,
  alg: ""
}

//Makes the JavaScript applet resizable
window.addEventListener('resize', function(){
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

var rubiksCubeFaces = createCubeFaces();
var rubiksCubeBlocks = createCubeBlocks();

addCubeBlocksToScene(rubiksCubeBlocks, scene);
addCubeFacesToScene(rubiksCubeFaces, scene);

//Update logic
var update = function()
{
  pivot.rotation.x += .01 * rotations.x
  pivot.rotation.y += .01 * rotations.y;
  pivot.rotation.z += .01 * rotations.z;


  validateCube(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);
};

//Draw scene
var render = function()
{
  renderer.render(scene, camera);
};

//Run cube loop (update, render, repeat)
var AnimationLoop = function()
{
  requestAnimationFrame(AnimationLoop);
  update();
  render();
};

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
var keyCode = event.which;
if (keyCode == 192) {
  cubeLeftPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);
}

if (keyCode == 226) {
  recreateCube(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);
}
};

AnimationLoop();
