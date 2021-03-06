var geometry = new THREE.PlaneGeometry(.9, .9, .9);
var blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});

function createCubeFaces()
{
  var rubiksCube = new Array(6);
  for (var i = 0; i < rubiksCube.length; i++)
  {
    rubiksCube[i] = new Array(9);
    for (var j = 0; j < rubiksCube[i].length; j++)
    {
      if (i == 0)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: cubeColors.face1, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.y = j % 3 - 1;
        rubiksCube[i][j].position.z = 1.5;
      }
      else if (i == 1)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: cubeColors.face2, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = 1.5;
        rubiksCube[i][j].position.y = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.z = j % 3 - 1;
        rubiksCube[i][j].rotation.y = Math.PI / 2;
      }
      else if (i == 2)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: cubeColors.face3, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.y = j % 3 - 1;
        rubiksCube[i][j].position.z = -1.5;
      }
      else if (i == 3)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: cubeColors.face4, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = -1.5;
        rubiksCube[i][j].position.y = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.z = j % 3 - 1;
        rubiksCube[i][j].rotation.y = Math.PI / 2;
      }
      else if (i == 4)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: cubeColors.face5, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.y = 1.5;
        rubiksCube[i][j].position.z = j % 3 - 1;
        rubiksCube[i][j].rotation.x = Math.PI / 2;
      }
      else if (i == 5)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: cubeColors.face6, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.y = -1.5;
        rubiksCube[i][j].position.z = j % 3 - 1;
        rubiksCube[i][j].rotation.x = Math.PI / 2;
      }
    }
  }
  return rubiksCube;
}

function createCubeFacesFromCube(rubiksCubeToCopy)
{
  var rubiksCube = createCubeFaces();
  for (var i = 0; i < rubiksCube.length; i++)
  {
    for (var j = 0; j < rubiksCube[i].length; j++)
    {
      setCubeFace(rubiksCube, i, j, rubiksCubeToCopy[i][j].material);
    }
  }
  return rubiksCube;
}

function addCubeFacesToScene(rubiksCubeFaces, scene)
{
  for (var i = 0; i < rubiksCubeFaces.length; i++)
  {
    for (var j = 0; j < rubiksCubeFaces[i].length; j++)
    {
      scene.add(rubiksCubeFaces[i][j]);
    }
  }
}

function setCubeFace(rubiksCube, x, y, material)
{
  rubiksCube[x][y].material = material;
}

function getCubeFace(rubiksCube, x, y)
{
  return rubiksCube[x][y].material;
}

function setCubeFaceColor(rubiksCube, x, y, color)
{
  rubiksCube[x][y].material.color = new THREE.Color(color);
}

function getCubeFaceColor(rubiksCube, x, y)
{
  return rubiksCube[x][y].material.color;
}

function createCubeBlocks()
{
  var cubeStructure = new Array(3);
  for (var i = 0; i < 3; i++)
  {
    cubeStructure[i] = new Array(3);
    for (var j = 0; j < 3; j++)
    {
      cubeStructure[i][j] = new Array(3);
      for (var k = 0; k < 3; k++)
      {
        var geometry = new THREE.BoxGeometry(.95, .95, .95);
        var cube = new THREE.Mesh(geometry, blackMaterial);
        cube.position.x = i - 1;
        cube.position.y = j - 1;
        cube.position.z = k - 1;
        cubeStructure[i][j][k] = cube;
      }
    }
  }
  return cubeStructure;
}

function addCubeBlocksToScene(cubeBlocks, scene)
{
  for (var i = 0; i < 3; i++)
  {
    for (var j = 0; j < 3; j++)
    {
      for (var k = 0; k < 3; k++)
      {
        scene.add(cubeBlocks[i][j][k]);
      }
    }
  }
}

function colorsChanged(cubeColors, cubeColorGUI)
{
  return cubeColors.face1 != cubeColorGUI.face1 || cubeColors.face2 != cubeColorGUI.face2 || cubeColors.face3 != cubeColorGUI.face3 || cubeColors.face4 != cubeColorGUI.face4 || cubeColors.face5 != cubeColorGUI.face5 || cubeColors.face6 != cubeColorGUI.face6;
}

function updateCubeColors(rubiksCubeFaces, cubeColors, cubeColorGUI)
{
  if(colorsChanged(cubeColors, cubeColorGUI))
  {
    for (var i = 0; i < rubiksCubeFaces.length; i++)
    {
      for (var j = 0; j < rubiksCubeFaces[i].length; j++)
      {
        if(colorsEqual(getCubeFaceColor(rubiksCubeFaces, i, j), new THREE.Color(cubeColors.face1)))
        {
          setCubeFaceColor(rubiksCubeFaces, i, j, cubeColorGUI.face1);
        }
        if(colorsEqual(getCubeFaceColor(rubiksCubeFaces, i, j), new THREE.Color(cubeColors.face2)))
        {
          setCubeFaceColor(rubiksCubeFaces, i, j, cubeColorGUI.face2);
        }
        if(colorsEqual(getCubeFaceColor(rubiksCubeFaces, i, j), new THREE.Color(cubeColors.face3)))
        {
          setCubeFaceColor(rubiksCubeFaces, i, j, cubeColorGUI.face3);
        }
        if(colorsEqual(getCubeFaceColor(rubiksCubeFaces, i, j), new THREE.Color(cubeColors.face4)))
        {
          setCubeFaceColor(rubiksCubeFaces, i, j, cubeColorGUI.face4);
        }
        if(colorsEqual(getCubeFaceColor(rubiksCubeFaces, i, j), new THREE.Color(cubeColors.face5)))
        {
          setCubeFaceColor(rubiksCubeFaces, i, j, cubeColorGUI.face5);
        }
        if(colorsEqual(getCubeFaceColor(rubiksCubeFaces, i, j), new THREE.Color(cubeColors.face6)))
        {
          setCubeFaceColor(rubiksCubeFaces, i, j, cubeColorGUI.face6);
        }
      }
    }
    cubeColors.face1 = cubeColorGUI.face1;
    cubeColors.face2 = cubeColorGUI.face2;
    cubeColors.face3 = cubeColorGUI.face3;
    cubeColors.face4 = cubeColorGUI.face4;
    cubeColors.face5 = cubeColorGUI.face5;
    cubeColors.face6 = cubeColorGUI.face6;

    colorGUIButtons(document, cubeColors);
  }
}

function colorsEqual(color1, color2)
{
  return color1.r == color2.r && color1.g == color2.g && color1.b == color2.b;
}

function addInputOutline(x, y, z)
{
  rubiksCubeBlocks[x][y][z].add(pieceInputMesh.clone());
}

function addInputOutlinePiece(val)
{
  switch(val)
  {
    case EDGE_UP_FRONT: addInputOutline(1, 2, 2); break;
    case EDGE_UP_RIGHT: addInputOutline(2, 2, 1); break;
    case EDGE_UP_BACK: addInputOutline(1, 2, 0); break;
    case EDGE_UP_LEFT: addInputOutline(0, 2, 1); break;
    case EDGE_MIDDLE_LEFT_BACK: addInputOutline(0, 1, 0); break;
    case EDGE_MIDDLE_RIGHT_BACK: addInputOutline(2, 1, 0); break;
    case EDGE_MIDDLE_LEFT_FRONT: addInputOutline(0, 1, 2); break;
    case EDGE_MIDDLE_RIGHT_FRONT: addInputOutline(2, 1, 2); break;
    case EDGE_DOWN_FRONT: addInputOutline(1, 0, 2); break;
    case EDGE_DOWN_RIGHT: addInputOutline(2, 0, 1); break;
    case EDGE_DOWN_BACK: addInputOutline(1, 0, 0); break;
    case EDGE_DOWN_LEFT: addInputOutline(0, 0, 1); break;
    case CORNER_UP_LEFT_BACK: addInputOutline(0, 2, 0); break;
    case CORNER_UP_RIGHT_BACK: addInputOutline(2, 2, 0); break;
    case CORNER_UP_LEFT_FRONT: addInputOutline(0, 2, 2); break;
    case CORNER_UP_RIGHT_FRONT: addInputOutline(2, 2, 2); break;
    case CORNER_DOWN_LEFT_BACK: addInputOutline(0, 0, 0); break;
    case CORNER_DOWN_RIGHT_BACK: addInputOutline(2, 0, 0); break;
    case CORNER_DOWN_LEFT_FRONT: addInputOutline(0, 0, 2); break;
    case CORNER_DOWN_RIGHT_FRONT: addInputOutline(2, 0, 2); break;
  }
}

function addOutputOutline(x, y, z)
{
  rubiksCubeBlocks[x][y][z].add(pieceOutputMesh.clone());
}

function addOutputOutlinePiece(val)
{
  switch(val)
  {
    case EDGE_UP_FRONT: addOutputOutline(1, 2, 2); break;
    case EDGE_UP_RIGHT: addOutputOutline(2, 2, 1); break;
    case EDGE_UP_BACK: addOutputOutline(1, 2, 0); break;
    case EDGE_UP_LEFT: addOutputOutline(0, 2, 1); break;
    case EDGE_MIDDLE_LEFT_BACK: addOutputOutline(0, 1, 0); break;
    case EDGE_MIDDLE_RIGHT_BACK: addOutputOutline(2, 1, 0); break;
    case EDGE_MIDDLE_LEFT_FRONT: addOutputOutline(0, 1, 2); break;
    case EDGE_MIDDLE_RIGHT_FRONT: addOutputOutline(2, 1, 2); break;
    case EDGE_DOWN_FRONT: addOutputOutline(1, 0, 2); break;
    case EDGE_DOWN_RIGHT: addOutputOutline(2, 0, 1); break;
    case EDGE_DOWN_BACK: addOutputOutline(1, 0, 0); break;
    case EDGE_DOWN_LEFT: addOutputOutline(0, 0, 1); break;
    case CORNER_UP_LEFT_BACK: addOutputOutline(0, 2, 0); break;
    case CORNER_UP_RIGHT_BACK: addOutputOutline(2, 2, 0); break;
    case CORNER_UP_LEFT_FRONT: addOutputOutline(0, 2, 2); break;
    case CORNER_UP_RIGHT_FRONT: addOutputOutline(2, 2, 2); break;
    case CORNER_DOWN_LEFT_BACK: addOutputOutline(0, 0, 0); break;
    case CORNER_DOWN_RIGHT_BACK: addOutputOutline(2, 0, 0); break;
    case CORNER_DOWN_LEFT_FRONT: addOutputOutline(0, 0, 2); break;
    case CORNER_DOWN_RIGHT_FRONT: addOutputOutline(2, 0, 2); break;
  }
}

function clearOutlines()
{
  for (var i = 0; i < 3; i++)
  {
    for (var j = 0; j < 3; j++)
    {
      for (var k = 0; k < 3; k++)
      {
        rubiksCubeBlocks[i][j][k].remove(rubiksCubeBlocks[i][j][k].children[0]);
      }

    }
  }

}
