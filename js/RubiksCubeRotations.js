function front(rubiksCube)
{
  rubiksCubeOldReference = createCubeFacesFromCube(rubiksCube);
  for(var i = 0; i < rubiksCube[0].length; i++)
  {
    var coordToRotate = ((2 - (i % 3)) * 3) + Math.floor(i / 3);
    setCubeFace(rubiksCube, 0, i, getCubeFace(rubiksCubeOldReference, 0, coordToRotate));
  }
}

function frontPrime(rubiksCubeToTurn)
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

function xAxis(rubiksCubeToTurn)
{

}

function xAxisPrime(rubiksCubeToTurn)
{

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
