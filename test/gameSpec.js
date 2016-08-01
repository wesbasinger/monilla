var assert = require('chai').assert;

var gameLogic = require('../components/gameLogic');
const gameData = require('../components/gameData')

describe('Move Player', function() {
  it('should start with player position on 1', function() {
    assert.equal(gameLogic.playerPosition, 1);
  });
  it('should put the player on square 2 after moving one space', function() {
    gameLogic.movePlayer(1);
    assert.equal(gameLogic.playerPosition, 2);
  });
  it('should be able to move six spaces', function() {
    gameLogic.movePlayer(6);
    assert.equal(gameLogic.playerPosition, 8);
  });
  it('should be able to move six MORE spaces', function() {
    gameLogic.movePlayer(6);
    assert.equal(gameLogic.playerPosition, 2);
  });
});

describe('Balance', function() {
  it('should start with a 1000 balance', function() {
    var startingBalance = gameLogic.balance;
    assert.equal(startingBalance, gameData.initialBalance);
  });
  it('should start with 40000 net worth', function() {
    assert.equal(gameLogic.netWorth(), gameData.initialBalance);
  })
});

describe('Rolling', function() {
  it('should return a number between 1 and 6', function() {
    for (var i=0; i<25; i++) {
      var die = gameLogic.roll();
      assert.isAtLeast(die, 1);
      assert.isAtMost(die, 6);
    }
  });
  it('should move a player forward with turn', function() {
    var startingPosition = gameLogic.playerPosition;
    gameLogic.takeTurn();
    assert.notEqual(gameLogic.playerPosition, startingPosition);
  });
});


describe('Community Chest', function() {
  it('should get a execute Community Chest Function', function() {
    var beginningBalance = gameLogic.balance;
    gameLogic.communityChest();
    assert.notEqual(beginningBalance, gameLogic.balance);
  });
});

describe('Central Transportation', function() {
  it('should deduct $800 for air travel', function() {
    var beginningBalance = gameLogic.balance;
    gameLogic.centralTransportation(3);
    assert.equal(gameLogic.balance, beginningBalance - 800);
  });
  it('should deduct $50 for land travel', function() {
    var beginningBalance = gameLogic.balance;
    gameLogic.centralTransportation(7);
    assert.equal(gameLogic.balance, beginningBalance - 50)
  });
  it('should deduct $400 for sea travel', function() {
    var beginningBalance = gameLogic.balance;
    gameLogic.centralTransportation(9);
    assert.equal(gameLogic.balance, beginningBalance - 400);
  });
  it('should deduct $100 for rail travel', function() {
    var beginningBalance = gameLogic.balance;
    gameLogic.centralTransportation(12);
    assert.equal(gameLogic.balance, beginningBalance - 100);
  });
});

describe('Real Estate', function() {
  it('should deduct $100 for a stay at a hotel', function() {
    var beginningBalance = gameLogic.balance;
    gameLogic.realEstate(5);
    assert.equal(gameLogic.balance, beginningBalance - 100);
  });
  it('should deduct $20 for a stay in a house', function() {
    var beginningBalance = gameLogic.balance;
    gameLogic.realEstate(8);
    assert.equal(gameLogic.balance, beginningBalance - 20);
  });
  it('should not deduct for an office visit', function() {
    var beginningBalance = gameLogic.balance;
    gameLogic.realEstate(10);
    assert.equal(gameLogic.balance, beginningBalance);
  });
});

describe('Initial Investments', function() {
  it('should have an initial investmet of zero in air', function() {
    assert.equal(gameLogic.investment.air, 0);
  });
  it('should have an initial investmet of zero in hotel', function() {
    assert.equal(gameLogic.investment.hotel, 0);
  });
  it('should have an initial investmet of zero in land', function() {
    assert.equal(gameLogic.investment.land, 0);
  });
  it('should have an initial investmet of zero in house', function() {
    assert.equal(gameLogic.investment.house, 0);
  });
  it('should have an initial investmet of zero in sea', function() {
    assert.equal(gameLogic.investment.sea, 0);
  });
  it('should have an initial investmet of zero in office', function() {
    assert.equal(gameLogic.investment.office, 0);
  });
  it('should have an initial investmet of zero in rail', function() {
    assert.equal(gameLogic.investment.rail, 0);
  });
});

describe('Investing', function() {
  it('should be able to invest into air account', function() {
    gameLogic.balance = 1000;
    var beginningBalance = gameLogic.balance;
    gameLogic.invest("air", 1000);
    assert.equal(gameLogic.balance, beginningBalance - 1000);
    assert.equal(gameLogic.investment.air, 1000);
  });
  it('should be able to invest into hotel account', function() {
    gameLogic.balance = 1000;
    var beginningBalance = gameLogic.balance;
    gameLogic.invest("hotel", 1000);
    assert.equal(gameLogic.balance, beginningBalance - 1000);
    assert.equal(gameLogic.investment.hotel, 1000);
  });
  it('should be able to invest into land account', function() {
    gameLogic.balance = 1000;
    var beginningBalance = gameLogic.balance;
    gameLogic.invest("land", 1000);
    assert.equal(gameLogic.balance, beginningBalance - 1000);
    assert.equal(gameLogic.investment.land, 1000);
  });
  it('should be able to invest into house account', function() {
    gameLogic.balance = 1000;
    var beginningBalance = gameLogic.balance;
    gameLogic.invest("house", 1000);
    assert.equal(gameLogic.balance, beginningBalance - 1000);
    assert.equal(gameLogic.investment.house, 1000);
  });
  it('should be able to invest into sea account', function() {
    gameLogic.balance = 1000;
    var beginningBalance = gameLogic.balance;
    gameLogic.invest("sea", 1000);
    assert.equal(gameLogic.balance, beginningBalance - 1000);
    assert.equal(gameLogic.investment.sea, 1000);
  });
  it('should be able to invest into office account', function() {
    gameLogic.balance = 1000;
    var beginningBalance = gameLogic.balance;
    gameLogic.invest("office", 1000);
    assert.equal(gameLogic.balance, beginningBalance - 1000);
    assert.equal(gameLogic.investment.office, 1000);
  });
  it('should be able to invest into rail account', function() {
    gameLogic.balance = 1000;
    var beginningBalance = gameLogic.balance;
    gameLogic.invest("rail", 1000);
    assert.equal(gameLogic.balance, beginningBalance - 1000);
    assert.equal(gameLogic.investment.rail, 1000);
  });

  it('should be able to pay dividends on investments', function() {
    gameLogic.balance = 1000;
    var beginningBalance = gameLogic.balance;
    gameLogic.payDividends();
    assert.isAbove(gameLogic.balance, beginningBalance);
  })
});

describe('Ownership', function() {
  it('should initally return false on all squares', function() {
    gameLogic.investment.sea = 0;
    gameLogic.investment.air = 0;
    gameLogic.investment.hotel = 0;
    gameLogic.investment.land = 0;
    gameLogic.investment.house = 0;
    gameLogic.investment.office = 0;
    gameLogic.investment.rail = 0;
    assert.equal(gameLogic.checkOwned(1), false);
    assert.equal(gameLogic.checkOwned(2), false);
    assert.equal(gameLogic.checkOwned(3), false);
    assert.equal(gameLogic.checkOwned(4), false);
    assert.equal(gameLogic.checkOwned(5), false);
    assert.equal(gameLogic.checkOwned(6), false);
    assert.equal(gameLogic.checkOwned(7), false);
    assert.equal(gameLogic.checkOwned(8), false);
    assert.equal(gameLogic.checkOwned(9), false);
    assert.equal(gameLogic.checkOwned(10), false);
    assert.equal(gameLogic.checkOwned(11), false);
    assert.equal(gameLogic.checkOwned(12), false);
  });
  it('should then return true on ownable props', function() {
    gameLogic.investment.sea = 1000000000000;
    gameLogic.investment.air = 10000000000;
    gameLogic.investment.hotel = 100000000000;
    gameLogic.investment.land = 10000000000000;
    gameLogic.investment.house = 1000000000000;
    gameLogic.investment.office = 100000000000;
    gameLogic.investment.rail = 10000000000000;
    assert.equal(gameLogic.checkOwned(1), false);
    assert.equal(gameLogic.checkOwned(2), false);
    assert.equal(gameLogic.checkOwned(3), false);
    assert.equal(gameLogic.checkOwned(4), false);
    assert.equal(gameLogic.checkOwned(5), true);
    assert.equal(gameLogic.checkOwned(6), false);
    assert.equal(gameLogic.checkOwned(7), false);
    assert.equal(gameLogic.checkOwned(8), true);
    assert.equal(gameLogic.checkOwned(9), false);
    assert.equal(gameLogic.checkOwned(10), true);
    assert.equal(gameLogic.checkOwned(11), false);
    assert.equal(gameLogic.checkOwned(12), false);
  })
})
