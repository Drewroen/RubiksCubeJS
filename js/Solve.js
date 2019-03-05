var CORNER_UP_LEFT_BACK = 0;
var CORNER_UP_RIGHT_BACK = 1;
var CORNER_UP_LEFT_FRONT = 2;
var CORNER_UP_RIGHT_FRONT = 3;
var CORNER_DOWN_LEFT_BACK = 4;
var CORNER_DOWN_RIGHT_BACK = 5;
var CORNER_DOWN_LEFT_FRONT = 6;
var CORNER_DOWN_RIGHT_FRONT = 7;

var SIDE_UP_FRONT = 0;
var SIDE_UP_RIGHT = 1;
var SIDE_UP_BACK = 2;
var SIDE_UP_LEFT = 3;
var SIDE_MIDDLE_LEFT_BACK = 4;
var SIDE_MIDDLE_RIGHT_BACK = 5;
var SIDE_MIDDLE_LEFT_FRONT = 6;
var SIDE_MIDDLE_RIGHT_FRONT = 7;
var SIDE_DOWN_FRONT = 8;
var SIDE_DOWN_RIGHT = 9;
var SIDE_DOWN_BACK = 10;
var SIDE_DOWN_LEFT = 11;

function solve(rubiksCubeFaces)
{
  /*
  Validating a solvable cube
    9 of each color                     DONE
    Centers are unique                  DONE

    Then, normalize the cube            DONE

    Every side is a correct piece
    Every corner is a correct piece     DONE

    Correct permutation
    Correct corner rotation
    Correct edge flip
  */
  var unsolvedCube = createBasicCubeArray(rubiksCubeFaces);
  printCube(normalizeCube(unsolvedCube));
  if(!validateNineStickers(unsolvedCube))
  {
    return "Error:_Not_9_of_each_color.";
  }
  if(!validateCenters(unsolvedCube))
  {
    return "Error:_Duplicate_centers.";
  }
  if(!checkAllCornersValid(unsolvedCube))
  {
    return "Error:_A_corner_is_invalid._Check_the_corner_pieces_to_make_sure_they_are_correct.";
  }
  if(!validateUniqueCorners(unsolvedCube))
  {
    return "Error:_A_corner_piece_is_included_twice._Check_the_corner_pieces_to_make_sure_they_are_correct.";
  }
  unsolvedCube = normalizeCube(unsolvedCube);
  printCube(unsolvedCube);
  return "Valid_cube.";
}

function normalizeCube(rubiksCubeArray)
{
  var newValues = [rubiksCubeArray[0][4], rubiksCubeArray[1][4], rubiksCubeArray[2][4], rubiksCubeArray[3][4], rubiksCubeArray[4][4], rubiksCubeArray[5][4]];
  for(var i = 0; i < 6; i++)
  {
    for(var j = 0; j < 9; j++)
    {
      switch(rubiksCubeArray[i][j])
      {
        case newValues[0]: rubiksCubeArray[i][j] = 0; break;
        case newValues[1]: rubiksCubeArray[i][j] = 1; break;
        case newValues[2]: rubiksCubeArray[i][j] = 2; break;
        case newValues[3]: rubiksCubeArray[i][j] = 3; break;
        case newValues[4]: rubiksCubeArray[i][j] = 4; break;
        case newValues[5]: rubiksCubeArray[i][j] = 5; break;
      }
    }
  }
  return rubiksCubeArray;
}

function validateNineStickers(rubiksCubeArray)
{
  var face1Count = 0;
  var face2Count = 0;
  var face3Count = 0;
  var face4Count = 0;
  var face5Count = 0;
  var face6Count = 0;
  for(var i = 0; i < rubiksCubeArray.length; i++)
  {
    for(var j = 0; j < rubiksCubeArray[i].length; j++)
    {
        switch(rubiksCubeArray[i][j])
        {
          case 0: face1Count++; break;
          case 1: face2Count++; break;
          case 2: face3Count++; break;
          case 3: face4Count++; break;
          case 4: face5Count++; break;
          case 5: face6Count++; break;
        }
    }
  }
  return face1Count == 9 && face2Count == 9 && face3Count == 9 && face4Count == 9 && face5Count == 9 && face6Count == 9;
}

function validateCenters(rubiksCubeArray)
{
  for(var i = 0; i < 6; i++)
  {
    for(var j = i + 1; j < 6; j++)
    {
      if(rubiksCubeArray[i][4] == rubiksCubeArray[j][4])
      {
        return false;
      }
    }
  }
  return true;
}

function createBasicCubeArray(rubiksCubeArray)
{
  var newCube = new Array(6);
  for (var i = 0; i < newCube.length; i++)
  {
    newCube[i] = new Array(9);
    for(var j = 0; j < newCube[i].length; j++)
    {
      if(equalColors(rubiksCubeArray[i][j].material.color, new THREE.Color(cubeColors.face1)))
      {
        newCube[i][j] = 0;
      }
      if(equalColors(rubiksCubeArray[i][j].material.color, new THREE.Color(cubeColors.face2)))
      {
        newCube[i][j] = 1;
      }
      if(equalColors(rubiksCubeArray[i][j].material.color, new THREE.Color(cubeColors.face3)))
      {
        newCube[i][j] = 2;
      }
      if(equalColors(rubiksCubeArray[i][j].material.color, new THREE.Color(cubeColors.face4)))
      {
        newCube[i][j] = 3;
      }
      if(equalColors(rubiksCubeArray[i][j].material.color, new THREE.Color(cubeColors.face5)))
      {
        newCube[i][j] = 4;
      }
      if(equalColors(rubiksCubeArray[i][j].material.color, new THREE.Color(cubeColors.face6)))
      {
        newCube[i][j] = 5;
      }
    }
  }
  return newCube;
}

function printCube(rubiksCubeArray)
{
  console.log("Rubiks Cube:")
  for(var i = 0; i < rubiksCubeArray.length; i++)
  {
    console.log(rubiksCubeArray[i]);
  }
  console.log(" ");
}

function isSolved(rubiksCubeArray)
{
  return true;
}

function isNotation(str)
{
  return (str.length <= 2);
}

function splitUnderscores(str)
{
  var splitString = str.split("_");
  return splitString.join(" ");
}

function equalColors(color1, color2)
{
  return color1.r == color2.r && color1.g == color2.g && color1.b == color2.b;
}

function checkExistingCorner(corner)
{
  var corners = ["410", "421", "432", "403", "501", "512", "523", "530"];
  for(var i = 0; i < 3; i++)
  {
    corner = corner.substr(1, 3) + corner.substr(0, 1);
    if (corners.includes(corner))
    {
      return true;
    }
  }
  return false;
}

function checkAllCornersValid(rubiksCubeFaces)
{
  for(var i = CORNER_UP_LEFT_BACK; i <= CORNER_DOWN_RIGHT_FRONT; i++)
  {
    if(!checkExistingCorner(getCorner(rubiksCubeFaces, i)))
    {
      return false;
    }
  }
  return true;
}

function getNormalizedCornerArray(rubiksCubeFaces)
{
  var corners = [];
  for(var i = CORNER_UP_LEFT_BACK; i <= CORNER_DOWN_RIGHT_FRONT; i++)
  {
    corners.push(normalizeCorner(getCorner(rubiksCubeFaces, i)));
  }
  return corners;
}

function validateUniqueCorners(rubiksCubeFaces)
{
  var corners = ["410", "421", "432", "403", "501", "512", "523", "530"];
  var cubeCorners = getNormalizedCornerArray(rubiksCubeFaces);
  return $(corners).not(cubeCorners).length === 0 && $(cubeCorners).not(corners).length === 0;
}

function normalizeCorner(corner)
{
  var corners = ["410", "421", "432", "403", "501", "512", "523", "530"];
  for(var i = 0; i < 3; i++)
  {
    corner = corner.substr(1, 3) + corner.substr(0, 1);
    if (corners.includes(corner))
    {
      return corner;
    }
  }
  return 0;
}

function getCorner(rubiksCubeFaces, cornerGlobal)
{
  var cornerArr = [];
  switch(cornerGlobal)
  {
    case CORNER_UP_RIGHT_FRONT: cornerArr = [rubiksCubeFaces[4][8], rubiksCubeFaces[1][8], rubiksCubeFaces[0][8]]; break;
    case CORNER_UP_RIGHT_BACK: cornerArr = [rubiksCubeFaces[4][6], rubiksCubeFaces[2][8], rubiksCubeFaces[1][6]]; break;
    case CORNER_UP_LEFT_FRONT: cornerArr = [rubiksCubeFaces[4][2], rubiksCubeFaces[0][2], rubiksCubeFaces[3][8]]; break;
    case CORNER_UP_LEFT_BACK: cornerArr = [rubiksCubeFaces[4][0], rubiksCubeFaces[3][6], rubiksCubeFaces[2][2]]; break;
    case CORNER_DOWN_RIGHT_FRONT: cornerArr = [rubiksCubeFaces[5][8], rubiksCubeFaces[0][6], rubiksCubeFaces[1][2]]; break;
    case CORNER_DOWN_RIGHT_BACK: cornerArr = [rubiksCubeFaces[5][6], rubiksCubeFaces[1][0], rubiksCubeFaces[2][6]]; break;
    case CORNER_DOWN_LEFT_FRONT: cornerArr = [rubiksCubeFaces[5][2], rubiksCubeFaces[3][2], rubiksCubeFaces[0][0]]; break;
    case CORNER_DOWN_LEFT_BACK: cornerArr = [rubiksCubeFaces[5][0], rubiksCubeFaces[2][0], rubiksCubeFaces[3][0]]; break;
  }
  return createPieceString(cornerArr);
}

function createPieceString(arr)
{
  var out = "";
  for(var i = 0; i < arr.length; i++)
  {
    out += arr[i];
  }
  return out;
}
