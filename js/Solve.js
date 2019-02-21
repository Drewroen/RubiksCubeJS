function solve(rubiksCubeFaces)
{
  var unsolvedCube = createBasicCubeArray(rubiksCubeFaces);
  if(!validateCubeArray(unsolvedCube))
  {
    return "This is an invalid cube!";
  }

  return "Here_are_some_moves_on_the_X_Axis. L L' M M' R' R X' X Here_are_some_moves_on_the_Y_Axis. U' U E E' D D' Y' Y Here_are_some_moves_on_the_Z_Axis. F F' S S' B' B Z Z'";
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
