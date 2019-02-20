function getPickedColor(pickedColorGUI, cubeColors)
{
	if(pickedColorGUI.color1)
	{
		return cubeColors.face1;
	}
	else if(pickedColorGUI.color2)
	{
		return cubeColors.face2;
	}
	else if(pickedColorGUI.color3)
	{
		return cubeColors.face3;
	}
	else if(pickedColorGUI.color4)
	{
		return cubeColors.face4;
	}
	else if(pickedColorGUI.color5)
	{
		return cubeColors.face5;
	}
	else if(pickedColorGUI.color6)
	{
		return cubeColors.face6;
	}
}

function pickColorBox(pickedColor)
{
	for (let color in pickedColorGUI)
	{
		pickedColorGUI[color] = false;
	}
	pickedColorGUI[pickedColor] = true;
}
