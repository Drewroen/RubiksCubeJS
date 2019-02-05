window.onload = function() {
  var gui = new dat.GUI();
  var rubiksMovements = {
    right:function(){console.log("Right")},
    rightPrime:function(){console.log("Right Prime")},
    left:function(){console.log("Left")},
    leftPrime:function(){console.log("Left Prime")},
    front:function(){console.log("Front"); front(rubiksCubeFaces);},
    frontPrime:function(){console.log("Front Prime");},
    back:function(){console.log("Back")},
    backPrime:function(){console.log("Back Prime")},
    up:function(){console.log("Up")},
    upPrime:function(){console.log("Up Prime")},
    down:function(){console.log("Down")},
    downPrime:function(){console.log("Down Prime")},
    xAxis:function(){console.log("X Axis")},
    xAxisPrime:function(){console.log("X Axis Prime")},
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
};
