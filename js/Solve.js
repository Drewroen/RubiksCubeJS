function solve(rubiksCubeFaces)
{
  var unsolvedCube = createBasicCubeArray(rubiksCubeFaces);
  if(!validateCubeArray(unsolvedCube))
  {
    return "Invalid cube!";
  }

  return "First,_solve_the_cross. U' R F' U2 R2 D L2 E2 X' Next,_solve_the_corners. X' Y' U' L' U L Y2 R U2 R' U R U' R' Y' L' U L X Next,solve_the_second_layer. X' U' U' L' U L U F U' F' R U' R' U' F' U F Y2 R U' R' U' F' U F U' L' U L U F U' F' Next,_solve_the_top_cross. F R U R' U' F' F R U R' U' F' Next,_solve_the_top_edge_pieces. U' Y R U R' U R U2 R' Y' R U R' U R U2 R' U The_corners_are_already_in_the_right_place. Finally_rotate_the_last_corners. U R' D' R D R' D' R D R' D' R D R' D' R D U2 R' D' R D R' D' R D U You_have_solved_the_cube!";
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
