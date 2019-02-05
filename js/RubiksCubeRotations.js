function front(rubiksCube)
{
  rubiksCubeOldReference = createCubeFacesFromCube(rubiksCube);
  for(var i = 0; i < rubiksCube[0].length; i++)
  {
    var coordToRotate = ((2 - (i % 3)) * 3) + Math.floor(i / 3);
    setCubeFace(rubiksCube, 0, i, getCubeFace(rubiksCubeOldReference, 0, coordToRotate));
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
  front(rubiksCube);
  front(rubiksCube);
  front(rubiksCube);
}

function xAxis(rubiksCube)
{
  rubiksCubeOldReference = createCubeFacesFromCube(rubiksCube);
  setCubeFace(rubiksCube, 4, 0, getCubeFace(rubiksCubeOldReference, 0, 2));
  setCubeFace(rubiksCube, 4, 1, getCubeFace(rubiksCubeOldReference, 0, 1));
  setCubeFace(rubiksCube, 4, 2, getCubeFace(rubiksCubeOldReference, 0, 0));
  setCubeFace(rubiksCube, 4, 3, getCubeFace(rubiksCubeOldReference, 0, 5));
  setCubeFace(rubiksCube, 4, 4, getCubeFace(rubiksCubeOldReference, 0, 4));
  setCubeFace(rubiksCube, 4, 5, getCubeFace(rubiksCubeOldReference, 0, 3));
  setCubeFace(rubiksCube, 4, 6, getCubeFace(rubiksCubeOldReference, 0, 8));
  setCubeFace(rubiksCube, 4, 7, getCubeFace(rubiksCubeOldReference, 0, 7));
  setCubeFace(rubiksCube, 4, 8, getCubeFace(rubiksCubeOldReference, 0, 6));
  setCubeFace(rubiksCube, 0, 0, getCubeFace(rubiksCubeOldReference, 5, 0));
  setCubeFace(rubiksCube, 0, 1, getCubeFace(rubiksCubeOldReference, 5, 1));
  setCubeFace(rubiksCube, 0, 2, getCubeFace(rubiksCubeOldReference, 5, 2));
  setCubeFace(rubiksCube, 0, 3, getCubeFace(rubiksCubeOldReference, 5, 3));
  setCubeFace(rubiksCube, 0, 4, getCubeFace(rubiksCubeOldReference, 5, 4));
  setCubeFace(rubiksCube, 0, 5, getCubeFace(rubiksCubeOldReference, 5, 5));
  setCubeFace(rubiksCube, 0, 6, getCubeFace(rubiksCubeOldReference, 5, 6));
  setCubeFace(rubiksCube, 0, 7, getCubeFace(rubiksCubeOldReference, 5, 7));
  setCubeFace(rubiksCube, 0, 8, getCubeFace(rubiksCubeOldReference, 5, 8));

  setCubeFace(rubiksCube, 5, 0, getCubeFace(rubiksCubeOldReference, 2, 2));
  setCubeFace(rubiksCube, 5, 1, getCubeFace(rubiksCubeOldReference, 2, 1));
  setCubeFace(rubiksCube, 5, 2, getCubeFace(rubiksCubeOldReference, 2, 0));
  setCubeFace(rubiksCube, 5, 3, getCubeFace(rubiksCubeOldReference, 2, 5));
  setCubeFace(rubiksCube, 5, 4, getCubeFace(rubiksCubeOldReference, 2, 4));
  setCubeFace(rubiksCube, 5, 5, getCubeFace(rubiksCubeOldReference, 2, 3));
  setCubeFace(rubiksCube, 5, 6, getCubeFace(rubiksCubeOldReference, 2, 8));
  setCubeFace(rubiksCube, 5, 7, getCubeFace(rubiksCubeOldReference, 2, 7));
  setCubeFace(rubiksCube, 5, 8, getCubeFace(rubiksCubeOldReference, 2, 6));

  setCubeFace(rubiksCube, 2, 0, getCubeFace(rubiksCubeOldReference, 4, 0));
  setCubeFace(rubiksCube, 2, 1, getCubeFace(rubiksCubeOldReference, 4, 1));
  setCubeFace(rubiksCube, 2, 2, getCubeFace(rubiksCubeOldReference, 4, 2));
  setCubeFace(rubiksCube, 2, 3, getCubeFace(rubiksCubeOldReference, 4, 3));
  setCubeFace(rubiksCube, 2, 4, getCubeFace(rubiksCubeOldReference, 4, 4));
  setCubeFace(rubiksCube, 2, 5, getCubeFace(rubiksCubeOldReference, 4, 5));
  setCubeFace(rubiksCube, 2, 6, getCubeFace(rubiksCubeOldReference, 4, 6));
  setCubeFace(rubiksCube, 2, 7, getCubeFace(rubiksCubeOldReference, 4, 7));
  setCubeFace(rubiksCube, 2, 8, getCubeFace(rubiksCubeOldReference, 4, 8));
}

function xAxisPrime(rubiksCube)
{
  xAxis(rubiksCube);
  xAxis(rubiksCube);
  xAxis(rubiksCube);
}

function yAxis(rubiksCubeToTurn)
{

}

function yAxisPrime(rubiksCubeToTurn)
{

}

function zAxis(rubiksCubeToTurn)
{

}

function zAxisPrime(rubiksCubeToTurn)
{

}

function right(rubiksCubeToTurn)
{

}

function rightPrime(rubiksCubeToTurn)
{

}

function left(rubiksCubeToTurn)
{

}

function leftPrime(rubiksCubeToTurn)
{

}

function back(rubiksCubeToTurn)
{

}

function backPrime(rubiksCubeToTurn)
{

}

function up(rubiksCubeToTurn)
{

}

function upPrime(rubiksCubeToTurn)
{

}

function down(rubiksCubeToTurn)
{

}

function downPrime(rubiksCubeToTurn)
{

}

function middle(rubiksCubeToTurn)
{

}

function middlePrime(rubiksCubeToTurn)
{

}

function equator(rubiksCubeToTurn)
{

}

function equatorPrime(rubiksCubeToTurn)
{

}

function standing(rubiksCubeToTurn)
{

}

function standingPrime(rubiksCubeToTurn)
{

}
