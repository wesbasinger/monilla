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
var decisionBox = document.getElementById('user-decision-box');


var rollButton = document.getElementById('roll-dice');
rollButton.onclick = function(e) {
  var start = gameLogic.playerPosition;
  background.draw();
  var turn = gameLogic.takeTurn();
  gameUI.drawPlayer(turn);
  currentBalance.innerText = gameLogic.balance;
}

gameEmitter.on('communityChest', function(data) {
  decisionBox.innerHTML = "";
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
  gameLogic.payDividends();
  messages.innerText += "You passed Go!";
});

gameEmitter.on('investmentInterface', function(data) {
  decisionBox.innerHTML = "";
  var text = document.createElement("h1");
  if (data.context === "realEstate") {
    text.innerText = "Would you like to invest in real estate?  If so, put a number in the box and confirm."
  } else if (data.context === "centralTransportation") {
    text.innerText = "Would you like to invest in transportation?  If so, put a number in the box and confirm."
  }
  decisionBox.appendChild(text);

  var input = document.createElement("input");
  input.setAttribute("id", "amount");
  decisionBox.appendChild(input);

  var button = document.createElement("button");
  var bText = document.createTextNode("Confirm");
  button.appendChild(bText);
  button.onclick = function() {
    var asset;
    var squareNumber = data.property;
    if (squareNumber === 3) {
      asset = "air"
    } else if (squareNumber === 5) {
      asset = "hotel"
    } else if (squareNumber === 7) {
      asset = "land"
    } else if (squareNumber === 8) {
      asset = "house"
    } else if (squareNumber === 9) {
      asset = "sea"
    } else if (squareNumber === 10) {
      asset = "office"
    } else if (squareNumber === 12) {
      asset = "rail"
    }
    var possibleError = gameLogic.invest(asset, input.value);
    input.value = "";
    if (possibleError) {
      text.innerText = "";
      text.innerText = possibleError.error;
    } else {
      text.innerText = "";
      text.innerText = "Investment was successful!"
      input.setAttribute("visibility", "hidden");
      button.setAttribute("visibility", "hidden");
    }

  }
  decisionBox.appendChild(button);
})
