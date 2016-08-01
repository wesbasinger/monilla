var background = require('./components/background');
var gameUI = require('./components/gameUI');
var gameLogic = require('./components/gameLogic');
var gameEmitter = require('./components/gameEmitter');

background.draw();
gameUI.drawPlayer(1);

var currentBalance = document.getElementById('current-balance');
currentBalance.innerText = gameLogic.balance;


var rollButton = document.getElementById('roll-dice');
rollButton.onclick = function(e) {
  var start = gameLogic.playerPosition;
  background.draw();
  var turn = gameLogic.takeTurn();
  gameUI.drawPlayer(turn);
  currentBalance.innerText = gameLogic.balance;
}

gameEmitter.on('communityChest', function(data) {
  console.log(data);
});
