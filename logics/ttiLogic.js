const encoder = new TextEncoder()

function init() {
  document.getElementById("txtarea").value = "";
}

function toHex(str) {
  try {
    hex=Array.from(encoder.encode(str)).map(function(v){
      return v.toString(16)
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

function handleClick(){

userText=document.getElementById('txtarea').value;

console.log(userText);

m1 = toHex(escape(userText))

n=m1.length%6;
if(n==2){m1+="ffff"}
if(n==4) {m1+="ff"}

n1=m1.match(/(.{1,6})/g);
B = n1.map((i) => "#" + i);

///////////////////////////////////////////////////////////////////////

arrlen=B.length;
arrlen+=1

sqr= Math.pow(Math.ceil(Math.sqrt(arrlen)), 2);
diff = sqr - arrlen

// if(diff>0){
//   diff-=1
// }

// firstColour="#"+n+pad(diff,5)

// B.unshift(firstColour)

///////////////////// edth eythieth
// arrlen=B.length;
// sqr= Math.pow(Math.ceil(Math.sqrt(arrlen)), 2);
// diff = sqr - arrlen

////////////////////////

for(var i=0;i<diff;i++){
  B.push("#ffffff")
}

firstColour="#"+n+pad(diff,5)
// B.shift()
B.unshift(firstColour)

A=[]
A=math.reshape(B,[Math.sqrt(B.length),Math.sqrt(B.length)]);
///////////////////////////////////////////////////////////////////

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

  anchor=document.getElementById("downloader");
  anchor.href = canvas.toDataURL("image/png");
  anchor.download = "secret.png"
}

