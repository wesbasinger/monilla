var globals = require('./globals');
var background = require('./background');
const ctx = globals.ctx;
const playerBoxPadding = globals.playerBoxPadding;
const tileSize = globals.tileSize;


var gameUI = {
  drawHelper: function(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, playerBoxPadding, playerBoxPadding);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  },
  drawPlayer: function(squareNumber) {
    if (squareNumber === 1) {
      this.drawHelper(playerBoxPadding*3/2, playerBoxPadding*3/2);
    } else if (squareNumber === 2) {
      this.drawHelper(playerBoxPadding*3/2 + tileSize, playerBoxPadding*3/2);
    } else if (squareNumber === 3) {
      this.drawHelper(playerBoxPadding*3/2 + 2*tileSize, playerBoxPadding*3/2);
    } else if (squareNumber === 4) {
      this.drawHelper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2);
    } else if (squareNumber === 5) {
      this.drawHelper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2 + tileSize);
    } else if (squareNumber === 6) {
      this.drawHelper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2 + 2*tileSize);
    } else if (squareNumber === 7) {
      this.drawHelper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2 + 3*tileSize);
    } else if (squareNumber === 8) {
      this.drawHelper(playerBoxPadding*3/2 + 2*tileSize, playerBoxPadding*3/2 + 3*tileSize);
    } else if (squareNumber === 9) {
      this.drawHelper(playerBoxPadding*3/2 + tileSize, playerBoxPadding*3/2 + 3*tileSize);
    } else if (squareNumber === 10) {
      this.drawHelper(playerBoxPadding*3/2, playerBoxPadding*3/2 + 3*tileSize);
    } else if (squareNumber === 11) {
      this.drawHelper(playerBoxPadding*3/2, playerBoxPadding*3/2 + 2*tileSize);
    } else if (squareNumber === 12) {
      this.drawHelper(playerBoxPadding*3/2, playerBoxPadding*3/2 + tileSize);
    }
  },
  animate: function(start, numMoves) {
    var self = this;
    var start = start
    var interval = setInterval(function() {
      background.draw();
      self.drawPlayer(start);
      start ++;
      if (start === numMoves + 2) {
        clearInterval(interval);
      }
    }, 1000);
  }
}

module.exports = gameUI;
