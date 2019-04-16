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

function playPauseButton()
{
  reverseStep = false;
  var button = document.getElementById("play");
  console.log(button);
  if(button.className == "fa fa-play")
  {
    button.className = "fa fa-pause";
    paused = false;
    currentTime = (-5143 * rotationSpeed + 451.4) / 2;
    console.log(currentTime);
  }
  else {
    button.className = "fa fa-play";
    paused = true;
  }
}

function backButton()
{
  paused = false;
  reverseStep = true;
  currentTime = (-5143 * rotationSpeed + 451.4);
  document.getElementById("play").className = "fa fa-play";
}
