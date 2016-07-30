var assert = require('chai').assert;

var gameLogic = require('../components/gameLogic');

describe('Game', function() {
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
