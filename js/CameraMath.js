function getClosestRotation(camera, controls, cameraPoints, rubiksCubeFaces)
{
  var closestPoint = findClosestPoint(camera, cameraPoints);
  var newPositions = {
    x: closestPoint[0],
    y: closestPoint[1],
    z: closestPoint[2]
  };
  return newPositions;
}

function arraysEqual(array1, array2)
{
  for(var i = 0; i < array1.length; i++)
  {
    if(Math.round(array1[i] * 100000) / 100000.0 != Math.round(array2[i] * 100000) / 100000.0)
    {
      return false;
    }
  }
  return true;
}

/*
0, 6, 0		0
0, -6, 0	1
24, 6, 6	2
24, -6, 6	3
24, 6, -6	4
24, -6, -6	5
-24, 6, 6	6
-24, -6, 6	7
-24, 6, -6	8
-24, -6, -6	9
6, 6, 24	10
-6, 6, 24	11
6, -6, 24	12
-6, -6, 24	13
6, 6, -24	14
-6, 6, -24,	15
6, -6, -24,	16
-6, -6, -24	17
*/

function modifyForFront(camera, controls, cameraPoints, rubiksCubeFaces)
{
  var point = [camera.position.x, camera.position.y, camera.position.z];
  var resetCameraValue;
  var algorithm;
  if (arraysEqual(point, cameraPoints[8]))
  {
    resetCameraValue = 11;
    algorithm = "Y'";
  }
  else if (arraysEqual(point, cameraPoints[14]))
  {
    resetCameraValue = 11;
    algorithm = "Y2";
  }
  else if (arraysEqual(point, cameraPoints[2]))
  {
    resetCameraValue = 11;
    algorithm = "Y";
  }
  else if (arraysEqual(point, cameraPoints[4]))
  {
    resetCameraValue = 10;
    algorithm = "Y";
  }
  else if (arraysEqual(point, cameraPoints[15]))
  {
    resetCameraValue = 10;
    algorithm = "Y2";
  }
  else if (arraysEqual(point, cameraPoints[6]))
  {
    resetCameraValue = 10;
    algorithm = "Y'";
  }
  else if (arraysEqual(point, cameraPoints[9]))
  {
    resetCameraValue = 13;
    algorithm = "Y'";
  }
  else if (arraysEqual(point, cameraPoints[16]))
  {
    resetCameraValue = 13;
    algorithm = "Y2";
  }
  else if (arraysEqual(point, cameraPoints[3]))
  {
    resetCameraValue = 13;
    algorithm = "Y";
  }
  else if (arraysEqual(point, cameraPoints[5]))
  {
    resetCameraValue = 12;
    algorithm = "Y";
  }
  else if (arraysEqual(point, cameraPoints[17]))
  {
    resetCameraValue = 12;
    algorithm = "Y2";
  }
  else if (arraysEqual(point, cameraPoints[7]))
  {
    resetCameraValue = 12;
    algorithm = "Y'";
  }
  else if (arraysEqual(point, cameraPoints[0]))
  {
    zRotationValue = ((Math.round(camera.rotation.z / (Math.PI / 2)) % 4) + 4) % 4;
    console.log(zRotationValue);
    if(zRotationValue == 0)
    {
      resetCameraValue = 11;
      algorithm = "X'";
    }
    if(zRotationValue == 1)
    {
      resetCameraValue = 10;
      algorithm = "Y X'";
    }
    else if(zRotationValue == 2)
    {
      resetCameraValue = 11;
      algorithm = "X Y2";
    }
    else if(zRotationValue == 3)
    {
      resetCameraValue = 11;
      algorithm = "X' Z'";
    }
  }
  else if (arraysEqual(point, cameraPoints[1]))
  {
    zRotationValue = ((Math.round(camera.rotation.z / (Math.PI / 2)) % 4) + 4) % 4;
    if(zRotationValue == 0)
    {
      resetCameraValue = 12;
      algorithm = "X";
    }
    if(zRotationValue == 1)
    {
      resetCameraValue = 13;
      algorithm = "Y' X";
    }
    else if(zRotationValue == 2)
    {
      resetCameraValue = 12;
      algorithm = "X' Y2";
    }
    else if(zRotationValue == 3)
    {
      resetCameraValue = 12;
      algorithm = "X Z'";
    }
  }
  if(resetCameraValue && algorithm)
  {
    camera.position.x = cameraPoints[resetCameraValue][0];
    camera.position.y = cameraPoints[resetCameraValue][1];
    camera.position.z = cameraPoints[resetCameraValue][2];
    performAlgorithmSequence(rubiksCubeFaces, algorithm);
  }
}

function getDistanceBetweenPoints(point1, point2)
{
  var xSquared = Math.pow(point1[0] - point2[0], 2);
  var ySquared = Math.pow(point1[1] - point2[1], 2);
  var zSquared = Math.pow(point1[2] - point2[2], 2);
  return Math.sqrt(xSquared + ySquared + zSquared);
}

function findClosestPoint(camera, cameraPoints)
{
  var point = makePointFromCamera(camera)
  var distance = getDistanceBetweenPoints(point, cameraPoints[0]);
  var pointVal = 0;
  for(var i = 1; i < cameraPoints.length; i++)
  {
    var tempDistance = getDistanceBetweenPoints(point, cameraPoints[i]);
    if(tempDistance < distance)
    {
      distance = tempDistance;
      pointVal = i;
    }
  }
  return cameraPoints[pointVal];
}

function makePointFromCamera(camera)
{
  return [camera.position.x, camera.position.y, camera.position.z];
}

function findCurrentFrontFace(camera)
{
  var xPos = camera.position.x;
  var zPos = camera.position.z;
  var closestPos = absoluteMax(xPos, zPos);
  if(closestPos == xPos)
  {
    if(xPos < 0)
    {
      return 3;
    }
    else
    {
      return 1;
    }
  }
  else {
    if(zPos < 0)
    {
      return 2;
    }
    else
    {
      return 0;
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
  if(frontFace == 1)
  {
    camera.position.set(-camera.position.z, camera.position.y, camera.position.x);
    performAlgorithmSequence(rubiksCubeFaces, "Y");
    controls.update();
  }
  else if(frontFace == 2)
  {
    camera.position.set(-camera.position.x, camera.position.y, -camera.position.z);
    performAlgorithmSequence(rubiksCubeFaces, "Y2");
    controls.update();
  }
  else if(frontFace == 3)
  {
    camera.position.set(camera.position.z, camera.position.y, -camera.position.x);
    performAlgorithmSequence(rubiksCubeFaces, "Y'");
    controls.update();
  }
}

function moveTowardGrid(camera, controls)
{
  var zMovement = (Math.sqrt(24) - camera.position.z) / 20;
  var xMovement;
  var yMovement;
  if (camera.position.x < 0)
  {
    xMovement = (-Math.sqrt(6) - camera.position.x) / 20;
  }
  else {
    xMovement = (Math.sqrt(6) - camera.position.x) / 20;
  }
  if (camera.position.y < 0)
  {
    yMovement = (-Math.sqrt(6) - camera.position.y) / 20;
  }
  else {
    yMovement = (Math.sqrt(6) - camera.position.y) / 20;
  }
  camera.position.set(camera.position.x + xMovement, camera.position.y + yMovement, camera.position.z + zMovement);
  controls.update();
}
