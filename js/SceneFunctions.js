function prepareSolving(rubiksCubeFaces)
{
	var solution = solve(rubiksCubeFaces);
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
	else if (state == SCENE_INFO)
	{
		controls.enabled = false;
		window.removeEventListener('mousemove', onDocumentMouseMove, false);
		window.removeEventListener('touchstart', onDocumentTouchStart, false);
		window.removeEventListener('touchend', onDocumentTouchEnd);
		window.removeEventListener('mouseup', onDocumentMouseUp);
		window.removeEventListener('mousedown', onDocumentMouseDown);
	}
}
