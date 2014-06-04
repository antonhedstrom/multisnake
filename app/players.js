var _ = require('underscore');

var playerlist = [],
    playerId = 0;

module.exports = {

  playerList: playerlist,

  addPlayer: function(playerObj){
    playerId = playerId + 1;
    _.extend(playerObj, {playerId: playerId});


    playerlist.push(playerObj);
    //console.log(playerlist);

    var returnobj = {
      me: playerObj,
      players: playerlist
    }

    return returnobj;
  }
}