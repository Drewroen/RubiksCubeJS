//Used to track when keys are pressed
//Meant for debugging purposes
document.addEventListener('keydown', function(event){
});

function prepareSolving()
{
	var algArray = algorithmInput.split(" ");
	algorithm.fullAlgorithm = algorithm.fullAlgorithm.concat(algArray);
	updateSceneState(SCENE_SOLVE);
}

function updateSceneState(state)
{
	sceneState = state;
	if(state == SCENE_INPUT)
	{
		controls.enabled = true;
		window.addEventListener('mousemove', onDocumentMouseMove, false);
		window.addEventListener('touchstart', onDocumentTouchStart, false);
		window.addEventListener('touchend', onDocumentTouchEnd);
		window.addEventListener('mouseup', onDocumentMouseUp);
		window.addEventListener('mousedown', onDocumentMouseDown);
		showGUIElements(document);
	}
	else if (state == SCENE_SETTINGS)
	{
		controls.enabled = false;
		window.removeEventListener('mousemove', onDocumentMouseMove, false);
		window.removeEventListener('touchstart', onDocumentTouchStart, false);
		window.removeEventListener('touchend', onDocumentTouchEnd);
		window.removeEventListener('mouseup', onDocumentMouseUp);
		window.removeEventListener('mousedown', onDocumentMouseDown);
		showGUIElements(document);
	}
	else if (state == SCENE_SOLVE)
	{
		controls.enabled = false;
		window.removeEventListener('mousemove', onDocumentMouseMove, false);
		window.removeEventListener('touchstart', onDocumentTouchStart, false);
		window.removeEventListener('touchend', onDocumentTouchEnd);
		window.removeEventListener('mouseup', onDocumentMouseUp);
		window.removeEventListener('mousedown', onDocumentMouseDown);
		hideGUIElements(document);
	}
}

//Makes the JavaScript applet resizable
window.addEventListener('resize', function(){
	camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

updateSceneState(SCENE_INPUT);

//Update logic
var update = function()
{
  //Render the scene and camera
  renderer.render(scene, camera);

  //Update the control camera to point the camera at the cube
  controls.update();

	if(sceneState == SCENE_SOLVE)
	{
		//If the cube is not performing a move, try to perform a move that is available
	  if(isNotRotating(rotations))
	  {
	    //Add the move to the tempAlgorithm to perform it
	    algorithm.currentTurn = algorithm.fullAlgorithm.shift();
	    if(algorithm.currentTurn)
	    {
	      algorithm.performing = true;
	      performTurn(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot, algorithm.currentTurn);
	    }
	    else
	    {
	      algorithm.performing = false;
				updateSceneState(SCENE_INPUT);
	    }
	  }

	  //Rotate the cubes that are in the pivot scene
	  //The cubes in the pivot scene are the ones that are part of a turn
	  pivot.rotation.x += rotationSpeed * rotations.x
	  pivot.rotation.y += rotationSpeed * rotations.y;
	  pivot.rotation.z += rotationSpeed * rotations.z;

	  //Set the cube to the original rotation with the new faces
	  validateCube(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);
	}

	if(sceneState == SCENE_INPUT)
	{
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

	  raycasterMouse.setFromCamera(mouse, camera);

		//Updates the cube colors to the colors in the GUI
		updateCubeColors(rubiksCubeFaces, cubeColors, cubeColorGUI)
	}
}
//Run cube loop (update, render, repeat)
var AnimationLoop = function()
{
  requestAnimationFrame(AnimationLoop);
  update();
};

AnimationLoop();
