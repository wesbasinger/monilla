var globals = require('./globals');

const canvas = globals.canvas;
const ctx = globals.ctx;

const tileSize = globals.tileSize;
const xPadding = globals.xPadding;
const yPadding = globals.yPadding;
const playerBoxPadding = globals.playerBoxPadding;

var background = {
  grid : [
    [1,  12, 11, 10],
    [2, 0, 0, 9],
    [3, 0, 0, 8],
    [4, 5, 6, 7]
  ],
  draw: function() {
    var helper = function(color) {
      ctx.beginPath();
      ctx.rect(tileSize*i, tileSize*j, tileSize, tileSize);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
      if (color !== '#4ABDAC') {
        ctx.beginPath();
        ctx.rect(
          tileSize*i + playerBoxPadding,
          tileSize*j + playerBoxPadding,
          playerBoxPadding*2,
          playerBoxPadding*2
        );
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
      }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i=0; i<this.grid.length; i++) {
      for (var j=0; j<this.grid[0].length; j++) {
        // background
        if (this.grid[i][j] === 0) {
          helper('#4ABDAC');
          //start square top left
        } else if (this.grid[i][j] === 1) {
          helper('#FC1A4A');
          ctx.fillStyle = 'black';
          ctx.font = "20px Arial";
          ctx.fillText("Start", tileSize*i + xPadding, tileSize*j + yPadding);
        } else if (this.grid[i][j] === 2) {
          helper('#F7B733');
        } else if (this.grid[i][j] === 3) {
          helper('#DFDCE3');
        } else if (this.grid[i][j] === 4) {
          helper('#F7B733');
        } else if (this.grid[i][j] === 5) {
          helper('#FC1A4A');
        } else if (this.grid[i][j] === 6) {
          helper('#F7B733');
        } else if (this.grid[i][j] === 7) {
          helper('#DFDCE3');
        } else if (this.grid[i][j] === 8) {
          helper('#FC1A4A');
        } else if (this.grid[i][j] === 9) {
          helper('#DFDCE3');
        } else if (this.grid[i][j] === 10) {
          helper('#FC1A4A');
        } else if (this.grid[i][j] === 11) {
          helper('#F7B733');
        } else if (this.grid[i][j] === 12) {
          helper('#DFDCE3');
        }
      }
    }
  }
}

module.exports = background;
