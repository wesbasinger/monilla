var assert = require('chai').assert;

var gameLogic = require('../components/gameLogic');

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
    assert.equal(startingBalance, 1000);
  });
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
