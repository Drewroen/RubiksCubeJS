function solve(rubiksCubeFaces)
{
  var solution = "";
  var unsolvedCube = createBasicCubeArray(rubiksCubeFaces);

  if(!validateNineStickers(unsolvedCube))
  {
    return "Error:_Not_9_of_each_color.";
  }

  if(!validateCenters(unsolvedCube))
  {
    return "Error:_Duplicate_centers.";
  }

  normalizeCube(unsolvedCube);

  if(!checkAllCornersValid(unsolvedCube))
  {
    return "Error:_A_corner_is_invalid._Check_the_corner_pieces_to_make_sure_they_are_correct.";
  }

  if(!validateUniqueCorners(unsolvedCube))
  {
    return "Error:_A_corner_piece_is_included_twice._Check_the_corner_pieces_to_make_sure_they_are_correct.";
  }

  if(!checkAllEdgesValid(unsolvedCube))
  {
    return "Error:_An_edge_is_invalid._Check_the_edge_pieces_to_make_sure_they_are_correct.";
  }

  if(!validateUniqueEdges(unsolvedCube))
  {
    return "Error:_An_edge_piece_is_included_twice._Check_the_edge_pieces_to_make_sure_they_are_correct.";
  }

  if(!validateCornerRotation(unsolvedCube))
  {
    return "Error:_A_corner_piece_is_rotated_incorrectly._Confirm_you_entered_the_pieces_correctly._If_you_did,_you_need_to_disassemble_your_cube_and_put_it_back_together.";
  }

  if(!validateEdgeRotation(unsolvedCube))
  {
    return "Error:_An_edge_piece_is_rotated_incorrectly._Confirm_you_entered_the_pieces_correctly._If_you_did,_you_need_to_disassemble_your_cube_and_put_it_back_together.";
  }

  if(!validatePermutation(unsolvedCube))
  {
    return "Error:_Pieces_of_the_cube_are_permutated_incorrectly._Confirm_you_entered_the_pieces_correctly._If_you_did,_you_need_to_disassemble_your_cube_and_put_it_back_together.";
  }
  var threeMoveSolution = checkForThreeMoveSequence(unsolvedCube)
  if(threeMoveSolution)
  {
    solution += threeMoveSolution;
    return solution;
  }

  var crossSolution = generateCross(unsolvedCube);
  solution += crossSolution;

  solution += "Now_we_solve_the_corners! ";
  var cornerSolution = generateFirstLayerCorners(unsolvedCube);
  solution += cornerSolution;

  solution += "Now_we_solve_the_second_layer! ";
  var secondLayerSolution = generateSecondLayer(unsolvedCube);
  solution += secondLayerSolution;

  normalizeCube(unsolvedCube);
  solution += "Now_we_solve_the_top_cross! ";
  var topCrossSolution = generateTopCross(unsolvedCube);
  solution += topCrossSolution;

  normalizeCube(unsolvedCube);
  solution += "Now_we_permutate_the_top_cross! ";
  var topCrossPermutationSolution = generateTopCrossPermutation(unsolvedCube);
  solution += topCrossPermutationSolution;

  solution += "Now_we_orientate_the_top_corners! ";
  var topCornerOrientationSolution = generateTopCornerOrientation(unsolvedCube);
  solution += topCornerOrientationSolution;

  normalizeCube(unsolvedCube);
  solution += "Finally,_we_permutate_the_final_corners! ";
  var topCornerPermutationSolution = generateTopCornerPermutation(unsolvedCube);
  solution += topCornerPermutationSolution;


  solution += "It_should_be_solved! ";

  console.log("Cross:" + crossSolution);
  console.log("Corners:" + cornerSolution);
  console.log("Layer 2:" + secondLayerSolution);
  console.log("Top cross:" + topCrossSolution);
  console.log("Top cross perm:" + topCrossPermutationSolution);
  console.log("Top corner orient:" + topCornerOrientationSolution);
  console.log("Top corner perm:" + topCornerPermutationSolution);
  return solution;
}

function generateCross(rubiksCubeFaces)
{
  var solution = "Step_1:_The_first_layer_cross O-EDGE_UP_FRONT*O-EDGE_UP_LEFT*O-EDGE_UP_RIGHT*O-EDGE_UP_BACK*We_need_to_solve_these_four_pieces_first._This_is_known_as_the_first_layer_cross._We_will_focus_on_one_piece_at_a_time. ";
  for(var i = 0; i < 4; i++)
  {
    var solutionPortion = "";
    var explanationPortion = "O-EDGE_UP_FRONT*We_need_to_move_the_piece_highlighted_red_to_the_position_highlighted_in_green. ";
    if(getEdge(rubiksCubeFaces, EDGE_UP_BACK) == "4" + i)
    {
      solutionPortion += "I-EDGE_UP_BACK*" + explanationPortion + "B2 D2 F2 ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_UP_BACK) == i + "4")
    {
      solutionPortion += "I-EDGE_UP_BACK*" + explanationPortion + "B E F E' ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_UP_LEFT) == "4" + i)
    {
      solutionPortion += "I-EDGE_UP_LEFT*" + explanationPortion + "L2 D F2 ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_UP_LEFT) == i + "4")
    {
      solutionPortion += "I-EDGE_UP_LEFT*" + explanationPortion + "L F ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_UP_RIGHT) == "4" + i)
    {
      solutionPortion += "I-EDGE_UP_RIGHT*" + explanationPortion + "R2 D' F2 ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_UP_RIGHT) == i + "4")
    {
      solutionPortion += "I-EDGE_UP_RIGHT*" + explanationPortion + "R' F' ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_UP_FRONT) == "4" + i)
    {
      solutionPortion += "O-EDGE_UP_FRONT*" + "This_piece_is_already_in_the_correct_position. ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_UP_FRONT) == i + "4")
    {
      solutionPortion += "I-EDGE_UP_FRONT*" + "This_piece_is_in_the_right_position,_but_we_need_to_flip_it. " + "F E' F E ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_MIDDLE_LEFT_BACK) == "4" + i)
    {
      solutionPortion += "I-EDGE_MIDDLE_LEFT_BACK*" + explanationPortion + "E F E' ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_MIDDLE_LEFT_BACK) == i + "4")
    {
      solutionPortion += "I-EDGE_MIDDLE_LEFT_BACK*" + explanationPortion + "E2 F' E2 ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_MIDDLE_RIGHT_BACK) == "4" + i)
    {
      solutionPortion += "I-EDGE_MIDDLE_RIGHT_BACK*" + explanationPortion + "E' F' E ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_MIDDLE_RIGHT_BACK) == i + "4")
    {
      solutionPortion += "I-EDGE_MIDDLE_RIGHT_BACK*" + explanationPortion + "E2 F E2 ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_MIDDLE_LEFT_FRONT) == "4" + i)
    {
      solutionPortion += "I-EDGE_MIDDLE_LEFT_FRONT*" + explanationPortion + "E F' E' ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_MIDDLE_LEFT_FRONT) == i + "4")
    {
      solutionPortion += "I-EDGE_MIDDLE_LEFT_FRONT*" + explanationPortion + "F ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_MIDDLE_RIGHT_FRONT) == "4" + i)
    {
      solutionPortion += "I-EDGE_MIDDLE_RIGHT_FRONT*" + explanationPortion + "E' F E ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_MIDDLE_RIGHT_FRONT) == i + "4")
    {
      solutionPortion += "I-EDGE_MIDDLE_RIGHT_FRONT*" + explanationPortion + "F' ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_DOWN_BACK) == "4" + i)
    {
      solutionPortion += "I-EDGE_DOWN_BACK*" + explanationPortion + "D2 F2 ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_DOWN_BACK) == i + "4")
    {
      solutionPortion += "I-EDGE_DOWN_BACK*" + explanationPortion + "D2 F E F' E' ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_DOWN_LEFT) == "4" + i)
    {
      solutionPortion += "I-EDGE_DOWN_LEFT*" + explanationPortion + "D F2 ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_DOWN_LEFT) == i + "4")
    {
      solutionPortion += "I-EDGE_DOWN_LEFT*" + explanationPortion + "D F E F' E' ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_DOWN_RIGHT) == "4" + i)
    {
      solutionPortion += "I-EDGE_DOWN_RIGHT*" + explanationPortion + "D' F2 ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_DOWN_RIGHT) == i + "4")
    {
      solutionPortion += "I-EDGE_DOWN_RIGHT*" + explanationPortion + "D' F E F' E' ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_DOWN_FRONT) == "4" + i)
    {
      solutionPortion += "I-EDGE_DOWN_FRONT*" + explanationPortion + "F2 ";
    }
    if(getEdge(rubiksCubeFaces, EDGE_DOWN_FRONT) == i + "4")
    {
      solutionPortion += "I-EDGE_DOWN_FRONT*" + explanationPortion + "F E F' E' ";
    }
    solutionPortion += "Y ";
    performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
    solution += solutionPortion;
  }
  return solution;
}

function generateFirstLayerCorners(rubiksCubeFaces)
{
  const NUMBER_OF_CORNERS = 4;
  const POSSIBLE_CORNER_ROTATIONS = 3;
  const TOP_LAYER_COLOR = "4";
  const positionCornerAlgorithms = ["L' D2 L ", "R D2 R' D ", "L D L' ", "R' D' R D ", "D2 ", "D' ", "D ", ""];
  const insertCornerAlgorithms = ["R' D2 R D R' D' R ", "F D F' ", "R' D' R "];
  var explanationPortion = "O-CORNER_UP_RIGHT_FRONT*We_need_to_move_the_piece_highlighted_red_to_the_top_right_front_corner. ";

  var solution = "Step_2:_The_first_layer_corners O-CORNER_UP_LEFT_BACK*O-CORNER_UP_RIGHT_BACK*O-CORNER_UP_LEFT_FRONT*O-CORNER_UP_RIGHT_FRONT*Next,_we_need_to_solve_the_corners_of_the_first_layer._Keep_in_mind_the_colors_of_the_corners_must_match_on_all_sides._We_will_focus_on_one_piece_at_a_time. ";


  for(var firstColor = 0; firstColor < NUMBER_OF_CORNERS; firstColor++)
  {
    var solutionPortion = "";
    var secondColor = (firstColor + 1) % NUMBER_OF_CORNERS;
    for(var cornerValue = CORNER_UP_LEFT_BACK; cornerValue <= CORNER_DOWN_RIGHT_FRONT; cornerValue++)
    {
      if(normalizeCorner(getCorner(rubiksCubeFaces, cornerValue)) == TOP_LAYER_COLOR + secondColor + firstColor)
      {
        switch(cornerValue)
        {
          case(CORNER_UP_LEFT_BACK): solutionPortion += "I-CORNER_UP_LEFT_BACK*"; break;
          case(CORNER_UP_RIGHT_BACK): solutionPortion += "I-CORNER_UP_RIGHT_BACK*"; break;
          case(CORNER_UP_LEFT_FRONT): solutionPortion += "I-CORNER_UP_LEFT_FRONT*"; break;
          case(CORNER_DOWN_LEFT_BACK): solutionPortion += "I-CORNER_DOWN_LEFT_BACK*"; break;
          case(CORNER_DOWN_RIGHT_BACK): solutionPortion += "I-CORNER_DOWN_RIGHT_BACK*"; break;
          case(CORNER_DOWN_LEFT_FRONT): solutionPortion += "I-CORNER_DOWN_LEFT_FRONT*"; break;
          case(CORNER_DOWN_RIGHT_FRONT): solutionPortion += "I-CORNER_DOWN_RIGHT_FRONT*"; break;
        }
        if(cornerValue == CORNER_UP_RIGHT_FRONT && getCorner(rubiksCubeFaces, cornerValue) == TOP_LAYER_COLOR + secondColor + firstColor)
        {
          solutionPortion += "O-CORNER_UP_RIGHT_FRONT*This_corner_is_already_in_the_correct_position. ";
        }
        else if(cornerValue == CORNER_UP_RIGHT_FRONT)
        {
          solutionPortion += "O-CORNER_UP_RIGHT_FRONT*This_corner_is_in_the_right_position,_but_it_is_rotated_the_wrong_way._We_need_to_rotate_it_correctly. " + positionCornerAlgorithms[cornerValue];
        }
        else
        {
          solutionPortion += explanationPortion + positionCornerAlgorithms[cornerValue];
        }
      }
    }
    performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
    solution += solutionPortion;
    solutionPortion = "";

    var corner = getCorner(rubiksCubeFaces, CORNER_DOWN_RIGHT_FRONT);
    for(var i = 0; i < POSSIBLE_CORNER_ROTATIONS; i++)
    {
      if(corner.substring(i, POSSIBLE_CORNER_ROTATIONS) + corner.substring(0, i) == TOP_LAYER_COLOR + secondColor + firstColor)
      {
        solutionPortion += insertCornerAlgorithms[i];
      }
    }
    solutionPortion += "Y ";
    performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
    solution += solutionPortion;
  }

  solution += "X2 ";
  performSolveAlgorithmSequence(rubiksCubeFaces, "X2");
  return solution;
}

function generateSecondLayer(rubiksCubeFaces)
{
  var algorithmLeftInsert = "U' L' U L U F U' F' ";
  var algorithmRightInsert = "U R U' R' U' F' U F ";
  var solution = "";
  for(var i = 0; i < 4; i++)
  {
    var solutionPortion = "";
    var j = (i + 1) % 4;
    var edgePiece = ((5 - i) % 4) + "" + ((6 - i) % 4);
    var edgePieceReversed = ((6 - i) % 4) + "" + ((5 - i) % 4);

    if(normalizeEdge(getEdge(rubiksCubeFaces, EDGE_MIDDLE_LEFT_FRONT)) == edgePiece)
    {
      solutionPortion += algorithmLeftInsert;
    }
    if(normalizeEdge(getEdge(rubiksCubeFaces, EDGE_MIDDLE_LEFT_BACK)) == edgePiece)
    {
      solutionPortion += "Y' ";
      solutionPortion += algorithmLeftInsert;
      solutionPortion += "Y ";
    }
    if(normalizeEdge(getEdge(rubiksCubeFaces, EDGE_MIDDLE_RIGHT_BACK)) == edgePiece)
    {
      solutionPortion += "Y ";
      solutionPortion += algorithmRightInsert;
      solutionPortion += "Y' ";
    }
    if(normalizeEdge(getEdge(rubiksCubeFaces, EDGE_MIDDLE_RIGHT_FRONT)) == edgePiece)
    {
      if(getEdge(rubiksCubeFaces, EDGE_MIDDLE_RIGHT_FRONT) != edgePieceReversed)
      {
        solutionPortion += algorithmRightInsert;
        solutionPortion += "U2 ";
        solutionPortion += algorithmRightInsert;
      }
    }
    performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
    solution += solutionPortion;
    solutionPortion = "";

    if(normalizeEdge(getEdge(rubiksCubeFaces, EDGE_UP_FRONT)) == edgePiece)
    {
      if(getEdge(rubiksCubeFaces, EDGE_UP_FRONT) != edgePiece)
      {
        solutionPortion += "Y U' ";
        solutionPortion += algorithmLeftInsert;
        solutionPortion += "Y' ";
      }
      else
      {
        solutionPortion += algorithmRightInsert;
      }
    }
    if(normalizeEdge(getEdge(rubiksCubeFaces, EDGE_UP_RIGHT)) == edgePiece)
    {
      if(getEdge(rubiksCubeFaces, EDGE_UP_RIGHT) != edgePiece)
      {
        solutionPortion += "Y ";
        solutionPortion += algorithmLeftInsert;
        solutionPortion += "Y' ";
      }
      else
      {
        solutionPortion += "U ";
        solutionPortion += algorithmRightInsert;
      }
    }
    if(normalizeEdge(getEdge(rubiksCubeFaces, EDGE_UP_BACK)) == edgePiece)
    {
      if(getEdge(rubiksCubeFaces, EDGE_UP_BACK) != edgePiece)
      {
        solutionPortion += "Y U ";
        solutionPortion += algorithmLeftInsert;
        solutionPortion += "Y' ";
      }
      else
      {
        solutionPortion += "U2 ";
        solutionPortion += algorithmRightInsert;
      }
    }
    if(normalizeEdge(getEdge(rubiksCubeFaces, EDGE_UP_LEFT)) == edgePiece)
    {
      if(getEdge(rubiksCubeFaces, EDGE_UP_LEFT) != edgePiece)
      {
        solutionPortion += "Y U2 ";
        solutionPortion += algorithmLeftInsert;
        solutionPortion += "Y' ";
      }
      else
      {
        solutionPortion += "U' ";
        solutionPortion += algorithmRightInsert;
      }
    }
    solutionPortion += "Y ";
    performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
    solution += solutionPortion;
  }
  return solution;
}

function generateTopCross(rubiksCubeFaces)
{
  var solution = "";
  if(checkForTopCross(rubiksCubeFaces))
  {
    return "The_top_cross_is_already_solved. ";
  }
  else if (checkForTopNone(rubiksCubeFaces))
  {
    solution += "F R U R' U' F' Y2 F R U R' U' F' F R U R' U' F' ";
  }
  else if (checkForTopL(rubiksCubeFaces))
  {
    switch(checkForTopL(rubiksCubeFaces))
    {
      case 1: break;
      case 2: solution += "Y "; break;
      case 3: solution += "Y2 "; break;
      case 4: solution += "Y' "; break;
    }
    solution += "F R U R' U' F' F R U R' U' F' ";
  }
  else if (checkForTopLine(rubiksCubeFaces))
  {
    switch(checkForTopLine(rubiksCubeFaces))
    {
      case 1: break;
      case 2: solution += "Y "; break;
    }
    solution += "F R U R' U' F' ";
  }
  performSolveAlgorithmSequence(rubiksCubeFaces, solution);

  return solution;
}

function checkForTopCross(rubiksCubeFaces)
{
  return rubiksCubeFaces[4][1] == 4 && rubiksCubeFaces[4][3] == 4 && rubiksCubeFaces[4][5] == 4 && rubiksCubeFaces[4][7] == 4;
}

function checkForTopNone(rubiksCubeFaces)
{
  return rubiksCubeFaces[4][1] != 4 && rubiksCubeFaces[4][3] != 4 && rubiksCubeFaces[4][5] != 4 && rubiksCubeFaces[4][7] != 4;
}

function checkForTopL(rubiksCubeFaces)
{
  if(rubiksCubeFaces[4][1] == 4 && rubiksCubeFaces[4][3] == 4)
  {
    return 1;
  }
  else if (rubiksCubeFaces[4][1] == 4 && rubiksCubeFaces[4][5] == 4)
  {
    return 2;
  }
  else if (rubiksCubeFaces[4][5] == 4 && rubiksCubeFaces[4][7] == 4)
  {
    return 3;
  }
  else if (rubiksCubeFaces[4][3] == 4 && rubiksCubeFaces[4][7] == 4)
  {
    return 4;
  }
  return 0;
}

function checkForTopLine(rubiksCubeFaces)
{
  if(rubiksCubeFaces[4][1] == 4 && rubiksCubeFaces[4][7] == 4)
  {
    return 1;
  }
  else if (rubiksCubeFaces[4][3] == 4 && rubiksCubeFaces[4][5] == 4)
  {
    return 2;
  }
  return 0;
}

function generateTopCrossPermutation(rubiksCubeFaces)
{
  var solution = "";
  var solutionPortion = "";
  var rotation = getTopCrossTurn(rubiksCubeFaces);
  switch(rotation)
  {
    case(1): solutionPortion += "U "; break;
    case(2): solutionPortion += "U2 "; break;
    case(3): solutionPortion += "U' "; break;
  }

  performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
  solution += solutionPortion;
  solutionPortion = "";
  switch(getTopPermutationType(rubiksCubeFaces))
  {
    case(1): solutionPortion += generateTopPermutationNotAdjacent(rubiksCubeFaces); break;
    case(2): solutionPortion += generateTopPermutationAdjacent(rubiksCubeFaces); break;
  }

  performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
  solution += solutionPortion;

  if(solution == "")
  {
    solution += "The_top_cross_edges_are_already_solved. ";
  }
  return solution;
}

function generateTopPermutationAdjacent(rubiksCubeFaces)
{
  var permutation = rubiksCubeFaces[0][5] + "" + rubiksCubeFaces[1][7] + "" + rubiksCubeFaces[2][5] + "" + rubiksCubeFaces[3][7];
  switch(permutation)
  {
    case("0132"): return "Y' R U R' U R U2 R' U Y "; break;
    case("3120"): return "R U R' U R U2 R' U "; break;
    case("1023"): return "Y R U R' U R U2 R' U Y' "; break;
    case("0213"): return "Y2 R U R' U R U2 R' U Y2 "; break;
  }
}

function generateTopPermutationNotAdjacent(rubiksCubeFaces)
{
  var permutation = rubiksCubeFaces[0][5] + "" + rubiksCubeFaces[1][7] + "" + rubiksCubeFaces[2][5] + "" + rubiksCubeFaces[3][7];
  if(permutation == "0321")
  {
    return "R U R' U R U2 R' U U' Y' R U R' U R U2 R' U Y ";
  }
  else
  {
    return "Y R U R' U R U2 R' U U' Y' R U R' U R U2 R' U ";
  }
}

function getTopCrossTurn(rubiksCubeFaces)
{
  var permutation = rubiksCubeFaces[0][5] + "" + rubiksCubeFaces[1][7] + "" + rubiksCubeFaces[2][5] + "" + rubiksCubeFaces[3][7];
  for(var i = 0; i < 4; i++)
  {
    if(compareTopPermutations(permutation, "0123"))
    {
      return i;
    }
    permutation = permutation.substring(1, 4) + permutation.substring(0, 1);
  }
  return -1;
}

function compareTopPermutations(perm1, perm2)
{
  var count = 0;
  perm1Arr = perm1.split('');
  perm2Arr = perm2.split('');
  for(var i = 0; i < perm1Arr.length; i++)
  {
    if(perm1Arr[i] == perm2Arr[i])
    {
      count++;
    }
  }
  return count >= 2;
}

function getTopPermutationType(rubiksCubeFaces)
{
  var permutation = rubiksCubeFaces[0][5] + "" + rubiksCubeFaces[1][7] + "" + rubiksCubeFaces[2][5] + "" + rubiksCubeFaces[3][7];
  if(permutation == "0123")
  {
    return 0;
  }
  else if (permutation == "0321" || permutation == "2103")
  {
    return 1;
  }
  else
  {
    return 2;
  }
}

function generateTopCornerOrientation(rubiksCubeFaces)
{
  var solution = "";
  var solutionPortion = "";
  if(countCorrectCorners(rubiksCubeFaces) == 0)
  {
    solutionPortion += "U R U' L' U R' U' L ";
    performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
    solution += solutionPortion;
    solutionPortion = "";
  }
  if(countCorrectCorners(rubiksCubeFaces) == 1)
  {
    var correctCorner = findCorrectTopCorner(rubiksCubeFaces);
    switch(correctCorner)
    {
      case(0): solutionPortion += "Y2 "; break;
      case(1): solutionPortion += "Y "; break;
      case(2): solutionPortion += "Y' "; break;
    }
    solutionPortion += "U R U' L' U R' U' L ";
    performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
    solution += solutionPortion;
    solutionPortion = "";
    normalizeCube(rubiksCubeFaces);
    if(countCorrectCorners(rubiksCubeFaces) == 1)
    {
      solutionPortion += "U R U' L' U R' U' L ";
      performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
      solution += solutionPortion;
      solutionPortion = "";
    }
  }

  if(!solution)
  {
    solution += "The_corners_are_already_orientated. ";
  }
  return solution;
}

function countCorrectCorners(rubiksCubeFaces)
{
  var count = 0;
  var corners = ["432", "421", "403", "410"];
  for(var i = CORNER_UP_LEFT_BACK; i <= CORNER_UP_RIGHT_FRONT; i++)
  {
    if(normalizeCorner(getCorner(rubiksCubeFaces, i)) == corners[i])
    {
      count++;
    }
  }
  return count;
}

function findCorrectTopCorner(rubiksCubeFaces)
{
  var corners = ["432", "421", "403", "410"];
  for(var i = CORNER_UP_LEFT_BACK; i <= CORNER_UP_RIGHT_FRONT; i++)
  {
    if(normalizeCorner(getCorner(rubiksCubeFaces, i)) == corners[i])
    {
      return i;
    }
  }
}

function generateTopCornerPermutation(rubiksCubeFaces)
{
  var solution = "";
  var solutionPortion = "";
  for(var i = 0; i < 4; i++)
  {
    for(var j = 0; j < getCornerRotation(getCorner(rubiksCubeFaces, CORNER_UP_RIGHT_FRONT)); j++)
    {
      solutionPortion += "R' D' R D ";
    }
    solutionPortion += "U ";
    performSolveAlgorithmSequence(rubiksCubeFaces, solutionPortion);
    solution += solutionPortion;
    solutionPortion = "";
  }

  return solution;
}

function getCornerRotation(corner)
{
  if(corner.substring(0, 1) == "4")
  {
    return 0;
  }
  else if(corner.substring(1, 2) == "4")
  {
    return 2;
  }
  else if(corner.substring(2, 3) == "4")
  {
    return 4;
  }
}

function checkForThreeMoveSequence(unsolvedCube)
{
  var unsolvedCubeTest;
  var moves = ["F", "F'", "R", "R'", "L", "L'","B","B'","U","U'","D","D'","E","E'","M","M'","S","S'", "F2","R2","L2","B2","U2","D2","E2","M2","S2"];
  var solution = "";

  if(solved(unsolvedCube))
  {
    return "This_cube_is_already_solved!_Congratulations! ";
  }

  for(var i = 0; i < moves.length; i++)
  {
    unsolvedCubeTest = copyCubeArray(unsolvedCube);
    performSolveAlgorithmSequence(unsolvedCubeTest, moves[i]);
    if(solved(unsolvedCubeTest))
    {
      solution += "This_cube_is_one_move_away. ";
      solution += moves[i] + " ";
      return solution;
    }
  }

  for(var i = 0; i < moves.length; i++)
  {
    for(var j = 0; j < moves.length; j++)
    {
      unsolvedCubeTest = copyCubeArray(unsolvedCube);
      performSolveAlgorithmSequence(unsolvedCubeTest, moves[i] + " " + moves[j]);
      if(solved(unsolvedCubeTest))
      {
        solution += "This_cube_is_two_moves_away. ";
        solution += moves[i] + " " + moves[j] + " ";
        return solution;
      }
    }
  }

  for(var i = 0; i < moves.length; i++)
  {
    for(var j = 0; j < moves.length; j++)
    {
      for(var k = 0; k < moves.length; k++)
      {
        unsolvedCubeTest = copyCubeArray(unsolvedCube);
        performSolveAlgorithmSequence(unsolvedCubeTest, moves[i] + " " + moves[j] + " " + moves[k]);
        if(solved(unsolvedCubeTest))
        {
          solution += "This_cube_is_three_moves_away. ";
          solution += moves[i] + " " + moves[j] + " " + moves[k] + " ";
          return solution;
        }
      }
    }
  }
  return solution;
}

function solved(rubiksCubeArray)
{
  for(var i = 0; i < 6; i++)
  {
    for(var j = 0; j < 9; j++)
    {
      if(rubiksCubeArray[i][0] != rubiksCubeArray[i][j])
      {
        return false;
      }
    }
  }
  return true;
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

function checkExistingEdge(edge)
{
  var edges = ["40", "41", "42", "43", "01", "12", "23", "30", "50", "51", "52", "53"];
  for(var i = 0; i < 2; i++)
  {
    edge = edge.substr(1, 2) + edge.substr(0, 1);
    if (edges.includes(edge))
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

function checkAllEdgesValid(rubiksCubeFaces)
{
  for(var i = EDGE_UP_FRONT; i <= EDGE_DOWN_LEFT; i++)
  {
    if(!checkExistingEdge(getEdge(rubiksCubeFaces, i)))
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
    corners.push((normalizeCorner(getCorner(rubiksCubeFaces, i))));
  }
  return corners;
}

function getNormalizedEdgeArray(rubiksCubeFaces)
{
  var edges = [];
  for(var i = EDGE_UP_FRONT; i <= EDGE_DOWN_LEFT; i++)
  {
    edges.push(normalizeEdge(getEdge(rubiksCubeFaces, i)));
  }
  return edges;
}

function validateUniqueCorners(rubiksCubeFaces)
{
  var corners = ["410", "421", "432", "403", "501", "512", "523", "530"];
  var cubeCorners = getNormalizedCornerArray(rubiksCubeFaces);
  return $(corners).not(cubeCorners).length === 0 && $(cubeCorners).not(corners).length === 0;
}

function validateUniqueEdges(rubiksCubeFaces)
{
  var edges = ["40", "41", "42", "43", "01", "12", "23", "30", "50", "51", "52", "53"];
  var cubeEdges = getNormalizedEdgeArray(rubiksCubeFaces);
  return $(edges).not(cubeEdges).length === 0 && $(cubeEdges).not(edges).length === 0;
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

function normalizeEdge(edge)
{
  var edges = ["40", "41", "42", "43", "01", "12", "23", "30", "50", "51", "52", "53"];
  for(var i = 0; i < 2; i++)
  {
    edge = edge.substr(1, 2) + edge.substr(0, 1);
    if (edges.includes(edge))
    {
      return edge;
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

function getEdge(rubiksCubeFaces, edgeGlobal)
{
  var edgeArr = [];
  switch(edgeGlobal)
  {
    case EDGE_UP_FRONT: edgeArr = [rubiksCubeFaces[4][5], rubiksCubeFaces[0][5]]; break;
    case EDGE_UP_RIGHT: edgeArr = [rubiksCubeFaces[4][7], rubiksCubeFaces[1][7]]; break;
    case EDGE_UP_BACK: edgeArr = [rubiksCubeFaces[4][3], rubiksCubeFaces[2][5]]; break;
    case EDGE_UP_LEFT: edgeArr = [rubiksCubeFaces[4][1], rubiksCubeFaces[3][7]]; break;
    case EDGE_MIDDLE_LEFT_BACK: edgeArr = [rubiksCubeFaces[2][1], rubiksCubeFaces[3][3]]; break;
    case EDGE_MIDDLE_RIGHT_BACK: edgeArr = [rubiksCubeFaces[2][7], rubiksCubeFaces[1][3]]; break;
    case EDGE_MIDDLE_LEFT_FRONT: edgeArr = [rubiksCubeFaces[0][1], rubiksCubeFaces[3][5]]; break;
    case EDGE_MIDDLE_RIGHT_FRONT: edgeArr = [rubiksCubeFaces[0][7], rubiksCubeFaces[1][5]]; break;
    case EDGE_DOWN_FRONT: edgeArr = [rubiksCubeFaces[5][5], rubiksCubeFaces[0][3]]; break;
    case EDGE_DOWN_RIGHT: edgeArr = [rubiksCubeFaces[5][7], rubiksCubeFaces[1][1]]; break;
    case EDGE_DOWN_BACK: edgeArr = [rubiksCubeFaces[5][3], rubiksCubeFaces[2][3]]; break;
    case EDGE_DOWN_LEFT: edgeArr = [rubiksCubeFaces[5][1], rubiksCubeFaces[3][1]]; break;
  }
  return createPieceString(edgeArr);
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

function validateCornerRotation(rubiksCubeArray)
{
  var rotationCount = 0;
  var corners = ["410", "421", "432", "403", "501", "512", "523", "530"];
  for(var i = CORNER_UP_LEFT_BACK; i <= CORNER_DOWN_RIGHT_FRONT; i++)
  {
    var corner = getCorner(rubiksCubeArray, i);
    for(var j = 1; j <= 3; j++)
    {
      corner = corner.substr(1, 3) + corner.substr(0, 1);
      if (corners.includes(corner))
      {
        rotationCount += j;
      }
    }
  }
  return rotationCount % 3 == 0;
}

function validateEdgeRotation(rubiksCubeArray)
{
  var rotationCount = 0;
  var edges = ["40", "41", "42", "43", "01", "12", "23", "30", "50", "51", "52", "53"];
  for(var i = EDGE_UP_FRONT; i <= EDGE_UP_LEFT; i++)
  {
    var edge = getEdge(rubiksCubeArray, i);
    var edgePart1 = edge.substring(0, 1);
    var edgePart2 = edge.substring(1, 2);
    if(edgePart2 == "4" || edgePart2 == "5")
    {
      rotationCount++;
    }
    else if(edgePart1 != "4" && edgePart1 != "5")
    {
      if(edgePart2 == "0" || edgePart2 == "2")
      {
        rotationCount++;
      }
    }
  }

  for(var i = EDGE_MIDDLE_LEFT_BACK; i <= EDGE_MIDDLE_RIGHT_FRONT; i++)
  {
    var edge = getEdge(rubiksCubeArray, i);
    var edgePart1 = edge.substring(0, 1);
    var edgePart2 = edge.substring(1, 2);
    if(edgePart2 == "4" || edgePart2 == "5")
    {
      rotationCount++;
    }
    else if(edgePart1 != "4" && edgePart1 != "5")
    {
      if(edgePart2 == "0" || edgePart2 == "2")
      {
        rotationCount++;
      }
    }
  }

  for(var i = EDGE_DOWN_FRONT; i <= EDGE_DOWN_LEFT; i++)
  {
    var edge = getEdge(rubiksCubeArray, i);
    var edgePart1 = edge.substring(0, 1);
    var edgePart2 = edge.substring(1, 2);
    if(edgePart2 == "4" || edgePart2 == "5")
    {
      rotationCount++;
    }
    else if(edgePart1 != "4" && edgePart1 != "5")
    {
      if(edgePart2 == "0" || edgePart2 == "2")
      {
        rotationCount++;
      }
    }
  }

  return rotationCount % 2 == 0;
}

function validatePermutation(rubiksCubeArray)
{
  var edges = generateEdgeSwapArray(rubiksCubeArray);
  var corners = generateCornerSwapArray(rubiksCubeArray);
  var swaps = countSwaps(edges) + countSwaps(corners);
  return swaps % 2 == 0;
}

function countSwaps(arr)
{
  var length = arr.length;
  var swaps = 0;
  for (var i = 0; i < length; i++)
  {
    for (var j = 0; j < length - i - 1; j++)
    {
      if(arr[j] > arr[j+1])
      {
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
        swaps++;
      }
    }
  }
  return swaps;
}

function generateEdgeSwapArray(rubiksCubeArray)
{
  var edgeOrder = [EDGE_UP_FRONT, EDGE_MIDDLE_LEFT_FRONT, EDGE_DOWN_LEFT, EDGE_DOWN_BACK, EDGE_MIDDLE_LEFT_BACK, EDGE_UP_LEFT, EDGE_UP_BACK, EDGE_MIDDLE_RIGHT_BACK, EDGE_DOWN_RIGHT, EDGE_DOWN_FRONT, EDGE_MIDDLE_RIGHT_FRONT, EDGE_UP_RIGHT];
  var edgeSwapCountArray = [];
  for (var i = 0; i < edgeOrder.length; i++)
  {
    edgeSwapCountArray.push(convertEdgeToPermutationValue(normalizeEdge(getEdge(rubiksCubeArray, edgeOrder[i]))));
  }
  return edgeSwapCountArray;
}

function generateCornerSwapArray(rubiksCubeArray)
{
  var cornerOrder = [CORNER_UP_RIGHT_FRONT, CORNER_UP_RIGHT_BACK, CORNER_UP_LEFT_BACK, CORNER_UP_LEFT_FRONT, CORNER_DOWN_LEFT_FRONT, CORNER_DOWN_LEFT_BACK, CORNER_DOWN_RIGHT_BACK, CORNER_DOWN_RIGHT_FRONT];
  var cornerSwapCountArray = [];
  for (var i = 0; i < cornerOrder.length; i++)
  {
    cornerSwapCountArray.push(convertCornerToPermutationValue(normalizeCorner(getCorner(rubiksCubeArray, cornerOrder[i]))));
  }
  return cornerSwapCountArray
}

function convertEdgeToPermutationValue(val)
{
  switch(val)
  {
    case "40": return 0; break;
    case "30": return 1; break;
    case "53": return 2; break;
    case "52": return 3; break;
    case "23": return 4; break;
    case "43": return 5; break;
    case "42": return 6; break;
    case "12": return 7; break;
    case "51": return 8; break;
    case "50": return 9; break;
    case "01": return 10; break;
    case "41": return 11; break;
  }
}

function convertCornerToPermutationValue(val)
{
  switch(val)
  {
    case "410": return 0; break;
    case "421": return 1; break;
    case "432": return 2; break;
    case "403": return 3; break;
    case "530": return 4; break;
    case "523": return 5; break;
    case "512": return 6; break;
    case "501": return 7; break;
  }
}

function copyCubeArray(rubiksCubeFaces)
{
  var newCube = new Array(6);
  for (var i = 0; i < newCube.length; i++)
  {
    newCube[i] = new Array(9);
    for(var j = 0; j < newCube[i].length; j++)
    {
      newCube[i][j] = rubiksCubeFaces[i][j];
    }
  }
  return newCube;
}

function performSolveAlgorithmSequence(rubiksCubeFaces, alg)
{
  var moves = alg.split(" ");
  moves.forEach(function(move) {
    switch(move)
    {
      case "F": solveFront(rubiksCubeFaces); break;
      case "F'": solveFrontPrime(rubiksCubeFaces); break;
      case "X": solveXAxis(rubiksCubeFaces); break;
      case "X'": solveXAxisPrime(rubiksCubeFaces); break;
      case "Y": solveYAxis(rubiksCubeFaces); break;
      case "Y'": solveYAxisPrime(rubiksCubeFaces); break;
      case "Z": solveZAxis(rubiksCubeFaces); break;
      case "Z'": solveZAxisPrime(rubiksCubeFaces); break;
      case "R": solveRight(rubiksCubeFaces); break;
      case "R'": solveRightPrime(rubiksCubeFaces); break;
      case "L": solveLeft(rubiksCubeFaces); break;
      case "L'": solveLeftPrime(rubiksCubeFaces); break;
      case "B": solveBack(rubiksCubeFaces); break;
      case "B'": solveBackPrime(rubiksCubeFaces); break;
      case "U": solveUp(rubiksCubeFaces); break;
      case "U'": solveUpPrime(rubiksCubeFaces); break;
      case "D": solveDown(rubiksCubeFaces); break;
      case "D'": solveDownPrime(rubiksCubeFaces); break;
      case "E": solveEquator(rubiksCubeFaces); break;
      case "E'": solveEquatorPrime(rubiksCubeFaces); break;
      case "M": solveMiddle(rubiksCubeFaces); break;
      case "M'": solveMiddlePrime(rubiksCubeFaces); break;
      case "S": solveStanding(rubiksCubeFaces); break;
      case "S'": solveStandingPrime(rubiksCubeFaces); break;
      case "F2": solveFront(rubiksCubeFaces); solveFront(rubiksCubeFaces); break;
      case "X2": solveXAxis(rubiksCubeFaces); solveXAxis(rubiksCubeFaces); break;
      case "Y2": solveYAxis(rubiksCubeFaces); solveYAxis(rubiksCubeFaces); break;
      case "Z2": solveZAxis(rubiksCubeFaces); solveZAxis(rubiksCubeFaces); break;
      case "R2": solveRight(rubiksCubeFaces); solveRight(rubiksCubeFaces); break;
      case "L2": solveLeft(rubiksCubeFaces); solveLeft(rubiksCubeFaces); break;
      case "B2": solveBack(rubiksCubeFaces); solveBack(rubiksCubeFaces); break;
      case "U2": solveUp(rubiksCubeFaces); solveUp(rubiksCubeFaces); break;
      case "D2": solveDown(rubiksCubeFaces); solveDown(rubiksCubeFaces); break;
      case "E2": solveEquator(rubiksCubeFaces); solveEquator(rubiksCubeFaces); break;
      case "M2": solveMiddle(rubiksCubeFaces); solveMiddle(rubiksCubeFaces); break;
      case "S2": solveStanding(rubiksCubeFaces); solveStanding(rubiksCubeFaces); break;
      default: break;
    }
  });
}

function solveFront(rubiksCubeFaces)
{
  rubiksCubeFacesReference = copyCubeArray(rubiksCubeFaces);
  for(var i = 0; i < rubiksCubeFaces[0].length; i++)
  {
    rubiksCubeFaces[0][i] = rubiksCubeFacesReference[0][((2 - (i % 3)) * 3) + Math.floor(i / 3)];
  }

  for(var i = 0; i < 3; i++)
  {
    rubiksCubeFaces[1][(3 * i) + 2] = rubiksCubeFacesReference[4][(3 * (3 - i)) - 1];
    rubiksCubeFaces[5][(3 * i) + 2] = rubiksCubeFacesReference[1][(3 * i) + 2];
    rubiksCubeFaces[3][(3 * (3 - i)) - 1] = rubiksCubeFacesReference[5][(3 * i) + 2];
    rubiksCubeFaces[4][(3 * (3 - i)) - 1] = rubiksCubeFacesReference[3][(3 * (3 - i)) - 1];
  }
}

function solveFrontPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "F F F");
}

function solveXAxis(rubiksCubeFaces)
{
  rubiksCubeFacesReference = copyCubeArray(rubiksCubeFaces);
  for(var i = 0; i < rubiksCubeFaces[0].length; i++)
  {
    rubiksCubeFaces[4][i] = rubiksCubeFacesReference[0][Math.floor(i/3) * 3 + (2 - (i % 3))];
    rubiksCubeFaces[0][i] = rubiksCubeFacesReference[5][i];
    rubiksCubeFaces[5][i] = rubiksCubeFacesReference[2][Math.floor(i/3) * 3 + (2 - (i % 3))];
    rubiksCubeFaces[2][i] = rubiksCubeFacesReference[4][i];
    rubiksCubeFaces[1][i] = rubiksCubeFacesReference[1][(2 - (i % 3)) * 3 + Math.floor(i/3)];
    rubiksCubeFaces[3][i] = rubiksCubeFacesReference[3][(2 - (i % 3)) * 3 + Math.floor(i/3)];
  }
}

function solveXAxisPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "X X X");
}

function solveYAxis(rubiksCubeFaces)
{
  rubiksCubeFacesReference = copyCubeArray(rubiksCubeFaces);
  for(var i = 0; i < rubiksCubeFaces[0].length; i++)
  {
    rubiksCubeFaces[0][i] = rubiksCubeFacesReference[1][Math.floor(i % 3) * 3 + (2 - (Math.floor(i/3)))];
    rubiksCubeFaces[1][i] = rubiksCubeFacesReference[2][Math.floor(i % 3) * 3 + ((Math.floor(i/3)))];
    rubiksCubeFaces[2][i] = rubiksCubeFacesReference[3][Math.floor(i % 3) * 3 + (2 - (Math.floor(i/3)))];
    rubiksCubeFaces[3][i] = rubiksCubeFacesReference[0][Math.floor(i % 3) * 3 + ((Math.floor(i/3)))];
    rubiksCubeFaces[4][i] = rubiksCubeFacesReference[4][(i % 3) * 3 + (2 - Math.floor(i/3))];
    rubiksCubeFaces[5][i] = rubiksCubeFacesReference[5][(i % 3) * 3 + (2 - Math.floor(i/3))];
  }
}

function solveYAxisPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "Y Y Y");
}

function solveZAxis(rubiksCubeFaces)
{
  rubiksCubeFacesReference = copyCubeArray(rubiksCubeFaces);
  for(var i = 0; i < rubiksCubeFaces[0].length; i++)
  {
    rubiksCubeFaces[4][i] = rubiksCubeFacesReference[3][Math.floor(i/3) * 3 + (i % 3)];
    rubiksCubeFaces[3][i] = rubiksCubeFacesReference[5][(2 - Math.floor(i/3)) * 3 + (i % 3)];
    rubiksCubeFaces[5][i] = rubiksCubeFacesReference[1][Math.floor(i/3) * 3 + (i % 3)];
    rubiksCubeFaces[1][i] = rubiksCubeFacesReference[4][(2 - Math.floor(i/3)) * 3 + (i % 3)];
    rubiksCubeFaces[0][i] = rubiksCubeFacesReference[0][(2 - (i % 3)) * 3 + Math.floor(i/3)];
    rubiksCubeFaces[2][i] = rubiksCubeFacesReference[2][(2 - (i % 3)) * 3 + Math.floor(i/3)];
  }
}

function solveZAxisPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "Z Z Z");
}

function solveRight(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "Y F Y'");
}

function solveRightPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "Y F' Y'");
}

function solveLeft(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "Y' F Y");
}

function solveLeftPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "Y' F' Y");
}

function solveBack(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "X X F X' X'");
}

function solveBackPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "X X F' X' X'");
}

function solveUp(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "X' F X");
}

function solveUpPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "X' F' X");
}

function solveDown(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "X F X'");
}

function solveDownPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "X F' X'");
}

function solveMiddle(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "Y F Y' Y' F' Y X'");
}

function solveMiddlePrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "Y F' Y' Y' F Y X");
}

function solveEquator(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "X F' X' X' F X Y'");
}

function solveEquatorPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "X F X' X' F' X Y");
}

function solveStanding(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "F' Y Y F Y' Y' Z");
}

function solveStandingPrime(rubiksCubeFaces)
{
  performSolveAlgorithmSequence(rubiksCubeFaces, "F Y Y F' Y' Y' Z'");
}
