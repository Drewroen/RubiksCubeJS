var pieceToBeMovedMaterial = new THREE.MeshBasicMaterial({color: 0x34bfff, opacity: 0.5, transparent: true});
var locationToMoveMaterial = new THREE.MeshBasicMaterial({color: 0x30ff33, opacity: 0.5, transparent: true});
var outlineMesh = new THREE.Mesh( rubiksCubeBlocks[2][2][2].geometry, pieceToBeMovedMaterial );
var outlineMesh2 = new THREE.Mesh( rubiksCubeBlocks[2][2][2].geometry, locationToMoveMaterial );
outlineMesh.scale.multiplyScalar( 1.1 );
outlineMesh2.scale.multiplyScalar( 1.1);

//Used to track when keys are pressed
//Meant for debugging purposes only
//Will NOT be in the final product
document.addEventListener('keydown', function(event){
  if(event.which == 83)
  {
    scramble(rubiksCubeFaces);
  }
  if(event.which == 68)
  {
    rubiksCubeBlocks[2][2][2].add(outlineMesh);
    rubiksCubeBlocks[2][2][1].add(outlineMesh2);
  }
  if(event.which == 70)
  {
    rubiksCubeBlocks[2][2][2].remove(outlineMesh);
    rubiksCubeBlocks[2][2][1].remove(outlineMesh2);
  }
});

//Update logic
var update = function()
{
  //Render the scene and camera
  renderer.render(scene, camera);

  //Update the control camera to point the camera at the cube
  controls.update();

	if(sceneState == SCENE_SOLVE)
	{
    //If the user isn't dragging the cube, snap it to the grid
    if(!mouseDown)
    {
      moveTowardGrid(camera, controls);
    }

		//If the cube is not performing a move, try to perform a move that is available
	  if(isNotRotating(rotations) && closeEnoughToGrid(camera))
	  {
	    //Add the move to the tempAlgorithm to perform it
	    algorithm.currentTurn = algorithm.fullAlgorithm.shift();
	    if(algorithm.currentTurn)
	    {
        if(isNotation(algorithm.currentTurn))
        {
          algorithm.performing = true;
  	      performTurn(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot, algorithm.currentTurn, algorithm);
        }
        else
        {
          showSolveModal(document, splitUnderscores(algorithm.currentTurn));
        }
	    }
	    else
	    {
	      algorithm.performing = false;
				updateSceneState(SCENE_INPUT);
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
