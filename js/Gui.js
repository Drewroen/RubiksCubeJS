window.onload = function() {
  var gui = new dat.GUI();

  var algorithmFolder = gui.addFolder('Algorithms');
  var preferencesFolder = gui.addFolder('Parameters');
  algorithmFolder.add(rubiksGUI, 'algorithm').name('Algorithm');
  algorithmFolder.add(rubiksGUI, 'algorithmSubmit').name('Submit');
  preferencesFolder.add(rubiksGUI, 'rotationSpeed', 0.005, 0.1).name('Rotation Speed');
};
