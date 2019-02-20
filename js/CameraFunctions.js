function findCurrentFrontFace(camera)
{
  var xPos = camera.position.x;
  var zPos = camera.position.z;
  var closestPos = absoluteMax(xPos, zPos);
  if(closestPos == xPos)
  {
    if(xPos < 0)
    {
      return LEFT_FACE;
    }
    else
    {
      return RIGHT_FACE;
    }
  }
  else {
    if(zPos < 0)
    {
      return BACK_FACE;
    }
    else
    {
      return FRONT_FACE;
    }
  }
}

function absoluteMax(a, b)
{
  if (Math.abs(a) > Math.abs(b))
  {
    return a;
  }
  return b;
}

function realignFrontFace(rubiksCubeFaces, camera)
{
  var frontFace = findCurrentFrontFace(camera);
  if(frontFace == RIGHT_FACE)
  {
    camera.position.set(-camera.position.z, camera.position.y, camera.position.x);
    performAlgorithmSequence(rubiksCubeFaces, "Y");
    controls.update();
  }
  else if(frontFace == BACK_FACE)
  {
    camera.position.set(-camera.position.x, camera.position.y, -camera.position.z);
    performAlgorithmSequence(rubiksCubeFaces, "Y2");
    controls.update();
  }
  else if(frontFace == LEFT_FACE)
  {
    camera.position.set(camera.position.z, camera.position.y, -camera.position.x);
    performAlgorithmSequence(rubiksCubeFaces, "Y'");
    controls.update();
  }
}

function moveTowardGrid(camera, controls)
{
  var angle = getAngleNoYAxis(camera);
  var angleExtension;
  if(angle > 180)
  {
    angleExtension = (360 - CAMERA_SNAP_VERTICAL_ANGLE - angle) / SNAP_SPEED;
  }
  else {
    angleExtension = (CAMERA_SNAP_VERTICAL_ANGLE - angle) / SNAP_SPEED;
  }
  var radius = getRadiusNoYAxis(camera);
  var radiusExtension = (CAMERA_RADIUS - CAMERA_SNAP_HORIZONTAL - radius) / SNAP_SPEED;
  setCameraFromRadiusAndAngle(camera, radius + radiusExtension, angle + angleExtension);
  controls.update();
}

function getAngleNoYAxis(camera)
{
    var xCoord = camera.position.x;
    var yCoord = camera.position.z;
    var radius = getRadiusNoYAxis(camera);
    var angleX = Math.asin(xCoord / radius) * 180 / Math.PI;
    var angleY = Math.acos(yCoord / radius) * 180 / Math.PI;
    if(angleX > 0)
    {
      return angleY;
    }
    else if (angleY < 90 && angleX > -90)
    {
      return 360 + angleX;
    }
    else
    {
      return 180 - angleX;
    }
}

function getRadiusNoYAxis(camera)
{
  var xCoord = camera.position.x;
  var yCoord = camera.position.z;
  return Math.sqrt(Math.pow(xCoord, 2) + Math.pow(yCoord, 2));
}

function setCameraFromRadiusAndAngle(camera, radius, angle)
{
  camera.position.x = radius * Math.sin(angle * Math.PI / 180);
  camera.position.z = radius * Math.cos(angle * Math.PI / 180);
  var yCoord = Math.sqrt(Math.pow(CAMERA_RADIUS, 2) - Math.pow(camera.position.x, 2) - Math.pow(camera.position.z, 2));
  if(camera.position.y > 0)
  {
    camera.position.y = yCoord;
  }
  else
  {
    camera.position.y = -yCoord;
  }
}
