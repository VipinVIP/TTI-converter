
function toHex(str) {
  try {
    hex = decodeURI(encodeURIComponent(str))
      .split("")
      .map(function (v) {
        return v.charCodeAt(0).toString(16);
      })
      .join("");
  } catch (e) {
    hex = str;
    console.log("invalid text input: " + str);
  }
  return hex;
}

function convertCanvasToImage() {
  let canvas = document.querySelector("canvas");
  let image = new Image();
  image.src = canvas.toDataURL();
  return image;
}

function pad(num, size){ return ('000000000' + num).slice(-size); }

function fromHex(hex) {
  try {
    str = decodeURIComponent(hex.replace(/(..)/g, "%$1"));
  } catch (e) {
    str = hex;
    console.log("invalid hex input: " + hex);
  }
  return str;
}

function handleClick(){

userText=document.getElementById('txtarea').value;

console.log(userText);

m1 = toHex(userText)

n=m1.length%6;
if(n==2){m1+="ffff"}
if(n==4) {m1+="ff"}

n1=m1.match(/(.{1,6})/g);
B = n1.map((i) => "#" + i);

///////////////////////////////////////////////////////////////////////

arrlen=B.length;
sqr= Math.pow(Math.ceil(Math.sqrt(arrlen)), 2);
diff = sqr - arrlen

diff-=1
firstColour="#"+n+pad(diff,5)

B.unshift(firstColour)



for(var i=0;i<diff;i++){
  B.push("#ffffff")
}
A=[]
A=math.reshape(B,[Math.sqrt(B.length),Math.sqrt(B.length)]);
///////////////////////////////////////////////////////////////////




// document.getElementById("m1").innerText = B;
var canvas = document.getElementById("cv"),
  ctx = canvas.getContext("2d"),
  width = A[0].length,
  height = A.length,
  scale = 50;

canvas.width = width * scale;
canvas.height = height * scale;

for (var row = 0; row < height; row++) {
  for (var col = 0; col < width; col++) {
    ctx.fillStyle = A[row][col];
    ctx.fillRect(col * scale, row * scale, scale, scale);
  }
}

let pnGImage = convertCanvasToImage();
document.getElementById("imgdiv").appendChild(pnGImage);

}

//////////////////////////////////////////////

var canvas = document.getElementById("viewport"),
  context = canvas.getContext("2d");

make_base();

function make_base() {
  base_image = pnGImage;
  base_image.onload = function () {
    context.drawImage(base_image, 0, 0);
  };
}
