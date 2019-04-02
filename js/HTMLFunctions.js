function colorGUIButtons(document, cubeColors)
{
  var newButtons = document.getElementsByClassName("colorButton");
  newButtons[0].style.background = "#" + toHex(cubeColors.face1);
  newButtons[1].style.background = "#" + toHex(cubeColors.face2);
  newButtons[2].style.background = "#" + toHex(cubeColors.face3);
  newButtons[3].style.background = "#" + toHex(cubeColors.face4);
  newButtons[4].style.background = "#" + toHex(cubeColors.face5);
  newButtons[5].style.background = "#" + toHex(cubeColors.face6);

  newButtons[0].id = "";
  newButtons[1].id = "";
  newButtons[2].id = "";
  newButtons[3].id = "";
  newButtons[4].id = "";
  newButtons[5].id = "";

  var settingsButtons = document.getElementsByClassName("colorInput");
  settingsButtons[0].value = toHex(cubeColors.face1);
  settingsButtons[1].value = toHex(cubeColors.face2);
  settingsButtons[2].value = toHex(cubeColors.face3);
  settingsButtons[3].value = toHex(cubeColors.face4);
  settingsButtons[4].value = toHex(cubeColors.face5);
  settingsButtons[5].value = toHex(cubeColors.face6);

  switch(pickedColorGUI)
  {
    case (1): newButtons[0].id = "selectedColor"; break;
    case (2): newButtons[1].id = "selectedColor"; break;
    case (3): newButtons[2].id = "selectedColor"; break;
    case (4): newButtons[3].id = "selectedColor"; break;
    case (5): newButtons[4].id = "selectedColor"; break;
    case (6): newButtons[5].id = "selectedColor"; break;
  }
}

function toHex(num) {
  var hex = Number(num).toString(16);
  hex = "000000".substr(0, 6 - hex.length) + hex;
  return hex;
}

$('#settingsModal').on('shown.bs.modal', function () {
  updateSceneState(SCENE_SETTINGS);
});

$('#settingsModal').on('hide.bs.modal', function () {
  updateSceneState(SCENE_INPUT);
});

$("#solveMessageModal").on("hidden.bs.modal", function () {
    updateSceneState(SCENE_SOLVE);
});

function hideGUIElements(document)
{
  document.getElementById("guiButtonsTop").style.display = "none";
  document.getElementById("guiButtonsBottom").style.display = "none";
}

function showGUIElements(document)
{
  document.getElementById("guiButtonsTop").style.display = "block";
  document.getElementById("guiButtonsBottom").style.display = "block";
}

function showSolveModal(document, message)
{
  document.getElementById("solveMessage").innerHTML = "<h2 style='font-size:25px;'>"+message+"</h2> <br> <button type=\"button\" class=\"btn btn-info btn-sm\" data-dismiss=\"modal\">Click here to continue</button>";
	$('#solveMessageModal').modal('show');
  updateSceneState(SCENE_INFO);
}
