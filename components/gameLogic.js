var gameLogic = {
  playerPosition: 1,
  movePlayer: function(numSpaces) {
    var nextPosition = (this.playerPosition + numSpaces) % 12;
    this.playerPosition = nextPosition;
  },
  roll: function() {
    return Math.floor(Math.random() * 5) + 1;
  },
  takeTurn: function() {
    var die = this.roll();
    this.movePlayer(die);
  }
}

module.exports = gameLogic;
