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
      console.log('Got disconnect! But can not do anything about it');

      var i = allClients.indexOf(currentSocket);

      delete allClients[i];
    },
    movement: function( data ){
      console.log("YAY I got a movement!");
      console.log(data);
      io.sockets.emit('movePlayer', { playerId: data.player, action: data.action });
    },
    score: function(){
      console.log("score event");
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