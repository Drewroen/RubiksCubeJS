//Globals for the cube faces
var FRONT_FACE = 0;
var RIGHT_FACE = 1;
var BACK_FACE = 2;
var LEFT_FACE = 3;
var TOP_FACE = 4;
var BOTTOM_FACE = 5;

//Creates the camera for the cube
var CAMERA_FOV = 75;
var CAMERA_NEAR_PLANE = .1;
var CAMERA_FAR_PLANE = 1000;

//Sets globals for snapping the cube to a loose grid
var CAMERA_RADIUS = 7;
var CAMERA_SNAP_HORIZONTAL = .7;
var CAMERA_SNAP_VERTICAL_ANGLE = 20;
var SNAP_SPEED = 8;

//Sets the global for the background color
var CANVAS_BACKGROUND_COLOR = 0xdddddd;

//Sets global for the touch threshold
var TOUCH_THRESHOLD = .4;

//Sets globals for the different scenes
var SCENE_INPUT = 0;
var SCENE_SETTINGS = 1;
var SCENE_SOLVE = 2;
var SCENE_INFO = 3;
