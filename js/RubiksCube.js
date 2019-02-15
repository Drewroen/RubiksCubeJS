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
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.y = j % 3 - 1;
        rubiksCube[i][j].position.z = 1.5;
      }
      else if (i == 1)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffa500, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = 1.5;
        rubiksCube[i][j].position.y = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.z = j % 3 - 1;
        rubiksCube[i][j].rotation.y = Math.PI / 2;
      }
      else if (i == 2)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.y = j % 3 - 1;
        rubiksCube[i][j].position.z = -1.5;
      }
      else if (i == 3)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = -1.5;
        rubiksCube[i][j].position.y = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.z = j % 3 - 1;
        rubiksCube[i][j].rotation.y = Math.PI / 2;
      }
      else if (i == 4)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x008000, side: THREE.DoubleSide}));
        rubiksCube[i][j].position.x = Math.floor(j / 3) - 1;
        rubiksCube[i][j].position.y = 1.5;
        rubiksCube[i][j].position.z = j % 3 - 1;
        rubiksCube[i][j].rotation.x = Math.PI / 2;
      }
      else if (i == 5)
      {
        rubiksCube[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.DoubleSide}));
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

function randomizeFaces(rubiksCube)
{
  for(var i = 0; i < rubiksCube.length; i++)
  {
    for(var j = 0; j < rubiksCube[i].length; j++)
    {
      var tempColor = Math.floor(Math.random() * 6);
      if (tempColor == 0)
      {
        setCubeFace(rubiksCube, i, j, redMaterial);
      }
      else if (tempColor == 1)
      {
        setCubeFace(rubiksCube, i, j, orangeMaterial);
      }
      else if (tempColor == 2)
      {
        setCubeFace(rubiksCube, i, j, yellowMaterial);
      }
      else if (tempColor == 3)
      {
        setCubeFace(rubiksCube, i, j, greenMaterial);
      }
      else if (tempColor == 4)
      {
        setCubeFace(rubiksCube, i, j, blueMaterial);
      }
      else if (tempColor == 5)
      {
        setCubeFace(rubiksCube, i, j, whiteMaterial);
      }
    }
  }
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
