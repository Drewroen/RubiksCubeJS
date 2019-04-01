const CORNER_UP_LEFT_BACK = 0;
const CORNER_UP_RIGHT_BACK = 1;
const CORNER_UP_LEFT_FRONT = 2;
const CORNER_UP_RIGHT_FRONT = 3;
const CORNER_DOWN_LEFT_BACK = 4;
const CORNER_DOWN_RIGHT_BACK = 5;
const CORNER_DOWN_LEFT_FRONT = 6;
const CORNER_DOWN_RIGHT_FRONT = 7;

const EDGE_UP_FRONT = 8;
const EDGE_UP_RIGHT = 9;
const EDGE_UP_BACK = 10;
const EDGE_UP_LEFT = 11;
const EDGE_MIDDLE_LEFT_BACK = 12;
const EDGE_MIDDLE_RIGHT_BACK = 13;
const EDGE_MIDDLE_LEFT_FRONT = 14;
const EDGE_MIDDLE_RIGHT_FRONT = 15;
const EDGE_DOWN_FRONT = 16;
const EDGE_DOWN_RIGHT = 17;
const EDGE_DOWN_BACK = 18;
const EDGE_DOWN_LEFT = 19;

//Globals for the cube faces
const FRONT_FACE = 0;
const RIGHT_FACE = 1;
const BACK_FACE = 2;
const LEFT_FACE = 3;
const TOP_FACE = 4;
const BOTTOM_FACE = 5;

//Creates the camera for the cube
const CAMERA_FOV = 75;
const CAMERA_NEAR_PLANE = .1;
const CAMERA_FAR_PLANE = 1000;

//Sets globals for snapping the cube to a loose grid
const CAMERA_RADIUS = 6;
const CAMERA_SNAP_HORIZONTAL = .8;
const CAMERA_SNAP_VERTICAL_ANGLE = 30;
const SNAP_SPEED = 8;
const GRID_SNAP_THRESHOLD = .001;

//Sets the global for the background color
const CANVAS_BACKGROUND_COLOR = 0xdddddd;

//Sets global for the touch threshold
const TOUCH_THRESHOLD = .4;

//Sets globals for the different scenes
const SCENE_INPUT = 0;
const SCENE_SETTINGS = 1;
const SCENE_SOLVE = 2;
const SCENE_INFO = 3;
