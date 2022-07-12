var arr=[],mainarr=[],hexstr=""

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function fromHex(hex) {
    try {
      str = decodeURIComponent(hex.replace(/(..)/g, "%$1"));
    } catch (e) {
      str = hex;
      console.log("invalid hex input: " + hex);
    }
    return str;
  }

document.getElementById('inp').onchange = function(e) {
  var img = new Image();
  img.onload = draw;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);
};
function draw() {
  var canvas = document.getElementById('canvas');
  canvas.width = this.width;
  canvas.height = this.height;
  var ctx = canvas.getContext('2d'); 
  ctx.drawImage(this, 0,0);
 
  width=canvas.width;
  console.log(width);

for(j=0;j<width;j+=50) {
for(i=0;i<width;i+=50){
    r=ctx.getImageData(i,j,50,50).data[0]
    g=ctx.getImageData(i,j,50,50).data[1]
    b=ctx.getImageData(i,j,50,50).data[2]
    a=ctx.getImageData(i,j,50,50).data[3]

    templ=rgbToHex(r,g,b)
    console.log(templ)
    arr.push(templ)

  }
}
firstVal=arr.shift()
Begin=parseInt(firstVal.slice(1,2),10)
End=parseInt(firstVal.slice(2))

for (i=0;i<End;i++){
  arr.pop()
}

mainarr = arr.map(i=>i.slice(1))
hexstr=mainarr.join("")
if(Begin==2){
  hexstr=hexstr.slice(0,-4)
}
else if(Begin ==4){
  hexstr=hexstr.slice(0,-2)
}
  vips=fromHex(hexstr);
  final=decodeURIComponent(vips)
  document.getElementById('txtarea').value = final

//////////////////////////////////////////////////////////////////////////////////
  
  console.log(vips)

}
function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}
