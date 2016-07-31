var gameLogic = {
  playerPosition: 1,
  balance: 1000,
  movePlayer: function(numSpaces) {
    var nextPosition = (this.playerPosition + numSpaces) % 12;
    if (nextPosition === 0) {
      this.playerPosition = 1;
    } else {
      this.playerPosition = nextPosition;
    }
  },
  roll: function() {
    return Math.floor(Math.random() * 5) + 1;
  },
  takeTurn: function() {
    var start = this.playerPosition;
    var die = this.roll();
    if (start + die >= 12) {
      this.balance += 200;
    }
    this.movePlayer(die);
    return this.playerPosition;
  }
}

module.exports = gameLogic;
