//Creating the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;
var center = new THREE.Group();
scene.add(center);
var pivot = new THREE.Group();
center.add(pivot);
var renderer = new THREE.WebGLRenderer();
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa);
document.body.appendChild(renderer.domElement);

var rubiksGUI = {
  algorithm: "R' D R D'",
  algorithmSubmit: function(){
    algArray = rubiksGUI.algorithm.split(" ");
    rotations.longAlg = rotations.longAlg.concat(algArray);
  },
  rotationSpeed: 0.05
};

var rotations = {
  x: 0,
  y: 0,
  z: 0,
  alg: "",
  longAlg: []
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
  if(isNotRotating(rotations))
  {
    var tempAlgorithm = rotations.longAlg.shift();
    if(tempAlgorithm)
    {
      performTurn(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot, tempAlgorithm);
    }
  }
  pivot.rotation.x += rubiksGUI.rotationSpeed * rotations.x
  pivot.rotation.y += rubiksGUI.rotationSpeed * rotations.y;
  pivot.rotation.z += rubiksGUI.rotationSpeed * rotations.z;

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

AnimationLoop();
