//Adds event listeners for mouse (Desktop) movements and touch (Mobile) movements
//Functions are located in EventListeners.js
window.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('touchstart', onDocumentTouchStart, false);
window.addEventListener('touchend', onDocumentTouchEnd);
window.addEventListener('mouseup', onDocumentMouseUp);
window.addEventListener('mousedown', onDocumentMouseDown);

//Used to track when keys are pressed
//Meant for debugging purposes
document.addEventListener('keydown', function(event){
});

function submitAlgorithm()
{
	var algArray = algorithm.split(" ");
	rotations.longAlg = rotations.longAlg.concat(algArray);
}

//Makes the JavaScript applet resizable
window.addEventListener('resize', function(){
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

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
  pivot.rotation.x += rotationSpeed * rotations.x
  pivot.rotation.y += rotationSpeed * rotations.y;
  pivot.rotation.z += rotationSpeed * rotations.z;

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

	//Updates the cube colors to the colors in the GUI
	updateCubeColors(rubiksCubeFaces, cubeColors, cubeColorGUI)

  //Update the control camera to point the camera at the cube
  controls.update();

  raycasterMouse.setFromCamera(mouse, camera);
}
//Run cube loop (update, render, repeat)
var AnimationLoop = function()
{
  requestAnimationFrame(AnimationLoop);
  update();
};

AnimationLoop();
