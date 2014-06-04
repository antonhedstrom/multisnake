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
    movement: function( data ){
      console.log("YAY I got a movement!");
      io.emit('movePlayer', {player: data.player, turn: data.turn});
    },
    score: function(){

    },
    dead: function(player){
      io.emit('deadPlayer', player)
    },
    init: function( data ){
      console.log("YAY I got someone that wants to play snake!!");

      // Create the new user
 
      
    }
  }
};