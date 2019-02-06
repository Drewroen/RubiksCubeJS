function isNotRotating(rotations)
{
  return rotations.alg == "";
}

function recreateCube(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  for(var i = 0; i < 3; i++)
  {
    for(var j = 0; j < 3; j++)
    {
      scene.add(rubiksCubeBlocks[0][i][j]);
    }
  }

  for(var i = 0; i < 6; i++)
  {
    for(var j = 0; j < 9; j++)
    {
      scene.add(rubiksCubeFaces[i][j]);
    }
  }

  rotations.x = false;
  rotations.y = false;
  rotations.z = false;

  pivot.rotation.x = 0;
  pivot.rotation.y = 0;
  pivot.rotation.z = 0;
}

function validateCube(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(Math.abs(pivot.rotation.x) > Math.PI / 2 || Math.abs(pivot.rotation.y > Math.PI / 2 || Math.abs(pivot.rotation.z > Math.PI / 2)))
  {
    recreateCube(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);
    performAlgorithmSequence(rubiksCubeFaces, rotations.alg);
    rotations.alg = "";
  }
}

function cubeLeft(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.x = 1;
    rotations.alg = "L";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][i]);
      pivot.add(rubiksCubeFaces[2][i]);
      pivot.add(rubiksCubeFaces[4][i]);
      pivot.add(rubiksCubeFaces[5][i]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[0][i][j]);
        pivot.add(rubiksCubeFaces[3][(i * 3) + j]);
      }
    }
  }
}

function cubeLeftPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.x = -1;
    rotations.alg = "L'";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][i]);
      pivot.add(rubiksCubeFaces[2][i]);
      pivot.add(rubiksCubeFaces[4][i]);
      pivot.add(rubiksCubeFaces[5][i]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[0][i][j]);
        pivot.add(rubiksCubeFaces[3][(i * 3) + j]);
      }
    }
  }
}
