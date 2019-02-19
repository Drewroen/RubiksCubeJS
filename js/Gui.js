window.onload = function() {
  var gui = new dat.GUI();

  var algorithmFolder = gui.addFolder('Algorithms');
  algorithmFolder.add(rubiksGUI, 'algorithm').name('Algorithm');
  algorithmFolder.add(rubiksGUI, 'algorithmSubmit').name('Submit');
};
