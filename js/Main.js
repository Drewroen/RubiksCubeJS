//Used to track when keys are pressed
//Meant for debugging purposes only
//Will NOT be in the final product

/*
document.addEventListener('keydown', function(event){
  if(event.which == 83)
  {
    scramble(rubiksCubeFaces);
  }
  if(event.which == 68)
  {
    addOutputOutlinePiece(EDGE_UP_RIGHT);
    addOutputOutlinePiece(EDGE_UP_LEFT);
  }
  if(event.which == 70)
  {
    clearOutlines();
  }
});
*/

//Update logic
var update = function()
{
  //Updates the glow of the indicated pieces.
  opacityTracker += .03;
  pieceInputMesh.material.opacity = Math.sin(opacityTracker) / (8.0/3) + .375;
  pieceOutputMesh.material.opacity = Math.sin(opacityTracker) / (8.0/3) + .375;

  //Render the scene and camera
  renderer.render(scene, camera);

  //Update the control camera to point the camera at the cube
  controls.update();

  if(!paused)
  {
    currentTime++;
  }

	if(sceneState == SCENE_SOLVE)
	{
    //If the user isn't dragging the cube, snap it to the grid
    if(!mouseDown)
    {
      moveTowardGrid(camera, controls);
    }
    var waitingTime = -5143 * rotationSpeed + 451.4;

    clearOutlines();

    if(currentTime >= waitingTime && !paused)
    {
      //If the cube is not performing a move, try to perform a move that is available
  	  if(isNotRotating(rotations) && closeEnoughToGrid(camera))
  	  {

  	    //Add the move to the tempAlgorithm to perform it
        if(!reverseStep)
        {
          algorithm.currentTurn = algorithm.fullAlgorithm.shift();
          if(algorithm.currentTurn)
          {
            if(algorithm.currentTurn.length > 2)
            {
              algorithm.reverseAlgorithm.unshift(algorithm.currentTurn);
            }
            else if(algorithm.currentTurn.substring(1, 2) == "2")
            {
              algorithm.reverseAlgorithm.unshift(algorithm.currentTurn.substring(0, 1) + "'");
            }
            else if (algorithm.currentTurn.substring(1, 2) == "'")
            {
              algorithm.reverseAlgorithm.unshift(algorithm.currentTurn.substring(0, 1));
            }
            else
            {
              algorithm.reverseAlgorithm.unshift(algorithm.currentTurn + "'");
            }
          }
        }
        else
        {
          algorithm.currentTurn = algorithm.reverseAlgorithm.shift();
          if(algorithm.currentTurn)
          {
            if(algorithm.currentTurn.length > 2)
            {
              algorithm.fullAlgorithm.unshift(algorithm.currentTurn);
            }
            else if(algorithm.currentTurn.substring(1, 2) == "'")
            {
              algorithm.fullAlgorithm.unshift(algorithm.currentTurn.substring(0, 1));
            }
            else
            {
              algorithm.fullAlgorithm.unshift(algorithm.currentTurn + "'");
            }
            paused = true;
          }
          while(algorithm.reverseAlgorithm[0] && algorithm.reverseAlgorithm[0].length > 2)
          {
            console.log("hey we're here");
            algorithm.fullAlgorithm.unshift(algorithm.reverseAlgorithm.shift());
          }
        }

        console.log(algorithm.reverseAlgorithm);

  	    if(algorithm.fullAlgorithm.length > 0)
  	    {
          if(algorithm.currentTurn)
          {
            if(isNotation(algorithm.currentTurn))
            {
              currentTime = 0;
              algorithm.performing = true;
      	      performTurn(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot, algorithm.currentTurn, algorithm);
            }
            else
            {
              opacityTracker = 0;
              var separatedInfo = algorithm.currentTurn.split("*");
              if(separatedInfo.length > 1)
              {
                showSolveModal(document, splitUnderscores(separatedInfo[separatedInfo.length - 1]));
                for(var i = 0; i < separatedInfo.length - 1; i++)
                {
                  if(separatedInfo[i].substring(0, 2) == "I-")
                  {
                    addInputOutlinePiece(eval(separatedInfo[i].substring(2)));
                  }
                  if(separatedInfo[i].substring(0, 2) == "O-")
                  {
                    addOutputOutlinePiece(eval(separatedInfo[i].substring(2)));
                  }
                }
              }
              else
              {
                showSolveModal(document, splitUnderscores(separatedInfo[0]));
              }
            }
          }
  	    }
  	    else
  	    {
          clearOutlines();
  	      algorithm.performing = false;
  				updateSceneState(SCENE_INPUT);
  	    }
      }
	  }

	  //Rotate the cubes that are in the pivot scene
	  //The cubes in the pivot scene are the ones that are part of a turn
	  pivot.rotation.x += rotationSpeed * rotations.x;
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

	  raycasterMouse.setFromCamera(mouse, camera);

		//Updates the cube colors to the colors in the GUI
		updateCubeColors(rubiksCubeFaces, cubeColors, cubeColorGUI)
	}

	if(sceneState == SCENE_SETTINGS)
	{
		//Updates the cube colors to the colors in the GUI
		updateCubeColors(rubiksCubeFaces, cubeColors, cubeColorGUI)
	}

  if(sceneState == SCENE_INFO)
  {
    if(!mouseDown)
    {
      moveTowardGrid(camera, controls);
    }
  }
}
//Run cube loop (update, render, repeat)
var AnimationLoop = function()
{
  requestAnimationFrame(AnimationLoop);
  update();
};

AnimationLoop();
