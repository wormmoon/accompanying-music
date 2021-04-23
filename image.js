var img = new Image();
img.crossOrigin = 'anonymous';
img.src = 'images/vna2.jpeg';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
};
// var hoveredColor = document.getElementById('hovered-color');
// var selectedColor = document.getElementById('selected-color');

function pick(event, destination) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;

  return data;
}

function pickNote(rgbaArray, scale) {
  const red = rgbaArray[0];
  const green = rgbaArray[1];
  const blue = rgbaArray[2];
  const brightness = (red + green + blue) / 3;
  let note = Math.floor((brightness / 255) * scale.length);

  // if (red > blue && red > green) {
  //   if (blue > green) {
  //     note = 0;
  //   } else {
  //     note = 1;
  //   }
  // } else if (blue > green && blue > red) {
  //   if (red > green) {
  //     note = 2;
  //   } else {
  //     note = 3;
  //   }
  // } else if (green > red && green > blue) {
  //   note = 4;
  // } else {
  //   note = 1;
  // }

  // if (brightness > 126) {
  //   note = 3;
  // } else {
  //   note = 4;
  // }

  return note;
}

// Get rgba value of current pixel
let rgbaArray;
canvas.addEventListener('mousemove', function(event) {
  rgbaArray = pick(event);
});

// pickingInterval = setInterval(() => {
// 	if (rgbaArray) {
// 		// console.log(pick(event));
// 		const note = pickNote(rgbaArray, scale3);
// 		// console.log('note', note);
// 		const pluckNow = Tone.context.currentTime;
// 		pluck.trigger(pluckNow, note);
// 	}
// }, 1000);