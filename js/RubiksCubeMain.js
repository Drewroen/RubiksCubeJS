//Globals for the cube faces
var FRONT_FACE = 0;
var RIGHT_FACE = 1;
var BACK_FACE = 2;
var LEFT_FACE = 3;
var TOP_FACE = 4;
var BOTTOM_FACE = 5;

//Creates the scene for the cube
var scene = new THREE.Scene();

//Creates the camera for the cube
var CAMERA_FOV = 75;
var CAMERA_NEAR_PLANE = .1;
var CAMERA_FAR_PLANE = 1000;
var camera = new THREE.PerspectiveCamera(CAMERA_FOV, window.innerWidth / window.innerHeight, CAMERA_NEAR_PLANE, CAMERA_FAR_PLANE);

//Sets globals for snapping the cube to a loose grid
var CAMERA_RADIUS = 7;
var CAMERA_SNAP_HORIZONTAL = .7;
var CAMERA_SNAP_VERTICAL_ANGLE = 20;
var SNAP_SPEED = 8;

//Sets the initial position of the camera
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = CAMERA_RADIUS;

//Creates the renderer for the cube
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa);
document.body.appendChild(renderer.domElement);

//Creates the center and pivot groups
//Used for performing cube rotations
var center = new THREE.Group();
scene.add(center);
var pivot = new THREE.Group();
center.add(pivot);

//Adds orbit controls
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;

var raycaster = new THREE.Raycaster();
var raycasterTouch = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var touch = new THREE.Vector2();
touch.x = -1000;
touch.y = -1000;
mouse.x = -1000;
mouse.y = -1000;
var clickedObject;

//Used to track whether the mouse is down
var mouseDown = false;
var touchDown = false;

document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			}

document.addEventListener('touchstart', onDocumentTouchStart, false);

function onDocumentTouchStart( event ) {
				mouseDown = true;
				touchDown = true;
				touch.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
				touch.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;
			}

window.addEventListener('touchend', function(){
			  mouseDown = false;
			});

window.addEventListener('mouseup', function(){
  mouseDown = false;
	if(objectsEqual(getFirstObject(raycaster), clickedObject))
	{
		if(clickedObject)
		{
			if(isObjectSticker(clickedObject))
	    {
	      setStickerColor(clickedObject, new THREE.Color(getPickedColor(pickedColorGUI, cubeColors)));
	    }
		}
	}
});

window.addEventListener('mousedown', function(){
  mouseDown = true;
  clickedObject = getFirstObject(raycaster);
});

//Used to track when keys are pressed
//Meant for debugging purposes
document.addEventListener('keydown', function(event){
});

//The GUI for performing an algorithm and setting parameters
var rubiksGUI = {
  algorithm: "L L' M M' R' R X' X U' U E E' D D' Y' Y F F' S S' B' B Z Z'",
  algorithmSubmit: function(){
    algArray = rubiksGUI.algorithm.split(" ");
    rotations.longAlg = rotations.longAlg.concat(algArray);
  },
  rotationSpeed: 0.05
};

var cubeColorGUI = {
	face1: 0xffffff,
	face2: 0xffa500,
	face3: 0xffff00,
	face4: 0xff0000,
	face5: 0x008000,
	face6: 0x0000ff
}

var cubeColors = {
	face1: 0xffffff,
	face2: 0xffa500,
	face3: 0xffff00,
	face4: 0xff0000,
	face5: 0x008000,
	face6: 0x0000ff
}

var pickedColorGUI = {
	color1: true,
	color2: false,
	color3: false,
	color4: false,
	color5: false,
	color6: false
}

function getPickedColor(pickedColorGUI, cubeColors)
{
	if(pickedColorGUI.color1)
	{
		return cubeColors.face1;
	}
	else if(pickedColorGUI.color2)
	{
		return cubeColors.face2;
	}
	else if(pickedColorGUI.color3)
	{
		return cubeColors.face3;
	}
	else if(pickedColorGUI.color4)
	{
		return cubeColors.face4;
	}
	else if(pickedColorGUI.color5)
	{
		return cubeColors.face5;
	}
	else if(pickedColorGUI.color6)
	{
		return cubeColors.face6;
	}
}

function pickColorBox(pickedColor)
{
	for (let color in pickedColorGUI)
	{
		pickedColorGUI[color] = false;
	}
	pickedColorGUI[pickedColor] = true;

	colorGUIButtons(document, cubeColors);
}

//Used to determine what the cube is doing and the rotation values associated with it
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

var rubiksCubeFaces = createCubeFaces();
var rubiksCubeBlocks = createCubeBlocks();

addCubeBlocksToScene(rubiksCubeBlocks, scene);
addCubeFacesToScene(rubiksCubeFaces, scene);

//Update logic
var update = function()
{
  //Render the scene and camera
  renderer.render(scene, camera);

  //If the cube is not performing a move, try to perform a move that is available
  if(isNotRotating(rotations))
  {
    //Add the move to the tempAlgorithm to perform it
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

  //Rotate the cubes that are in the pivot scene
  //The cubes in the pivot scene are the ones that are part of a turn
  pivot.rotation.x += rubiksGUI.rotationSpeed * rotations.x
  pivot.rotation.y += rubiksGUI.rotationSpeed * rotations.y;
  pivot.rotation.z += rubiksGUI.rotationSpeed * rotations.z;

  //Set the cube to the original rotation with the new faces
  validateCube(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);

  //If the cube isn't performing algorithms, align the front face to where the camera is facing
  if(!rotations.performingAlg)
  {
    realignFrontFace(rubiksCubeFaces, camera);
  }

  //If the user isn't dragging the cube, snap it to the grid
  if(!mouseDown)
  {
    moveTowardGrid(camera, controls);
  }

	updateCubeColors(rubiksCubeFaces, cubeColors, cubeColorGUI)

  //Update the control camera to point the camera at the cube
  controls.update();

  raycaster.setFromCamera(mouse, camera);
	raycasterTouch.setFromCamera(touch, camera);

	if(touchDown)
	{
		clickedObject = getFirstObject(raycasterTouch);
		if(objectsEqual(getFirstObject(raycasterTouch), clickedObject))
		{
			if(clickedObject)
			{
				if(isObjectSticker(clickedObject))
		    {
		      setStickerColor(clickedObject, new THREE.Color(getPickedColor(pickedColorGUI, cubeColors)));
		    }
			}
			touchDown = false;
		}
	}
}
//Run cube loop (update, render, repeat)
var AnimationLoop = function()
{
  requestAnimationFrame(AnimationLoop);
  update();
};

colorGUIButtons(document, cubeColors);

AnimationLoop();
