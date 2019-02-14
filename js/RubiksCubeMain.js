//Creating the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 6;
var center = new THREE.Group();
scene.add(center);
var pivot = new THREE.Group();
center.add(pivot);
var renderer = new THREE.WebGLRenderer();
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.maxPolarAngle = Infinity;
controls.maxAzimuthAngle = Infinity;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa);
document.body.appendChild(renderer.domElement);

var xCoords = [0, 0, Math.sqrt(24), Math.sqrt(24), Math.sqrt(24), Math.sqrt(24), -Math.sqrt(24), -Math.sqrt(24), -Math.sqrt(24), -Math.sqrt(24), Math.sqrt(6), -Math.sqrt(6), Math.sqrt(6), -Math.sqrt(6), Math.sqrt(6), -Math.sqrt(6), Math.sqrt(6), -Math.sqrt(6)];
var yCoords = [Math.sqrt(36), -Math.sqrt(36), Math.sqrt(6), -Math.sqrt(6), Math.sqrt(6), -Math.sqrt(6), Math.sqrt(6), -Math.sqrt(6), Math.sqrt(6), -Math.sqrt(6), Math.sqrt(6), Math.sqrt(6), -Math.sqrt(6), -Math.sqrt(6), Math.sqrt(6), Math.sqrt(6), -Math.sqrt(6), -Math.sqrt(6)];
var zCoords = [0, 0, Math.sqrt(6), Math.sqrt(6), -Math.sqrt(6), -Math.sqrt(6), Math.sqrt(6), Math.sqrt(6), -Math.sqrt(6), -Math.sqrt(6), Math.sqrt(24), Math.sqrt(24), Math.sqrt(24), Math.sqrt(24), -Math.sqrt(24), -Math.sqrt(24), -Math.sqrt(24), -Math.sqrt(24)];
var cameraPoints = xCoords.map(function (x, i) {
  return [x, yCoords[i], zCoords[i]];
});

var mouseDown;

var rubiksGUI = {
  algorithm: "L L' M M' R' R X' X U' U E E' D D' Y' Y F F' S S' B' B Z Z'",
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
  longAlg: [],
  performingAlg: false
}

//Makes the JavaScript applet resizable
window.addEventListener('resize', function(){
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

window.addEventListener('mouseup', function(){
  mouseDown = false;
  console.log(findCurrentFrontFace(camera));
});

window.addEventListener('mousedown', function(){
  mouseDown = true;
  console.log(findCurrentFrontFace(camera));
});

document.addEventListener('keydown', function(event){
  console.log(camera.position.x + " " + camera.position.y + " " + camera.position.z);
  //console.log(camera.rotation.x + " " + camera.rotation.y + " " + camera.rotation.z);
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
      rotations.performingAlg = true;
      performTurn(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot, tempAlgorithm);
    }
    else
    {
      rotations.performingAlg = false;
    }
  }
  pivot.rotation.x += rubiksGUI.rotationSpeed * rotations.x
  pivot.rotation.y += rubiksGUI.rotationSpeed * rotations.y;
  pivot.rotation.z += rubiksGUI.rotationSpeed * rotations.z;

  validateCube(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);
  if(!rotations.performingAlg)
  {
    realignFrontFace(rubiksCubeFaces, camera);
  }
  if(!mouseDown)
  {
    moveTowardGrid(camera, controls);
  }
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
  controls.update();
};

AnimationLoop();
