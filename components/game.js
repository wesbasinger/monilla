var globals = require('./globals');
const ctx = globals.ctx;
const playerBoxPadding = globals.playerBoxPadding;
const tileSize = globals.tileSize;

var game = {
  helper: function(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, playerBoxPadding, playerBoxPadding);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  },
  playerPosition: 1,
  drawPlayer: function(squareNumber) {
    if (squareNumber === 1) {
      this.helper(playerBoxPadding*3/2, playerBoxPadding*3/2);
    } else if (squareNumber === 2) {
      this.helper(playerBoxPadding*3/2 + tileSize, playerBoxPadding*3/2);
    } else if (squareNumber === 3) {
      this.helper(playerBoxPadding*3/2 + 2*tileSize, playerBoxPadding*3/2);
    } else if (squareNumber === 4) {
      this.helper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2);
    } else if (squareNumber === 5) {
      this.helper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2 + tileSize);
    } else if (squareNumber === 6) {
      this.helper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2 + 2*tileSize);
    } else if (squareNumber === 7) {
      this.helper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2 + 3*tileSize);
    } else if (squareNumber === 8) {
      this.helper(playerBoxPadding*3/2 + 2*tileSize, playerBoxPadding*3/2 + 3*tileSize);
    } else if (squareNumber === 9) {
      this.helper(playerBoxPadding*3/2 + tileSize, playerBoxPadding*3/2 + 3*tileSize);
    } else if (squareNumber === 10) {
      this.helper(playerBoxPadding*3/2, playerBoxPadding*3/2 + 3*tileSize);
    } else if (squareNumber === 11) {
      this.helper(playerBoxPadding*3/2, playerBoxPadding*3/2 + 2*tileSize);
    } else if (squareNumber === 12) {
      this.helper(playerBoxPadding*3/2, playerBoxPadding*3/2 + tileSize);
    }
  }
}

module.exports = game;
