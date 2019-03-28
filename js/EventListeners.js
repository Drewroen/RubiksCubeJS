function onDocumentMouseMove(event) {
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			}

function onDocumentTouchStart(event) {
				mouseDown = true;
				mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;
				touchCameraPosition.x = camera.position.x;
				touchCameraPosition.y = camera.position.y;
				touchCameraPosition.z = camera.position.z;
			}

function onDocumentTouchEnd()
{
	mouseDown = false;
  clickedObject = getFirstObject(raycasterMouse);
	if(Math.abs(camera.position.x - touchCameraPosition.x) < TOUCH_THRESHOLD && Math.abs(camera.position.y - touchCameraPosition.y) < TOUCH_THRESHOLD && Math.abs(camera.position.z - touchCameraPosition.z) < TOUCH_THRESHOLD)
	{
		if(clickedObject)
		{
			if(isObjectSticker(clickedObject))
	    {
	      setStickerColor(clickedObject, new THREE.Color(getPickedColor(pickedColorGUI, cubeColorGUI)));
	    }
		}
	}
}

function onDocumentMouseUp()
{
	mouseDown = false;
	if(objectsEqual(getFirstObject(raycasterMouse), clickedObject))
	{
		if(clickedObject)
		{
			if(isObjectSticker(clickedObject))
	    {
				console.log(getPickedColor(pickedColorGUI, cubeColorGUI));
	      setStickerColor(clickedObject, new THREE.Color(getPickedColor(pickedColorGUI, cubeColorGUI)));
	    }
		}
	}
}

function onDocumentMouseDown(event) {
	mouseDown = true;
  clickedObject = getFirstObject(raycasterMouse);
}
