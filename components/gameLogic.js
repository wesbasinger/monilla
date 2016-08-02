const gameData = require('./gameData');
var gameEmitter = require('./gameEmitter');

var gameLogic = {
  playerPosition: 1,
  balance: gameData.initialBalance,
  investment: {
    air: 0,
    hotel: 0,
    land: 0,
    house: 0,
    sea: 0,
    office: 0,
    rail: 0
  },
  netWorth: function() {
    return this.balance + this.investment.air + this.investment.hotel +
           this.investment.land + this.investment.house + this.investment.sea +
           this.investment.office + this.investment.rail;
  },
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
      gameEmitter.emit('passedGo');
      gameEmitter.emit('updateFinancials');
    }
    this.movePlayer(die);
    if (this.playerPosition === 2 || this.playerPosition === 4 || this.playerPosition === 6 || this.playerPosition === 11) {
      this.communityChest();
    } else if (this.playerPosition === 3 ||
               this.playerPosition === 7 ||
               this.playerPosition === 9 ||
               this.playerPosition === 12) {
      this.centralTransportation(this.playerPosition);
      gameEmitter.emit('investmentInterface', {property: this.playerPosition, context: 'centralTransportation'});
    } else if (this.playerPosition === 5 ||
               this.playerPosition === 8 ||
               this.playerPosition === 10) {
      this.realEstate(this.playerPosition);
      gameEmitter.emit('investmentInterface', {property: this.playerPosition, context: 'realEstate'});
    }
    if (this.netWorth() >= gameData.winningBalance) {
      gameEmitter.emit('gameWon');
    }
    return this.playerPosition;
  },
  communityChest: function() {
    var random = Math.floor(Math.random() * (gameData.communityChest.length - 1));
    var card = gameData.communityChest[random];
    this.balance += card.net;
    gameEmitter.emit('updateFinancials');
    gameEmitter.emit('communityChest', {message: card.description});
  },
  centralTransportation: function(square) {
    var randDest = gameData.destinations[Math.floor(Math.random() * gameData.destinations.length)];
    if (square === 3) { // air
      this.balance -= 800;
      gameEmitter.emit(
        'centralTransportation',
        {
          message: `You bought an air ticket to ${randDest}.  It cost $800`
        }
      );
    } else if (square === 7) {
      this.balance -= 50;
      gameEmitter.emit(
        'centralTransportation',
        {
          message: `You bought an land ticket to ${randDest}.  It cost $50`
        }
      );
    } else if (square === 9) {
      this.balance -= 400;
      gameEmitter.emit(
        'centralTransportation',
        {
          message: `You bought an sea ticket to ${randDest}.  It cost $400`
        }
      );
    } else if (square === 12) {
      this.balance -= 100;
      gameEmitter.emit(
        'centralTransportation',
        {
          message: `You bought an rail ticket to ${randDest}.  It cost $100`
        }
      );
    }
    gameEmitter.emit('updateFinancials');
  },
  realEstate: function(square) {
    var randDest = gameData.destinations[Math.floor(Math.random() * gameData.destinations.length)];
    if (square === 5) {
      if (this.checkOwned(square)) {
        gameEmitter.emit('realEstate', {message: `You stayed at your hotel in ${randDest}.  It was nice!`})
      } else {
        this.balance -= 100;
        gameEmitter.emit(
          'realEstate',
          {
            message: `You stayed at a hotel in ${randDest}.  It cost $100.`
          }
        );
        gameEmitter.emit('updateFinancials');
      }
    } else if (square === 8) {
      if (this.checkOwned(square)) {
        gameEmitter.emit('realEstate', {message: `You stayed at your house in ${randDest}.  It was nice!`})
      } else {
        this.balance -= 20;
        gameEmitter.emit(
          'realEstate',
          {
            message: `You stayed in a house in ${randDest}.  It cost $20`
          }
        );
        gameEmitter.emit('updateFinancials');
      }
    } else if (square === 10) {
      if (this.checkOwned(square)) {
        gameEmitter.emit('realEstate', {message: `You visted at your office in ${randDest}.  It was nice!`})
      } else {
        gameEmitter.emit(
          'realEstate',
          {
            message: `You visited an office in ${randDest}.`
          }
        );
      }
    }
  },
  invest: function(asset, amount) {
    if (this.balance < amount) {
      return {error: "You do not have sufficient funds."}
    } else {
      this.balance -= amount;
      this.investment[asset] += parseInt(amount);
      gameEmitter.emit('updateFinancials');
    }
  },
  payDividends: function() {
    var investments = Object.keys(this.investment);
    investments.forEach(asset => {
      this.balance += this.investment[asset] * (gameData.interestRate[asset]);
    });
    gameEmitter.emit('updateFinancials');
  },
  checkOwned: function(square) {
    if (square === 5) {
      if (this.investment.hotel >= gameData.values.hotel) {
        return true;
      } else {
        return false;
      }
    } else if (square === 8 ) {
      if (this.investment.house >= gameData.values.house) {
        return true;
      } else {
        return false;
      }
    } else if (square === 10) {
      if (this.investment.office >= gameData.values.house) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

module.exports = gameLogic;
