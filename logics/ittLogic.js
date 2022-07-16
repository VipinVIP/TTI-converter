const decoder = new TextDecoder();

window.onload = init;

function init() {
  document.getElementById("txtarea").value = "";
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function fromHex(hex) {
  try {
    str = decoder.decode(
      Uint8Array.from(
        hex.match(/(.{1,2})/g).map(function (v) {
          return parseInt(v, 16);
        })
      )
    );
  } catch (e) {
    str = hex;
    console.log("invalid hex input: " + hex);
  }
  return str;
}

document.getElementById("inp").onchange = function (e) {
  let img = new Image();
  img.onload = draw;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);
};

function draw() {
  let colourArray = [],
    mainarr = [],
    hexstr = "";

  let canvas = document.getElementById("canvas");
  canvas.width = this.width;
  canvas.height = this.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(this, 0, 0);

  width = canvas.width;

  for (j = 0; j < width; j += 50) {
    for (i = 0; i < width; i += 50) {
      r = ctx.getImageData(i, j, 50, 50).data[0];
      g = ctx.getImageData(i, j, 50, 50).data[1];
      b = ctx.getImageData(i, j, 50, 50).data[2];
      a = ctx.getImageData(i, j, 50, 50).data[3];

      hexColour = rgbToHex(r, g, b);
      colourArray.push(hexColour);
    }
  }
  firstVal = colourArray.shift();
  Begin = parseInt(firstVal.slice(1, 2), 10);
  End = parseInt(firstVal.slice(2));

  for (i = 0; i < End; i++) {
    colourArray.pop();
  }

  mainarr = colourArray.map((i) => i.slice(1));
  hexstr = mainarr.join("");
  if (Begin == 2) {
    hexstr = hexstr.slice(0, -4);
  } else if (Begin == 4) {
    hexstr = hexstr.slice(0, -2);
  }
  vips = fromHex(hexstr);
  final = unescape(vips);
  document.getElementById("txtarea").value = final;

  //////////////////////////////////////////////////////////////////////////////////

  console.log(vips);
}
function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}
