const background = require('./components/background');
const gameData = require('./components/gameData');
var gameUI = require('./components/gameUI');
var gameLogic = require('./components/gameLogic');
var gameEmitter = require('./components/gameEmitter');


background.draw();
gameUI.drawPlayer(1);

var currentBalance = document.getElementById('current-balance');
currentBalance.innerText = gameLogic.balance;

var messages = document.getElementById('messages');


var rollButton = document.getElementById('roll-dice');
rollButton.onclick = function(e) {
  var start = gameLogic.playerPosition;
  background.draw();
  var turn = gameLogic.takeTurn();
  gameUI.drawPlayer(turn);
  currentBalance.innerText = gameLogic.balance;
}

gameEmitter.on('communityChest', function(data) {
  messages.innerText = "";
  messages.innerText = data.message;
});

gameEmitter.on('centralTransportation', function(data) {
  messages.innerText = "";
  messages.innerText = data.message;
});

gameEmitter.on('realEstate', function(data) {
  messages.innerText = "";
  messages.innerText = data.message;
});

gameEmitter.on('passedGo', function() {
  gameLogic.balance += gameData.salary;
  messages.innerText += "You passed Go!";
})
