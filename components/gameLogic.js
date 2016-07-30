var gameLogic = {
  playerPosition: 1,
  movePlayer: function(numSpaces) {
    var nextPosition = (this.playerPosition + numSpaces) % 12;
    this.playerPosition = nextPosition;
  }
}

module.exports = gameLogic;
