var EventEmitter = require('events').EventEmitter;

var gameEmitter = new EventEmitter();

gameEmitter.on('passedGo', function() {
  console.log("heard it");
});

module.exports = gameEmitter;
