var algorithm = "L L' M M' R' R X' X U' U E E' D D' Y' Y F F' S S' B' B Z Z'";
var rotationSpeed = 0.05;

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

var rubiksCubeFaces = createCubeFaces();
var rubiksCubeBlocks = createCubeBlocks();

//Used to determine what the cube is doing and the rotation values associated with it
var rotations = {
  x: 0,
  y: 0,
  z: 0,
  alg: "",
  longAlg: [],
  performingAlg: false
}
