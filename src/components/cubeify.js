'use strict';

function generateCube(text, dashed) {
  let spacer;
  let cubeText = "";

  const textToCube = text.trim().toUpperCase();
  const arrToCube = textToCube.split("");
  const textToCubeSpace = textToCube.split("").join("\u0020");
  const linebreak = "\n";

  if (textToCubeSpace.length <= 1) {
    console.log("Input must be greater than 1");
    return;
  }

  if (dashed) {
    spacer = "-";
  } else {
    spacer = "\u0020";
  }
  let i;

  cubeText += spacer.repeat(Math.floor(textToCube.length / 2) * 2);
  cubeText += textToCubeSpace;
  cubeText += linebreak;

  for (i = 0; i < (Math.floor(textToCube.length / 2) - 1); i++) {
    cubeText += spacer.repeat((Math.floor(textToCube.length / 2) - i - 1) * 2);
    cubeText += "/";
    cubeText += spacer.repeat(i * 2 + 1);
    cubeText += arrToCube[i + 1];
    cubeText += spacer.repeat((textToCube.length - i - 3) * 2 + 1);
    cubeText += "/";
    cubeText += spacer.repeat(i * 2 + 1);
    cubeText += textToCube.charAt(textToCube.length - (i + 2));
    cubeText += linebreak;
  }

  cubeText += textToCubeSpace;
  cubeText += spacer.repeat(Math.floor(textToCube.length / 2 - 1) * 2 + 1);
  cubeText += textToCube.charAt(textToCube.length / 2 - (1 - (textToCube.length % 2)));
  cubeText += linebreak;

  for (i = 0; i < Math.floor(textToCube.length / 2) - (textToCube.length + 1) % 2 - 1; i++) {
    cubeText += arrToCube[i + 1];
    cubeText += spacer.repeat((Math.floor(textToCube.length / 2) - 1) * 2 + 1);
    cubeText += arrToCube[i + Math.floor(textToCube.length / 2) + 1];
    cubeText += spacer.repeat((Math.floor((textToCube.length - 1) / 2 - 1)) * 2 + 1);
    cubeText += textToCube.charAt((textToCube.length) - i - 2);
    cubeText += spacer.repeat((Math.floor(textToCube.length / 2) - 1) * 2 + 1);
    cubeText += textToCube.charAt(Math.floor(textToCube.length / 2) - i - (2 - (textToCube.length % 2)));
    cubeText += linebreak;
  }

  cubeText += arrToCube[Math.floor(textToCube.length / 2) - (textToCube.length + 1) % 2];
  cubeText += spacer.repeat(Math.floor(textToCube.length / 2 - 1) * 2 + 1);
  cubeText += textToCubeSpace.split("").reverse().join("");
  cubeText += linebreak;

  for (i = 0; i < Math.floor(textToCube.length / 2 - 1); i++) {
    cubeText += arrToCube[Math.floor(textToCube.length / 2) + i + (textToCube.length) % 2];
    cubeText += spacer.repeat(Math.floor((textToCube.length / 2) - i - 2) * 2 + 1);
    cubeText += "/";
    cubeText += spacer.repeat((i + Math.floor((textToCube.length - 1) / 2)) * 2 + 1);
    cubeText += textToCube.charAt(Math.floor(textToCube.length / 2 ) - (i + 1));
    cubeText += spacer.repeat(Math.floor((textToCube.length / 2) - i - 2) * 2 + 1);
    cubeText += "/";
    cubeText += linebreak;
  }

  cubeText += textToCubeSpace.split("").reverse().join("");

  console.log(cubeText);
  return cubeText;
}

exports.generateCube = (text, dashed) => {
  return generateCube(text, dashed);
}
