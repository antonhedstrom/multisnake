var playerlist = [];

module.exports = {

  numberOfPlayers: playerlist.length,
  playerList: playerlist,

  addPlayer: function(playerObj){
    playerlist.push(playerObj);
    //console.log(playerlist);
    return playerlist;
  }
}