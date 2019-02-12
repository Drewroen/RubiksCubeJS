function getClosestRotation(camera, controls, cameraPoints, rubiksCubeFaces)
{
  var closestPoint = findClosestPoint(camera, cameraPoints);
  var newPositions = {
    x: closestPoint[0],
    y: closestPoint[1],
    z: closestPoint[2]
  };
  console.log(camera.rotation.x + " " + camera.rotation.y + " " + camera.rotation.z);
  return newPositions;
}

function arraysEqual(array1, array2)
{
  return JSON.stringify(array1) == JSON.stringify(array2);
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
