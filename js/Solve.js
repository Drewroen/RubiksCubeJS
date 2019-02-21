function solve(rubiksCubeFaces)
{
  var unsolvedCube = createBasicCubeArray(rubiksCubeFaces);
  if(!validateCubeArray(unsolvedCube))
  {
    return "This is an invalid cube!";
  }
  
  return "L L' M M' R' R X' X U' U E E' D D' Y' Y F F' S S' B' B Z Z'";
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
