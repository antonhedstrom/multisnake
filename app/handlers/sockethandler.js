var players = require('../players');
var allClients = [];
var currentSocket;

var isInArray = function(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
};

module.exports = function(io){
  return {
    addClient: function(socket){
      allClients.push(socket);
    },
    disconnect: function(){
      console.log('Got disconnect!');

      var i = allClients.indexOf(currentSocket);
      delete allClients[i];
    },
    movement: function( data ){
      console.log("YAY I got a movement!");
      io.sockets.emit('movePlayer', {player: data.player, turn: data.turn});
    },
    score: function(){

    },
    dead: function(player){
      players.removePlayer(player);
      io.sockets.emit('deadPlayer', player)
    },
    foodTaken: function(food){
      io.sockets.emit('foodEaten', food);
      // do something with foodz
    }
  }
};