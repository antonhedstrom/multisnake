//var io = require('socket.io');

module.exports = function(io){
  return {
    movement: function(){
      console.log("YAY I got a movement!");
    },
    score: function(){

    },
    dead: function(){

    },
    new: function( data ){
      console.log("YAY I got someone that wants to play snake!!");

      io.emit('yolo');
      
    }
  }
};