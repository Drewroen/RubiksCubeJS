window.onload = function() {
  var gui = new dat.GUI();
  var rubiksMovements = {
    front:function(){front(rubiksCubeFaces);},
    frontPrime:function(){frontPrime(rubiksCubeFaces);},
    right:function(){console.log("Right")},
    rightPrime:function(){console.log("Right Prime")},
    left:function(){console.log("Left")},
    leftPrime:function(){console.log("Left Prime")},
    back:function(){console.log("Back")},
    backPrime:function(){console.log("Back Prime")},
    up:function(){console.log("Up")},
    upPrime:function(){console.log("Up Prime")},
    down:function(){console.log("Down")},
    downPrime:function(){console.log("Down Prime")},
    xAxis:function(){xAxis(rubiksCubeFaces);},
    xAxisPrime:function(){xAxisPrime(rubiksCubeFaces);},
    yAxis:function(){console.log("Y Axis")},
    yAxisPrime:function(){console.log("Y Axis Prime")},
    zAxis:function(){console.log("Z Axis")},
    zAxisPrime:function(){console.log("Z Axis Prime")},
    middle:function(){console.log("Middle")},
    middlePrime:function(){console.log("Middle Prime")},
    equator:function(){console.log("Equator")},
    equatorPrime:function(){console.log("Equator Prime")},
    standing:function(){console.log("Standing")},
    standingPrime:function(){console.log("Standing Prime")},
  };

  gui.add(rubiksMovements, 'front').name('F');
  gui.add(rubiksMovements, 'frontPrime').name('F\'');
  gui.add(rubiksMovements, 'xAxis').name('X');
  gui.add(rubiksMovements, 'xAxisPrime').name('X\'');
};
