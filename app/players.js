var _ = require('underscore');

var playerlist = [],
    playerId = 0;

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

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
    };

    return returnobj;
  },
  removePlayer: function(player){
    var pos = arrayObjectIndexOf(playerlist, player.Id, "playerId");
    playerlist.splice(pos, 1);
  }
}


/*
id,
name,
tiles: {
  head
},
color
*/