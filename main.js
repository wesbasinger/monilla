const background = require('./components/background');
const gameData = require('./components/gameData');
var gameUI = require('./components/gameUI');
var gameLogic = require('./components/gameLogic');
var gameEmitter = require('./components/gameEmitter');


background.draw();
gameUI.drawPlayer(1);

var   seaRate = document.getElementById('sea-rate'),
      landRate = document.getElementById('land-rate'),
      airRate = document.getElementById('air-rate'),
      railRate = document.getElementById('rail-rate'),
      hotelRate = document.getElementById('hotel-rate'),
      houseRate = document.getElementById('house-rate'),
      officeRate = document.getElementById('office-rate');
seaRate.innerText = gameData.interestRate["sea"];
landRate.innerText = gameData.interestRate["land"];
airRate.innerText = gameData.interestRate["air"];
railRate.innerText = gameData.interestRate["rail"];
hotelRate.innerText = gameData.interestRate["hotel"];
houseRate.innerText = gameData.interestRate["house"];
officeRate.innerText = gameData.interestRate["office"];

var currentBalance = document.getElementById('current-balance');
currentBalance.innerText = gameLogic.balance.toFixed(2).replace(/./g, function(c, i, a) {
    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
});

var messages = document.getElementById('messages');
var decisionBox = document.getElementById('user-decision-box');


var rollButton = document.getElementById('roll-dice');
rollButton.onclick = function(e) {
  var start = gameLogic.playerPosition;
  background.draw();
  var turn = gameLogic.takeTurn();
  gameUI.drawPlayer(turn);
  currentBalance.innerText = gameLogic.balance.toFixed(2).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
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
  gameEmitter.emit('updateFinancials');
  messages.innerText = ""
  messages.innerText += "You passed Go!";
});

gameEmitter.on('investmentInterface', function(data) {
  decisionBox.innerHTML = "";
  var text = document.createElement("p");
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
      input.style.visibility = 'hidden';
      button.style.visibility = "hidden";
    }

  }
  decisionBox.appendChild(button);
})

gameEmitter.on('gameWon', function() {
  rollButton.style.visibility = "hidden";
  decisionBox.innerHTML = null;
  messages.innerHTML = "";
  messages.innerText = "You win!  Game over.  Congrats on making it millionaire status."
});

gameEmitter.on('updateFinancials', function() {
  currentBalance.innerText = "";
  currentBalance.innerText = gameLogic.balance.toFixed(2).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
  var net = document.getElementById('net-worth');
  net.innerText = "";
  net.innerText = gameLogic.netWorth().toFixed(2).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
  var seaAmount = document.getElementById('sea-amount'),
      landAmount = document.getElementById('land-amount'),
      airAmount = document.getElementById('air-amount'),
      railAmount = document.getElementById('rail-amount'),
      hotelAmount = document.getElementById('hotel-amount'),
      houseAmount = document.getElementById('house-amount'),
      officeAmount = document.getElementById('office-amount');
  seaAmount.innerText = "";
  seaAmount.innerText = gameLogic.investment.sea;
  landAmount.innerText = "";
  landAmount.innerText = gameLogic.investment.land;
  airAmount.innerText = "";
  airAmount.innerText = gameLogic.investment.air;
  railAmount.innerText = "";
  railAmount.innerText = gameLogic.investment.rail;
  hotelAmount.innerText = "";
  hotelAmount.innerText = gameLogic.investment.hotel;
  houseAmount.innerText = "";
  houseAmount.innerText = gameLogic.investment.house;
  officeAmount.innerText = "";
  officeAmount.innerText = gameLogic.investment.office;
})
