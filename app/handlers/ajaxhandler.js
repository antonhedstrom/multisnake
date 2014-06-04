var players = require('../players');

module.exports = function(io){
  return {
    getgame: function(req, res){

      var newPlayer = {
        startPos: {x: Math.random(), y: Math.random()}
      };

      //console.log(players.playerList);
      /*if(!isInArray(newPlayer, players.playerList)){
        console.log("is not in array");
      }*/

      // add player
      var playerObj = players.addPlayer(newPlayer);
      
      // publish to participants
      io.sockets.emit('newPlayer', playerObj.me);
      res.json(playerObj);
    }
  }
};