function getFirstObject(raycaster)
{
  if(raycaster.intersectObjects(scene.children).length)
  {
    return raycaster.intersectObjects(scene.children)[0];
  }
}

function isObjectSticker(clickedObject)
{
  if(clickedObject.object.geometry.type == "PlaneGeometry")
  {
    return true;
  }
  return false;
}

function getStickerColor(clickedObject)
{
  return clickedObject.object.material.color;
}

function setStickerColor(clickedObject, color)
{
  clickedObject.object.material.color = color;
}
