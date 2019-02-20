//Creates the scene for the cube
var scene = new THREE.Scene();

//Creates the camera
var camera = new THREE.PerspectiveCamera(CAMERA_FOV, window.innerWidth / window.innerHeight, CAMERA_NEAR_PLANE, CAMERA_FAR_PLANE);

//Sets the initial position of the camera
camera.position.z = CAMERA_RADIUS;

//Creates the renderer for the cube
var renderer = new THREE.WebGLRenderer();
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
