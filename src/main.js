const ctx = document.getElementById('canvas').getContext('2d');

const tilesheet = new Image();
tilesheet.src = './resize.png';

// the sprites that make up the game map
let tiles = [];

const topLeftCorner = 1,
  topRightCorner = 2,
  bottomLeftCorner = 3,
  bottomRightCorner = 4,
  horMiddle = 5,
  vertMiddle = 6,
  floor = 7;

const map = [
  [1, 5, 5, 5, 5, 5, 2],
  [6, 7, 7, 7, 7, 7, 6],
  [6, 7, 7, 7, 7, 7, 6],
  [6, 7, 7, 7, 7, 7, 6],
  [3, 5, 5, 5, 5, 5, 4]
];

// size of each 'tile'
const SIZE = 8;

// native width and height does not change
const nHeight = SIZE * map.length;
const nWidth = SIZE * map[0].length;

// max width/height you want the map to be, if you have a large display and don't want
// the canvas to get that big
// I just picked 20 at random here.
// In this instance maxWidth = 56 * 20 = 1,120 and maxHeight = 40 * 20 = 800
const maxMultiplier = 10;
const maxWidth = nWidth * maxMultiplier;
const maxHeight = nHeight * maxMultiplier;

// % of browser window to be taken up by the canvas
const windowPercentage = 0.9;

// the canvas' displayed width/height
// this is what changes when the window is resized
let cHeight = nHeight;
let cWidth = nWidth;


function buildMap() {
  for (let row = 0; row < map[0].length; row++) {
    for (let col = 0; col < map.length; col++) {
      const tile = { srcX: null, srcY: 0, x: null, y: null };
      switch (map[col][row]) {
        case topLeftCorner:
          tile.srcX = 0;
          break;
        case topRightCorner:
          tile.srcX = 8;
          break;
        case bottomLeftCorner:
          tile.srcX = 16;
          break
        case bottomRightCorner:
          tile.srcX = 24;
          break;
        case horMiddle:
          tile.srcX = 32;
          break;
        case vertMiddle:
          tile.srcX = 40;
          break;
        case floor:
          tile.srcX = 48;
      }

      tile.x = row * SIZE;
      tile.y = col * SIZE;

      tiles.push(tile);
    }
  }
}

function resize() {
  cWidth = window.innerWidth;
  cHeight = window.innerHeight;
  // ratio of the native game size width to height
  const nativeRatio = nWidth / nHeight;
  const browserWindowRatio = cWidth / cHeight;

  // the browser window is too wide
  if (browserWindowRatio > nativeRatio) {
    // take up 90% of window height divisible by tile size
    // height must be changed first since width is based on it
    cHeight = Math.floor(cHeight * windowPercentage);
    // if (cHeight > maxWidth) cHeight = maxHeight;
    cWidth = Math.floor(cHeight * nativeRatio);
  } else {
    // browser window is too high
    // take up 90% of window width divisible by tile size
    // width must be changed first since height is based on it
    cWidth = Math.floor(cWidth * windowPercentage);
    // if (cWidth > maxWidth) cWidth = maxWidth;
    cHeight = Math.floor(cWidth / nativeRatio);
  }


  // set the canvas style width and height to the new width and height
  ctx.canvas.style.width = `${cWidth}px`;
  ctx.canvas.style.height = `${cHeight}px`;
  // ctx.imageSmoothingEnabled = false;
  console.log(ctx.canvas.style.height, ctx.canvas.style.width)
}

function render() {
  tiles.forEach(tile => {
    ctx.drawImage(tilesheet, tile.srcX, tile.srcY, SIZE, SIZE, tile.x, tile.y, SIZE, SIZE)
  })
}

window.addEventListener('resize', () => {
  resize();
  render();
})

window.addEventListener('load', () => {
  // initialize native height/width
  ctx.canvas.width = cWidth;
  ctx.canvas.height = cHeight;
  buildMap();
  resize();
  render();
})