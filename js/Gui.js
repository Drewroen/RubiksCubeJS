window.onload = function() {
  var gui = new dat.GUI();

  var algorithmFolder = gui.addFolder('Algorithms');
  var preferencesFolder = gui.addFolder('Parameters');
  var colorFolder = gui.addFolder('Cube Colors');
  algorithmFolder.add(rubiksGUI, 'algorithm').name('Algorithm');
  algorithmFolder.add(rubiksGUI, 'algorithmSubmit').name('Submit');
  preferencesFolder.add(rubiksGUI, 'rotationSpeed', 0.005, 0.1).name('Rotation Speed');
  colorFolder.addColor(cubeColorGUI, 'face1');
  colorFolder.addColor(cubeColorGUI, 'face2');
  colorFolder.addColor(cubeColorGUI, 'face3');
  colorFolder.addColor(cubeColorGUI, 'face4');
  colorFolder.addColor(cubeColorGUI, 'face5');
  colorFolder.addColor(cubeColorGUI, 'face6');
};
