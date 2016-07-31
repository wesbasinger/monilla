var background = require('./components/background');
var gameUI = require('./components/gameUI');
var gameLogic = require('./components/gameLogic');

background.draw();
gameUI.drawPlayer(1);


var rollButton = document.getElementById('roll-dice');
rollButton.onclick = function(e) {
  var start = gameLogic.playerPosition;
  console.log("start :" + start)
  background.draw();
  var turn = gameLogic.takeTurn();
  console.log("final: " + turn);
  gameUI.drawPlayer(turn);
}
