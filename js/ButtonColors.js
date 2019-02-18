function colorGUIButtons(document, cubeColors)
{
  var buttons = document.getElementsByClassName("colorDiv");
  buttons[0].innerHTML = '<button class=\'colorButton\' onclick="pickColorBox(\'color1\');" style="background:#'+toHex(cubeColors.face1)+'"></button>';
  buttons[1].innerHTML = '<button class=\'colorButton\' onclick="pickColorBox(\'color2\');" style="background:#'+toHex(cubeColors.face2)+'"></button>';
  buttons[2].innerHTML = '<button class=\'colorButton\' onclick="pickColorBox(\'color3\');" style="background:#'+toHex(cubeColors.face3)+'"></button>';
  buttons[3].innerHTML = '<button class=\'colorButton\' onclick="pickColorBox(\'color4\');" style="background:#'+toHex(cubeColors.face4)+'"></button>';
  buttons[4].innerHTML = '<button class=\'colorButton\' onclick="pickColorBox(\'color5\');" style="background:#'+toHex(cubeColors.face5)+'"></button>';
  buttons[5].innerHTML = '<button class=\'colorButton\' onclick="pickColorBox(\'color6\');" style="background:#'+toHex(cubeColors.face6)+'"></button>';
  //pickColorBox('color1');
  //buttons[1].onclick =// pickColorBox('color1');
  if(getPickedColor(pickedColorGUI, cubeColors) == cubeColors.face1)
  {
    buttons[0].innerHTML = '<button class=\'colorButton\' id="selectedColor" onclick="pickColorBox(\'color1\');" style="background:#'+toHex(cubeColors.face1)+'"></button>';
  }
  if(getPickedColor(pickedColorGUI, cubeColors) == cubeColors.face2)
  {
    buttons[1].innerHTML = '<button class=\'colorButton\' id="selectedColor" onclick="pickColorBox(\'color2\');" style="background:#'+toHex(cubeColors.face2)+'"></button>';
  }
  if(getPickedColor(pickedColorGUI, cubeColors) == cubeColors.face3)
  {
    buttons[2].innerHTML = '<button class=\'colorButton\' id="selectedColor" onclick="pickColorBox(\'color3\');" style="background:#'+toHex(cubeColors.face3)+'"></button>';
  }
  if(getPickedColor(pickedColorGUI, cubeColors) == cubeColors.face4)
  {
    buttons[3].innerHTML = '<button class=\'colorButton\' id="selectedColor" onclick="pickColorBox(\'color4\');" style="background:#'+toHex(cubeColors.face4)+'"></button>';
  }
  if(getPickedColor(pickedColorGUI, cubeColors) == cubeColors.face5)
  {
    buttons[4].innerHTML = '<button class=\'colorButton\' id="selectedColor" onclick="pickColorBox(\'color5\');" style="background:#'+toHex(cubeColors.face5)+'"></button>';
  }
  if(getPickedColor(pickedColorGUI, cubeColors) == cubeColors.face6)
  {
    buttons[5].innerHTML = '<button class=\'colorButton\' id="selectedColor" onclick="pickColorBox(\'color6\');" style="background:#'+toHex(cubeColors.face6)+'"></button>';
  }
}

function toHex(d) {
  var hex = Number(d).toString(16);
  hex = "000000".substr(0, 6 - hex.length) + hex;
  return hex;
}
