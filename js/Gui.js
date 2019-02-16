window.onload = function() {
  var gui = new dat.GUI();

  var algorithmFolder = gui.addFolder('Algorithms');
  var preferencesFolder = gui.addFolder('Parameters');
  var colorFolder = gui.addFolder('Cube Colors');
  var pickedColorFolder = gui.addFolder('Pick Color');
  algorithmFolder.add(rubiksGUI, 'algorithm').name('Algorithm');
  algorithmFolder.add(rubiksGUI, 'algorithmSubmit').name('Submit');
  preferencesFolder.add(rubiksGUI, 'rotationSpeed', 0.005, 0.1).name('Rotation Speed');
  colorFolder.addColor(cubeColorGUI, 'face1');
  colorFolder.addColor(cubeColorGUI, 'face2');
  colorFolder.addColor(cubeColorGUI, 'face3');
  colorFolder.addColor(cubeColorGUI, 'face4');
  colorFolder.addColor(cubeColorGUI, 'face5');
  colorFolder.addColor(cubeColorGUI, 'face6');
  pickedColorFolder.add(pickedColorGUI, 'color1').listen().onChange(function(){pickColorBox('color1')});
  pickedColorFolder.add(pickedColorGUI, 'color2').listen().onChange(function(){pickColorBox('color2')});
  pickedColorFolder.add(pickedColorGUI, 'color3').listen().onChange(function(){pickColorBox('color3')});
  pickedColorFolder.add(pickedColorGUI, 'color4').listen().onChange(function(){pickColorBox('color4')});
  pickedColorFolder.add(pickedColorGUI, 'color5').listen().onChange(function(){pickColorBox('color5')});
  pickedColorFolder.add(pickedColorGUI, 'color6').listen().onChange(function(){pickColorBox('color6')});
};
