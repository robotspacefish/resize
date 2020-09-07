const ctx = document.getElementById('canvas').getContext('2d');

const spritesheet = new Image();
spritesheet.src = './resize.png';

let cells = [];
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

const SIZE = 8;
const nHeight = SIZE * map.length;
const nWidth = SIZE * map[0].length;

const maxWidth = nWidth * 10;
const maxHeight = nHeight * 10;

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

  // if browserWindowRatio > nativeRatio , the browser is too wide
  if (browserWindowRatio > nativeRatio) {
    // take up 90% of window height divisible by cell size
    // height must be changed first since width is based on it
    cHeight = Math.floor(cHeight * 0.9 * SIZE) * SIZE;
    if (cHeight > maxWidth) cHeight = maxHeight;
    cWidth = Math.floor(cHeight * nativeRatio);
  } else {
    // browser window is too high
    // take up 90% of window width divisible by cell size
    // width must be changed first since height is based on it
    cWidth = Math.floor(cWidth * 0.9 / SIZE) * SIZE;
    if (cWidth > maxWidth) cWidth = maxWidth;
    cHeight = Math.floor(cWidth / nativeRatio);
  }

  ctx.canvas.style.width = `${cWidth}px`;
  ctx.canvas.style.height = `${cHeight}px`;

  ctx.imageSmoothingEnabled = false;
}

function render() {
  cells.forEach(cell => {
    ctx.drawImage(spritesheet, cell.srcX, cell.srcY, SIZE, SIZE, cell.x, cell.y, SIZE, SIZE)
  })
}

window.addEventListener('resize', () => {
  resize();
  render();
})

window.addEventListener('load', () => {
  // initialize native height/width
  ctx.canvas.width = nWidth;
  ctx.canvas.height = nHeight;
  resize();
  buildMap();
  render();
})