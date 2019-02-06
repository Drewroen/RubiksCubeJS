window.onload = function() {
  var gui = new dat.GUI();
  var rubiksMovements = {
    xAxis:function(){xAxis(rubiksCubeFaces);},
    xAxisPrime:function(){xAxisPrime(rubiksCubeFaces);},
    yAxis:function(){yAxis(rubiksCubeFaces);},
    yAxisPrime:function(){yAxisPrime(rubiksCubeFaces);},
    zAxis:function(){zAxis(rubiksCubeFaces);},
    zAxisPrime:function(){zAxisPrime(rubiksCubeFaces);},
    algorithm: "L",
    algorithmSubmit:function(){performAlgorithmSequence(rubiksCubeFaces, rubiksMovements.algorithm);}
  };

  gui.add(rubiksMovements, 'xAxis').name('X');
  gui.add(rubiksMovements, 'xAxisPrime').name('X\'');
  gui.add(rubiksMovements, 'yAxis').name('Y');
  gui.add(rubiksMovements, 'yAxisPrime').name('Y\'');
  gui.add(rubiksMovements, 'zAxis').name('Z');
  gui.add(rubiksMovements, 'zAxisPrime').name('Z\'');
  gui.add(rubiksMovements, 'algorithm').name('Algorithm');
  gui.add(rubiksMovements, 'algorithmSubmit').name('Submit');
};
