var players = require('../players');

module.exports = function(io){
  return {
    getgame: function(req, res){

      var newPlayer = {
        startPos: {
          x: Math.floor(Math.random()*4),
          y: Math.floor(Math.random()*8)
        }
      };

      // add player
      var playerObj = players.addPlayer(newPlayer);

      // publish to participants
      io.sockets.emit('newPlayer', playerObj.me);
      res.json(playerObj);
    }
  }
};
