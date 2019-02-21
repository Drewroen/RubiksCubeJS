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
    performAlgorithmSequence(rubiksCubeFaces, algorithm.currentTurn);
    algorithm.currentTurn = "";
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
    case "F2": cubeFront(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("F"); break;
    case "X2": cubeXAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("X"); break;
    case "Y2": cubeYAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("Y"); break;
    case "Z2": cubeZAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("Z"); break;
    case "R2": cubeRight(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("R"); break;
    case "L2": cubeLeft(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("L"); break;
    case "B2": cubeBack(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("B"); break;
    case "U2": cubeUp(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("U"); break;
    case "D2": cubeDown(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("D"); break;
    case "E2": cubeEquator(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("E"); break;
    case "M2": cubeMiddle(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("M"); break;
    case "S2": cubeStanding(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot); algorithm.fullAlgorithm.unshift("S"); break;
  }
}

function cubeLeft(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot)
{
  if(isNotRotating(rotations))
  {
    rotations.x = 1;
    algorithm.currentTurn = "L";
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
    algorithm.currentTurn = "L'";
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
    algorithm.currentTurn = "R";
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
    algorithm.currentTurn = "R'";
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
    algorithm.currentTurn = "M";
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
    algorithm.currentTurn = "M'";
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
    algorithm.currentTurn = "X";
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
    algorithm.currentTurn = "X'";
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
    algorithm.currentTurn = "Y";
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
    algorithm.currentTurn = "Y'";
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
    algorithm.currentTurn = "U";
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
    algorithm.currentTurn = "U'";
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
    algorithm.currentTurn = "D";
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
    algorithm.currentTurn = "D'";
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
    algorithm.currentTurn = "E";
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
    algorithm.currentTurn = "E'";
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
    algorithm.currentTurn = "Z";
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
    algorithm.currentTurn = "Z'";
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
    algorithm.currentTurn = "F";
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
    algorithm.currentTurn = "F'";
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
    algorithm.currentTurn = "B";
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
    algorithm.currentTurn = "B'";
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
    algorithm.currentTurn = "S";
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
    algorithm.currentTurn = "S'";
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

function performAlgorithmSequence(rubiksCube, alg)
{
  var moves = alg.split(" ");
  moves.forEach(function(move) {
    switch(move)
    {
      case "F": front(rubiksCube); break;
      case "F'": frontPrime(rubiksCube); break;
      case "X": xAxis(rubiksCube); break;
      case "X'": xAxisPrime(rubiksCube); break;
      case "Y": yAxis(rubiksCube); break;
      case "Y'": yAxisPrime(rubiksCube); break;
      case "Z": zAxis(rubiksCube); break;
      case "Z'": zAxisPrime(rubiksCube); break;
      case "R": right(rubiksCube); break;
      case "R'": rightPrime(rubiksCube); break;
      case "L": left(rubiksCube); break;
      case "L'": leftPrime(rubiksCube); break;
      case "B": back(rubiksCube); break;
      case "B'": backPrime(rubiksCube); break;
      case "U": up(rubiksCube); break;
      case "U'": upPrime(rubiksCube); break;
      case "D": down(rubiksCube); break;
      case "D'": downPrime(rubiksCube); break;
      case "E": equator(rubiksCube); break;
      case "E'": equatorPrime(rubiksCube); break;
      case "M": middle(rubiksCube); break;
      case "M'": middlePrime(rubiksCube); break;
      case "S": standing(rubiksCube); break;
      case "S'": standingPrime(rubiksCube); break;
      case "F2": front(rubiksCube); front(rubiksCube); break;
      case "X2": xAxis(rubiksCube); xAxis(rubiksCube); break;
      case "Y2": yAxis(rubiksCube); yAxis(rubiksCube); break;
      case "Z2": zAxis(rubiksCube); zAxis(rubiksCube); break;
      case "R2": right(rubiksCube); right(rubiksCube); break;
      case "L2": left(rubiksCube); left(rubiksCube); break;
      case "B2": back(rubiksCube); back(rubiksCube); break;
      case "U2": up(rubiksCube); up(rubiksCube); break;
      case "D2": down(rubiksCube); down(rubiksCube); break;
      case "E2": equator(rubiksCube); equator(rubiksCube); break;
      case "M2": middle(rubiksCube); middle(rubiksCube); break;
      case "S2": standing(rubiksCube); standing(rubiksCube); break;
    }
  });
}

function front(rubiksCube)
{
  rubiksCubeOldReference = createCubeFacesFromCube(rubiksCube);
  for(var i = 0; i < rubiksCube[0].length; i++)
  {
    setCubeFace(rubiksCube, 0, i, getCubeFace(rubiksCubeOldReference, 0, ((2 - (i % 3)) * 3) + Math.floor(i / 3)));
  }

  for(var i = 0; i < 3; i++)
  {
    setCubeFace(rubiksCube, 1, (3 * i) + 2, getCubeFace(rubiksCubeOldReference, 4, (3 * (3 - i)) - 1));
    setCubeFace(rubiksCube, 5, (3 * i) + 2, getCubeFace(rubiksCubeOldReference, 1, (3 * i) + 2));
    setCubeFace(rubiksCube, 3, (3 * (3 - i)) - 1, getCubeFace(rubiksCubeOldReference, 5, (3 * i) + 2));
    setCubeFace(rubiksCube, 4, (3 * (3 - i)) - 1, getCubeFace(rubiksCubeOldReference, 3, (3 * (3 - i)) - 1));
  }
}

function frontPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "F F F");
}

function xAxis(rubiksCube)
{
  rubiksCubeOldReference = createCubeFacesFromCube(rubiksCube);
  for(var i = 0; i < rubiksCube[0].length; i++)
  {
    setCubeFace(rubiksCube, 4, i, getCubeFace(rubiksCubeOldReference, 0, Math.floor(i/3) * 3 + (2 - (i % 3))));
    setCubeFace(rubiksCube, 0, i, getCubeFace(rubiksCubeOldReference, 5, i));
    setCubeFace(rubiksCube, 5, i, getCubeFace(rubiksCubeOldReference, 2, Math.floor(i/3) * 3 + (2 - (i % 3))));
    setCubeFace(rubiksCube, 2, i, getCubeFace(rubiksCubeOldReference, 4, i));
    setCubeFace(rubiksCube, 1, i, getCubeFace(rubiksCubeOldReference, 1, (2 - (i % 3)) * 3 + Math.floor(i/3)));
    setCubeFace(rubiksCube, 3, i, getCubeFace(rubiksCubeOldReference, 3, (2 - (i % 3)) * 3 + Math.floor(i/3)));
  }
}

function xAxisPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "X X X");
}

function yAxis(rubiksCube)
{
  rubiksCubeOldReference = createCubeFacesFromCube(rubiksCube);
  for(var i = 0; i < rubiksCube[0].length; i++)
  {
    setCubeFace(rubiksCube, 0, i, getCubeFace(rubiksCubeOldReference, 1, Math.floor(i % 3) * 3 + (2 - (Math.floor(i/3)))));
    setCubeFace(rubiksCube, 1, i, getCubeFace(rubiksCubeOldReference, 2, Math.floor(i % 3) * 3 + ((Math.floor(i/3)))));
    setCubeFace(rubiksCube, 2, i, getCubeFace(rubiksCubeOldReference, 3, Math.floor(i % 3) * 3 + (2 - (Math.floor(i/3)))));
    setCubeFace(rubiksCube, 3, i, getCubeFace(rubiksCubeOldReference, 0, Math.floor(i % 3) * 3 + ((Math.floor(i/3)))));
    setCubeFace(rubiksCube, 4, i, getCubeFace(rubiksCubeOldReference, 4, (i % 3) * 3 + (2 - Math.floor(i/3))));
    setCubeFace(rubiksCube, 5, i, getCubeFace(rubiksCubeOldReference, 5, (i % 3) * 3 + (2 - Math.floor(i/3))));
  }
}

function yAxisPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "Y Y Y");
}

function zAxis(rubiksCube)
{
  rubiksCubeOldReference = createCubeFacesFromCube(rubiksCube);
  for(var i = 0; i < rubiksCube[0].length; i++)
  {
    setCubeFace(rubiksCube, 4, i, getCubeFace(rubiksCubeOldReference, 3, Math.floor(i/3) * 3 + (i % 3)));
    setCubeFace(rubiksCube, 3, i, getCubeFace(rubiksCubeOldReference, 5, (2 - Math.floor(i/3)) * 3 + (i % 3)));
    setCubeFace(rubiksCube, 5, i, getCubeFace(rubiksCubeOldReference, 1, Math.floor(i/3) * 3 + (i % 3)));
    setCubeFace(rubiksCube, 1, i, getCubeFace(rubiksCubeOldReference, 4, (2 - Math.floor(i/3)) * 3 + (i % 3)));
    setCubeFace(rubiksCube, 0, i, getCubeFace(rubiksCubeOldReference, 0, (2 - (i % 3)) * 3 + Math.floor(i/3)));
    setCubeFace(rubiksCube, 2, i, getCubeFace(rubiksCubeOldReference, 2, (2 - (i % 3)) * 3 + Math.floor(i/3)));
  }
}

function zAxisPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "Z Z Z");
}

function right(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "Y F Y'");
}

function rightPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "Y F' Y'");
}

function left(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "Y' F Y");
}

function leftPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "Y' F' Y");
}

function back(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "X X F X' X'");
}

function backPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "X X F' X' X'");
}

function up(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "X' F X");
}

function upPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "X' F' X");
}

function down(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "X F X'");
}

function downPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "X F' X'");
}

function middle(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "Y F Y' Y' F' Y X'");
}

function middlePrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "Y F' Y' Y' F Y X");
}

function equator(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "X F' X' X' F X Y'");
}

function equatorPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "X F X' X' F' X Y");
}

function standing(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "F' Y Y F Y' Y' Z");
}

function standingPrime(rubiksCube)
{
  performAlgorithmSequence(rubiksCube, "F Y Y F' Y' Y' Z'");
}
