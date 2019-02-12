window.onload = function() {
  var gui = new dat.GUI();

  var turns = {
    yAxis:function(){yAxis(rubiksCubeFaces);},
    yAxisPrime:function(){yAxisPrime(rubiksCubeFaces);},
    zAxis:function(){zAxis(rubiksCubeFaces);},
    zAxisPrime:function(){zAxisPrime(rubiksCubeFaces);},
    left:function(){cubeLeft(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    leftPrime:function(){cubeLeftPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    right:function(){cubeRight(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    rightPrime:function(){cubeRightPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    middle:function(){cubeMiddle(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    middlePrime:function(){cubeMiddlePrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    xAxis:function(){cubeXAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    xAxisPrime:function(){cubeXAxisPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    yAxis:function(){cubeYAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    yAxisPrime:function(){cubeYAxisPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    zAxis:function(){cubeZAxis(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    zAxisPrime:function(){cubeZAxisPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    up:function(){cubeUp(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    upPrime:function(){cubeUpPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    down:function(){cubeDown(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    downPrime:function(){cubeDownPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    equator:function(){cubeEquator(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    equatorPrime:function(){cubeEquatorPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    front:function(){cubeFront(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    frontPrime:function(){cubeFrontPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    back:function(){cubeBack(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    backPrime:function(){cubeBackPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    standing:function(){cubeStanding(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},
    standingPrime:function(){cubeStandingPrime(rotations, rubiksCubeBlocks, rubiksCubeFaces, scene, pivot);},

  }
  var axisFolder = gui.addFolder('Axis Rotations');
  var algorithmFolder = gui.addFolder('Algorithms');
  var preferencesFolder = gui.addFolder('Parameters');
  var turnsFolder = gui.addFolder('Cube Turns');
  axisFolder.add(turns, 'yAxis').name('Y');
  axisFolder.add(turns, 'yAxisPrime').name('Y\'');
  axisFolder.add(turns, 'zAxis').name('Z');
  axisFolder.add(turns, 'zAxisPrime').name('Z\'');
  turnsFolder.add(turns, 'left').name('L');
  turnsFolder.add(turns, 'leftPrime').name('L\'');
  turnsFolder.add(turns, 'right').name('R');
  turnsFolder.add(turns, 'rightPrime').name('R\'');
  turnsFolder.add(turns, 'middle').name('M');
  turnsFolder.add(turns, 'middlePrime').name('M\'');
  turnsFolder.add(turns, 'xAxis').name('X');
  turnsFolder.add(turns, 'xAxisPrime').name('X\'');
  turnsFolder.add(turns, 'yAxis').name('Y');
  turnsFolder.add(turns, 'yAxisPrime').name('Y\'');
  turnsFolder.add(turns, 'zAxis').name('Z');
  turnsFolder.add(turns, 'zAxisPrime').name('Z\'');
  turnsFolder.add(turns, 'up').name('U');
  turnsFolder.add(turns, 'upPrime').name('U\'');
  turnsFolder.add(turns, 'down').name('D');
  turnsFolder.add(turns, 'downPrime').name('D\'');
  turnsFolder.add(turns, 'equator').name('E');
  turnsFolder.add(turns, 'equatorPrime').name('E\'');
  turnsFolder.add(turns, 'front').name('F');
  turnsFolder.add(turns, 'frontPrime').name('F\'');
  turnsFolder.add(turns, 'back').name('B');
  turnsFolder.add(turns, 'backPrime').name('B\'');
  turnsFolder.add(turns, 'standing').name('S');
  turnsFolder.add(turns, 'standingPrime').name('S\'');
  algorithmFolder.add(rubiksGUI, 'algorithm').name('Algorithm');
  algorithmFolder.add(rubiksGUI, 'algorithmSubmit').name('Submit');
  preferencesFolder.add(rubiksGUI, 'rotationSpeed', 0.005, 0.1).name('Rotation Speed');
};
