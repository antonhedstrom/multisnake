var players = require('../players');

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
    movement: function(data){
      console.log("YAY I got a movement!");
    },
    score: function(){

    },
    dead: function(){

    },
    init: function( data ){
      console.log("YAY I got someone that wants to play snake!!");

      // Create the new user
      var newPlayer = {
        playerId: players.numberOfPlayers + 1,
        startPos: {x: 4, y: 8}
      };

      //console.log(players.playerList);
      /*if(!isInArray(newPlayer, players.playerList)){
        console.log("is not in array");
      }*/

      // add player
      players.addPlayer(newPlayer);
      
      // publish to participants
      io.emit('newPlayer', newPlayer);
      
    }
  }
};