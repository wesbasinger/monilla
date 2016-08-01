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
          ctx.fillText("Start", tileSize*i + xPadding + 20, tileSize*j + yPadding);
          ctx.font = "10px Arial";
          ctx.fillText("Every trip collects $200", tileSize*i + xPadding, tileSize*j + yPadding + 90)
        } else if (this.grid[i][j] === 2 || this.grid[i][j] === 4 || this.grid[i][j] === 6 || this.grid[i][j] === 11) {
          helper('#F7B733');
          ctx.fillStyle = 'black';
          ctx.font = "12px Arial";
          ctx.fillText("Community Chest", tileSize*i + xPadding, tileSize*j + yPadding - 5);
          ctx.font = "8px Arial";
          ctx.fillText("Could be good, could be bad :-)", tileSize*i + xPadding -13, tileSize*j + yPadding + 90)
        } else if (this.grid[i][j] === 3) {
          helper('#DFDCE3');
          ctx.fillStyle = 'black';
          ctx.font = "12px Arial";
          ctx.fillText("Central Transportation", tileSize*i + xPadding - 12, tileSize*j + yPadding - 5);
          ctx.font = "8px Arial";
          ctx.fillText("Air -> Ticket Cost: $800", tileSize*i + xPadding, tileSize*j + yPadding + 90)
        } else if (this.grid[i][j] === 5) {
          helper('#FC1A4A');
          ctx.fillStyle = 'black';
          ctx.font = "12px Arial";
          ctx.fillText("Real Estate", tileSize*i + xPadding + 10, tileSize*j + yPadding - 5);
          ctx.font = "8px Arial";
          ctx.fillText("Hotel -> Stay Price: $100", tileSize*i + xPadding, tileSize*j + yPadding + 85)
          ctx.fillText("Hotel -> Buy Price: $400000", tileSize*i + xPadding, tileSize*j + yPadding + 95)
        } else if (this.grid[i][j] === 7) {
          helper('#DFDCE3');
          ctx.fillStyle = 'black';
          ctx.font = "12px Arial";
          ctx.fillText("Central Transportation", tileSize*i + xPadding - 12, tileSize*j + yPadding - 5);
          ctx.font = "8px Arial";
          ctx.fillText("Land -> Ticket Cost: $50", tileSize*i + xPadding, tileSize*j + yPadding + 90)
        } else if (this.grid[i][j] === 8) {
          helper('#FC1A4A');
          ctx.fillStyle = 'black';
          ctx.font = "12px Arial";
          ctx.fillText("Real Estate", tileSize*i + xPadding + 10, tileSize*j + yPadding - 5);
          ctx.font = "8px Arial";
          ctx.fillText("House -> Stay Price: $20", tileSize*i + xPadding, tileSize*j + yPadding + 85)
          ctx.fillText("House -> Buy Price: $100000", tileSize*i + xPadding, tileSize*j + yPadding + 95)
        } else if (this.grid[i][j] === 9) {
          helper('#DFDCE3');
          ctx.fillStyle = 'black';
          ctx.font = "12px Arial";
          ctx.fillText("Central Transportation", tileSize*i + xPadding - 12, tileSize*j + yPadding - 5);
          ctx.font = "8px Arial";
          ctx.fillText("Sea -> Ticket Cost: $400", tileSize*i + xPadding, tileSize*j + yPadding + 90)
        } else if (this.grid[i][j] === 10) {
          helper('#FC1A4A');
          ctx.fillStyle = 'black';
          ctx.font = "12px Arial";
          ctx.fillText("Real Estate", tileSize*i + xPadding + 10, tileSize*j + yPadding - 5);
          ctx.font = "8px Arial";
          ctx.fillText("Office -> Stay Price: Free", tileSize*i + xPadding, tileSize*j + yPadding + 85)
          ctx.fillText("Office -> Buy Price: $200000", tileSize*i + xPadding, tileSize*j + yPadding + 95)
        } else if (this.grid[i][j] === 12) {
          helper('#DFDCE3');
          ctx.fillStyle = 'black';
          ctx.font = "12px Arial";
          ctx.fillText("Central Transportation", tileSize*i + xPadding - 12, tileSize*j + yPadding - 5);
          ctx.font = "8px Arial";
          ctx.fillText("Rail -> Ticket Cost: $100", tileSize*i + xPadding, tileSize*j + yPadding + 90)
        }
      }
    }
  }
}

module.exports = background;
