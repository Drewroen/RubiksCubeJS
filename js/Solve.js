function solve(rubiksCubeFaces)
{
  var unsolvedCube = createBasicCubeArray(rubiksCubeFaces);
  if(!validateCubeArray(unsolvedCube))
  {
    return "This is an invalid cube!";
  }

  return "F2";
}

function validateCubeArray(rubiksCubeArray)
{
  return true;
}

function createBasicCubeArray(rubiksCubeArray)
{
  return null;
}

function isSolved(rubiksCubeArray)
{
  return true;
}

function isNotation(str)
{
  console.log(str.length);
  return (str.length <= 2);
}

function splitUnderscores(str)
{
  var splitString = str.split("_");
  return splitString.join(" ");
}
