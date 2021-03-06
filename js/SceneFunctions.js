function prepareSolving(rubiksCubeFaces)
{
	var solution = solve(rubiksCubeFaces);
	var algArray = solution.split(" ");
	algorithm.fullAlgorithm = algorithm.fullAlgorithm.concat(algArray);
	updateSceneState(SCENE_SOLVE);
	currentTime = (-5143 * rotationSpeed + 451.4);
}

function scramble(rubiksCubeFaces)
{
	var solution = generateRandomScramble(12);
	var algArray = solution.split(" ");
	algorithm.fullAlgorithm = algorithm.fullAlgorithm.concat(algArray);
	updateSceneState(SCENE_SOLVE);
}

function updateSceneState(state)
{
	sceneState = state;
	if(state == SCENE_INPUT)
	{
		controls.enabled = true;
		window.addEventListener('mousemove', onDocumentMouseMove);
		window.addEventListener('touchstart', onDocumentTouchStart);
		window.addEventListener('touchend', onDocumentTouchEnd);
		window.addEventListener('mouseup', onDocumentMouseUp);
		window.addEventListener('mousedown', onDocumentMouseDown);
		showGUIElements(document);
		algorithm.reverseAlgorithm = [];
		document.getElementById("solveButtons").style = "visibility: hidden;";
	}
	else if (state == SCENE_SETTINGS)
	{
		controls.enabled = false;
		window.removeEventListener('mousemove', onDocumentMouseMove);
		window.removeEventListener('touchstart', onDocumentTouchStart);
		window.removeEventListener('touchend', onDocumentTouchEnd);
		window.removeEventListener('mouseup', onDocumentMouseUp);
		window.removeEventListener('mousedown', onDocumentMouseDown);
		showGUIElements(document);
	}
	else if (state == SCENE_SOLVE)
	{
		controls.enabled = false;
		window.removeEventListener('mousemove', onDocumentMouseMove);
		window.removeEventListener('touchstart', onDocumentTouchStart);
		window.removeEventListener('touchend', onDocumentTouchEnd);
		window.removeEventListener('mouseup', onDocumentMouseUp);
		window.removeEventListener('mousedown', onDocumentMouseDown);
		hideGUIElements(document);
		document.getElementById("solveButtons").style = "visiblity: visible;";
	}
	else if (state == SCENE_INFO)
	{
		mouseDown = true;
		controls.enabled = true;
		window.addEventListener('mousemove', onDocumentMouseMove);
		window.addEventListener('touchstart', onDocumentTouchStart);
		window.addEventListener('touchend', onDocumentTouchEnd);
		window.addEventListener('mouseup', onDocumentMouseUp);
		window.addEventListener('mousedown', onDocumentMouseDown);
	}
}
