var CORNER_UP_LEFT_BACK = 0;
var CORNER_UP_RIGHT_BACK = 1;
var CORNER_UP_LEFT_FRONT = 2;
var CORNER_UP_RIGHT_FRONT = 3;
var CORNER_DOWN_LEFT_BACK = 4;
var CORNER_DOWN_RIGHT_BACK = 5;
var CORNER_DOWN_LEFT_FRONT = 6;
var CORNER_DOWN_RIGHT_FRONT = 7;

function generateFirstLayerCorners(rubiksCubeFaces)
{
  const NUMBER_OF_CORNERS = 4; //A constant representing each of the four bottom corners
  const POSSIBLE_CORNER_ROTATIONS = 3; //A constant representing how many ways a corner can rotate
  const TOP_LAYER_COLOR = "4"; //A constant for the top layer color, which makes sure the piece belongs in the first layer
  //Algorithms used to bring the piece to the bottom right front corner
  const positionCornerAlgorithms = ["L' D2 L ", "R D2 R' D ", "L D L' ", "R' D' R D ", "D2 ", "D' ", "D ", ""];
  //Algorithms used to insert the piece from the bottom right corner to the top right corner
  const insertCornerAlgorithms = ["R' D2 R D R' D' R ", "F D F' ", "R' D' R "];
  var solution = ""; //Initializing the eventual solution for solving the first layer corners

  //Goes through each corner and inserts it into the correct position.
  for(var firstColor = 0; firstColor < NUMBER_OF_CORNERS; firstColor++)
  {
    var solutionPortion = ""; //The portion of the solution for the current corner being solved
    var secondColor = (firstColor + 1) % NUMBER_OF_CORNERS; //Used to create the corner value that is called later
    var expectedCorner = TOP_LAYER_COLOR + secondColor + firstColor; //Used for checking the location and rotation of the corner we're looking to solve

    //Looks at each corner to see if it is the piece that needs to be solved
    for(var cornerValue = CORNER_UP_LEFT_BACK; cornerValue <= CORNER_DOWN_RIGHT_FRONT; cornerValue++)
    {
      //If the corner in position "cornerValue" is the piece that needs to go in the top right front corner, use an algorithm to put the piece in the bottom right front corner
      if(getNormalizedCorner(rubiksCubeFaces, cornerValue) == expectedCorner)
      {
        solutionPortion += positionCornerAlgorithms[cornerValue];
      }
    }

    //Run this portion of the algorithm on the Rubik's Cube, add it to the final solution, and reset the solution portion
    performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
    solution += solutionPortion;
    solutionPortion = "";

    //Gets the value of the piece we just moved to the bottom right front corner
    var cornerToSolve = getCorner(rubiksCubeFaces, CORNER_DOWN_RIGHT_FRONT);

    //Go through each way the piece can be rotated
    for(var i = 0; i < POSSIBLE_CORNER_ROTATIONS; i++)
    {
      //String manipulation used to check how a corner is rotated
      var rotatedCornerToSolve = cornerToSolve.substring(i, POSSIBLE_CORNER_ROTATIONS) + cornerToMove.substring(0, i);

      //If this is the correct way the piece is rotated, use an algorithm to put the piece in the top right front corner and solve it
      if(rotatedCornerToSolve == expectedCorner)
      {
        solutionPortion += insertCornerAlgorithms[i];
      }
    }

    //Rotate the cube to prepare for solving the next corner, perform the portion of the solution, and add it to the final solution
    solutionPortion += "Y ";
    performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
    solution += solutionPortion;
  }

  //Flip the solved layer to the bottom to prepare for the next step of solving
  solution += "X2 ";
  performSolveAlgorithmSequence(rubiksCubeFaces, "X2");
  return solution;
}
