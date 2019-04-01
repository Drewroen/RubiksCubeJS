//Creates the scene for the cube
var scene = new THREE.Scene();

//Creates the camera
var camera = new THREE.PerspectiveCamera(CAMERA_FOV, window.innerWidth / window.innerHeight, CAMERA_NEAR_PLANE, CAMERA_FAR_PLANE);

//Sets the initial position of the camera
camera.position.x = Math.sqrt((CAMERA_RADIUS * CAMERA_RADIUS) / 2.5);
camera.position.y = Math.sqrt((CAMERA_RADIUS * CAMERA_RADIUS) / 5.0);
camera.position.z = Math.sqrt((CAMERA_RADIUS * CAMERA_RADIUS) / 2.5);

//Creates the renderer for the cube
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(CANVAS_BACKGROUND_COLOR);
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

//Makes the JavaScript applet resizable
window.addEventListener('resize', function(){
	camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Creates the raycaster for mouse and touch
var raycasterMouse = new THREE.Raycaster();

//Creates the vector and logic for click and touch position
var mouse = new THREE.Vector2();
mouse.x = -1000;
mouse.y = -1000;
var clickedObject;
var mouseDown = false;
var touchCameraPosition = {
	x: camera.position.x,
	y: camera.position.y,
	z: camera.position.z
}

//Creates the highlights for adding the meshes
var pieceInputMesh = new THREE.Mesh(rubiksCubeBlocks[1][1][1].geometry, new THREE.MeshBasicMaterial({color: 0xff6923, opacity: 0.6, transparent: true, name: "inputOutline"}));
var pieceOutputMesh = new THREE.Mesh(rubiksCubeBlocks[1][1][1].geometry, new THREE.MeshBasicMaterial({color: 0x30ff33, opacity: 0.6, transparent: true, name: "outputOutline"}));
pieceInputMesh.scale.multiplyScalar(1.1);
pieceOutputMesh.scale.multiplyScalar(1.1);
pieceInputMesh.needsUpdate = true;
pieceOutputMesh.needsUpdate = true;
var opacityTracker = 0;


//Creates the 3D Rubik's Cube
addCubeBlocksToScene(rubiksCubeBlocks, scene);
addCubeFacesToScene(rubiksCubeFaces, scene);

//Colors the GUI buttons
colorGUIButtons(document, cubeColors);

updateSceneState(SCENE_INPUT);
