function colorGUIButtons(document, cubeColors)
{
  var buttons = document.getElementsByClassName("colorDiv");
  buttons[0].innerHTML = '<button onclick="pickColorBox(\'color1\');" style="background:#'+toHex(cubeColors.face1)+'"></button>';
  buttons[1].innerHTML = '<button onclick="pickColorBox(\'color2\');" style="background:#'+toHex(cubeColors.face2)+'"></button>';
  buttons[2].innerHTML = '<button onclick="pickColorBox(\'color3\');" style="background:#'+toHex(cubeColors.face3)+'"></button>';
  buttons[3].innerHTML = '<button onclick="pickColorBox(\'color4\');" style="background:#'+toHex(cubeColors.face4)+'"></button>';
  buttons[4].innerHTML = '<button onclick="pickColorBox(\'color5\');" style="background:#'+toHex(cubeColors.face5)+'"></button>';
  buttons[5].innerHTML = '<button onclick="pickColorBox(\'color6\');" style="background:#'+toHex(cubeColors.face6)+'"></button>';
  //pickColorBox('color1');
  //buttons[1].onclick =// pickColorBox('color1');
}

function toHex(d) {
  var hex = Number(d).toString(16);
  hex = "000000".substr(0, 6 - hex.length) + hex;
  return hex;
}
