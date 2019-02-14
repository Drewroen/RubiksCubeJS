function isNotRotating(rotations)
{
  return !rotations.x && !rotations.y && !rotations.z;
}

function recreateCube(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  for(var i = 0; i < 3; i++)
  {
    for(var j = 0; j < 3; j++)
    {
      for(var k = 0; k < 3; k++)
      {
        scene.add(rubiksCubeBlocks[i][j][k]);
      }
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
  if(Math.abs(pivot.rotation.x) > Math.PI / 2 || Math.abs(pivot.rotation.y) > Math.PI / 2 || Math.abs(pivot.rotation.z) > Math.PI / 2)
  {
    recreateCube(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);
    performAlgorithmSequence(rubiksCubeFaces, rotations.alg);
    rotations.alg = "";
  }
}

function performTurn(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot, algorithm)
{
  switch(algorithm)
  {
    case "F": cubeFront(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "F'": cubeFrontPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "X": cubeXAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "X'": cubeXAxisPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "Y": cubeYAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "Y'": cubeYAxisPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "Z": cubeZAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "Z'": cubeZAxisPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "R": cubeRight(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "R'": cubeRightPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "L": cubeLeft(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "L'": cubeLeftPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "B": cubeBack(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "B'": cubeBackPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "U": cubeUp(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "U'": cubeUpPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "D": cubeDown(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "D'": cubeDownPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "E": cubeEquator(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "E'": cubeEquatorPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "M": cubeMiddle(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "M'": cubeMiddlePrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "S": cubeStanding(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "S'": cubeStandingPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); break;
    case "F2": cubeFront(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("F"); break;
    case "X2": cubeXAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("X"); break;
    case "Y2": cubeYAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("Y"); break;
    case "Z2": cubeZAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("Z"); break;
    case "R2": cubeRight(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("R"); break;
    case "L2": cubeLeft(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("L"); break;
    case "B2": cubeBack(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("B"); break;
    case "U2": cubeUp(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("U"); break;
    case "D2": cubeDown(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("D"); break;
    case "E2": cubeEquator(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("E"); break;
    case "M2": cubeMiddle(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("M"); break;
    case "S2": cubeStanding(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); rotations.longAlg.unshift("S"); break;
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

function cubeRight(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.x = -1;
    rotations.alg = "R";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][i+6]);
      pivot.add(rubiksCubeFaces[2][i+6]);
      pivot.add(rubiksCubeFaces[4][i+6]);
      pivot.add(rubiksCubeFaces[5][i+6]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[2][i][j]);
        pivot.add(rubiksCubeFaces[1][(i * 3) + j]);
      }
    }
  }
}

function cubeRightPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.x = 1;
    rotations.alg = "R'";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][i+6]);
      pivot.add(rubiksCubeFaces[2][i+6]);
      pivot.add(rubiksCubeFaces[4][i+6]);
      pivot.add(rubiksCubeFaces[5][i+6]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[2][i][j]);
        pivot.add(rubiksCubeFaces[1][(i * 3) + j]);
      }
    }
  }
}

function cubeMiddle(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.x = 1;
    rotations.alg = "M";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][i+3]);
      pivot.add(rubiksCubeFaces[2][i+3]);
      pivot.add(rubiksCubeFaces[4][i+3]);
      pivot.add(rubiksCubeFaces[5][i+3]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[1][i][j]);
      }
    }
  }
}

function cubeMiddlePrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.x = -1;
    rotations.alg = "M'";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][i+3]);
      pivot.add(rubiksCubeFaces[2][i+3]);
      pivot.add(rubiksCubeFaces[4][i+3]);
      pivot.add(rubiksCubeFaces[5][i+3]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[1][i][j]);
      }
    }
  }
}

function cubeXAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.x = -1;
    rotations.alg = "X";
    for(var i = 0; i < 3; i++)
    {
      for(var j = 0; j < 3; j++)
      {
        for(var k = 0; k < 3; k++)
        {
          pivot.add(rubiksCubeBlocks[i][j][k]);
        }
      }
    }
    for(var i = 0; i < 6; i++)
    {
      for(var j = 0; j < 9; j++)
      {
        pivot.add(rubiksCubeFaces[i][j]);
      }
    }
  }
}

function cubeXAxisPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.x = 1;
    rotations.alg = "X'";
    for(var i = 0; i < 3; i++)
    {
      for(var j = 0; j < 3; j++)
      {
        for(var k = 0; k < 3; k++)
        {
          pivot.add(rubiksCubeBlocks[i][j][k]);
        }
      }
    }
    for(var i = 0; i < 6; i++)
    {
      for(var j = 0; j < 9; j++)
      {
        pivot.add(rubiksCubeFaces[i][j]);
      }
    }
  }
}

function cubeYAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.y = -1;
    rotations.alg = "Y";
    for(var i = 0; i < 3; i++)
    {
      for(var j = 0; j < 3; j++)
      {
        for(var k = 0; k < 3; k++)
        {
          pivot.add(rubiksCubeBlocks[i][j][k]);
        }
      }
    }
    for(var i = 0; i < 6; i++)
    {
      for(var j = 0; j < 9; j++)
      {
        pivot.add(rubiksCubeFaces[i][j]);
      }
    }
  }
}

function cubeYAxisPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.y = 1;
    rotations.alg = "Y'";
    for(var i = 0; i < 3; i++)
    {
      for(var j = 0; j < 3; j++)
      {
        for(var k = 0; k < 3; k++)
        {
          pivot.add(rubiksCubeBlocks[i][j][k]);
        }
      }
    }
    for(var i = 0; i < 6; i++)
    {
      for(var j = 0; j < 9; j++)
      {
        pivot.add(rubiksCubeFaces[i][j]);
      }
    }
  }
}

function cubeUp(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.y = -1;
    rotations.alg = "U";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][(3*i)+2]);
      pivot.add(rubiksCubeFaces[1][i+6]);
      pivot.add(rubiksCubeFaces[2][(3*i)+2]);
      pivot.add(rubiksCubeFaces[3][i+6]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][2][j]);
        pivot.add(rubiksCubeFaces[4][(i * 3) + j]);
      }
    }
  }
}

function cubeUpPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.y = 1;
    rotations.alg = "U'";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][(3*i)+2]);
      pivot.add(rubiksCubeFaces[1][i+6]);
      pivot.add(rubiksCubeFaces[2][(3*i)+2]);
      pivot.add(rubiksCubeFaces[3][i+6]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][2][j]);
        pivot.add(rubiksCubeFaces[4][(i * 3) + j]);
      }
    }
  }
}

function cubeDown(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.y = 1;
    rotations.alg = "D";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][(3*i)]);
      pivot.add(rubiksCubeFaces[1][i]);
      pivot.add(rubiksCubeFaces[2][(3*i)]);
      pivot.add(rubiksCubeFaces[3][i]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][0][j]);
        pivot.add(rubiksCubeFaces[5][(i * 3) + j]);
      }
    }
  }
}

function cubeDownPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.y = -1;
    rotations.alg = "D'";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][(3*i)]);
      pivot.add(rubiksCubeFaces[1][i]);
      pivot.add(rubiksCubeFaces[2][(3*i)]);
      pivot.add(rubiksCubeFaces[3][i]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][0][j]);
        pivot.add(rubiksCubeFaces[5][(i * 3) + j]);
      }
    }
  }
}

function cubeEquator(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.y = 1;
    rotations.alg = "E";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][(3*i)+1]);
      pivot.add(rubiksCubeFaces[1][i+3]);
      pivot.add(rubiksCubeFaces[2][(3*i)+1]);
      pivot.add(rubiksCubeFaces[3][i+3]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][1][j]);
      }
    }
  }
}

function cubeEquatorPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.y = -1;
    rotations.alg = "E'";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[0][(3*i)+1]);
      pivot.add(rubiksCubeFaces[1][i+3]);
      pivot.add(rubiksCubeFaces[2][(3*i)+1]);
      pivot.add(rubiksCubeFaces[3][i+3]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][1][j]);
      }
    }
  }
}

function cubeZAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.z = -1;
    rotations.alg = "Z";
    for(var i = 0; i < 3; i++)
    {
      for(var j = 0; j < 3; j++)
      {
        for(var k = 0; k < 3; k++)
        {
          pivot.add(rubiksCubeBlocks[i][j][k]);
        }
      }
    }
    for(var i = 0; i < 6; i++)
    {
      for(var j = 0; j < 9; j++)
      {
        pivot.add(rubiksCubeFaces[i][j]);
      }
    }
  }
}

function cubeZAxisPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.z = 1;
    rotations.alg = "Z'";
    for(var i = 0; i < 3; i++)
    {
      for(var j = 0; j < 3; j++)
      {
        for(var k = 0; k < 3; k++)
        {
          pivot.add(rubiksCubeBlocks[i][j][k]);
        }
      }
    }
    for(var i = 0; i < 6; i++)
    {
      for(var j = 0; j < 9; j++)
      {
        pivot.add(rubiksCubeFaces[i][j]);
      }
    }
  }
}

function cubeFront(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.z = -1;
    rotations.alg = "F";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[1][(3*i)+2]);
      pivot.add(rubiksCubeFaces[3][(3*i)+2]);
      pivot.add(rubiksCubeFaces[4][(3*i)+2]);
      pivot.add(rubiksCubeFaces[5][(3*i)+2]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][j][2]);
        pivot.add(rubiksCubeFaces[0][(i * 3) + j]);
      }
    }
  }
}

function cubeFrontPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.z = 1;
    rotations.alg = "F'";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[1][(3*i)+2]);
      pivot.add(rubiksCubeFaces[3][(3*i)+2]);
      pivot.add(rubiksCubeFaces[4][(3*i)+2]);
      pivot.add(rubiksCubeFaces[5][(3*i)+2]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][j][2]);
        pivot.add(rubiksCubeFaces[0][(i * 3) + j]);
      }
    }
  }
}

function cubeBack(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.z = 1;
    rotations.alg = "B";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[1][(3*i)]);
      pivot.add(rubiksCubeFaces[3][(3*i)]);
      pivot.add(rubiksCubeFaces[4][(3*i)]);
      pivot.add(rubiksCubeFaces[5][(3*i)]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][j][0]);
        pivot.add(rubiksCubeFaces[2][(i * 3) + j]);
      }
    }
  }
}

function cubeBackPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.z = -1;
    rotations.alg = "B'";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[1][(3*i)]);
      pivot.add(rubiksCubeFaces[3][(3*i)]);
      pivot.add(rubiksCubeFaces[4][(3*i)]);
      pivot.add(rubiksCubeFaces[5][(3*i)]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][j][0]);
        pivot.add(rubiksCubeFaces[2][(i * 3) + j]);
      }
    }
  }
}

function cubeStanding(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.z = -1;
    rotations.alg = "S";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[1][(3*i)+1]);
      pivot.add(rubiksCubeFaces[3][(3*i)+1]);
      pivot.add(rubiksCubeFaces[4][(3*i)+1]);
      pivot.add(rubiksCubeFaces[5][(3*i)+1]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][j][1]);
      }
    }
  }
}

function cubeStandingPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.z = 1;
    rotations.alg = "S'";
    for(var i = 0; i < 3; i++)
    {
      pivot.add(rubiksCubeFaces[1][(3*i)+1]);
      pivot.add(rubiksCubeFaces[3][(3*i)+1]);
      pivot.add(rubiksCubeFaces[4][(3*i)+1]);
      pivot.add(rubiksCubeFaces[5][(3*i)+1]);
      for(var j = 0; j < 3; j++)
      {
        pivot.add(rubiksCubeBlocks[i][j][1]);
      }
    }
  }
}
