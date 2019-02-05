//Creating the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;
var renderer = new THREE.WebGLRenderer();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;
controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa);
document.body.appendChild(renderer.domElement);

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
if (keyCode == 82) {
  randomizeFaces(rubiksCubeFaces);
}
};

var FizzyText = function() {
  this.message = 'dat.gui';
  this.speed = 0.8;
};

window.onload = function() {
  var gui = new dat.GUI();
  var rubiksMovements = {
    right:function(){console.log("Right")},
    rightPrime:function(){console.log("Right Prime")},
    left:function(){console.log("Left")},
    leftPrime:function(){console.log("Left Prime")},
    front:function(){console.log("Front"); front(rubiksCubeFaces);},
    frontPrime:function(){console.log("Front Prime");},
    back:function(){console.log("Back")},
    backPrime:function(){console.log("Back Prime")},
    up:function(){console.log("Up")},
    upPrime:function(){console.log("Up Prime")},
    down:function(){console.log("Down")},
    downPrime:function(){console.log("Down Prime")},
    xAxis:function(){console.log("X Axis")},
    xAxisPrime:function(){console.log("X Axis Prime")},
    yAxis:function(){console.log("Y Axis")},
    yAxisPrime:function(){console.log("Y Axis Prime")},
    zAxis:function(){console.log("Z Axis")},
    zAxisPrime:function(){console.log("Z Axis Prime")},
    middle:function(){console.log("Middle")},
    middlePrime:function(){console.log("Middle Prime")},
    equator:function(){console.log("Equator")},
    equatorPrime:function(){console.log("Equator Prime")},
    standing:function(){console.log("Standing")},
    standingPrime:function(){console.log("Standing Prime")},
  };

  gui.add(rubiksMovements, 'front').name('F');
};


AnimationLoop();
