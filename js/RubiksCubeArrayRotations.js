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
