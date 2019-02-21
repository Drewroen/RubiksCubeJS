function getPickedColor(pickedColorGUI, cubeColorGUI)
{
  switch(pickedColorGUI)
  {
    case(1): return cubeColorGUI.face1; break;
    case(2): return cubeColorGUI.face2; break;
    case(3): return cubeColorGUI.face3; break;
    case(4): return cubeColorGUI.face4; break;
    case(5): return cubeColorGUI.face5; break;
    case(6): return cubeColorGUI.face6; break;
  }
}
