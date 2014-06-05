define([
  'socketIO',
  'settings'
], function(
  SocketIO,
  Settings
) {
  var exports = {};



  // Open connection
  var socket = SocketIO('http://' + Settings.server.url);

  // Add handlers
  socket.on('connect', function() {
    console.log("Connected");
  });

  socket.on('disconnect', function() {
    console.log("Disconnect");
    socket.emit('score');
  });

  socket.on('newPlayer', function(player) {
    console.log("New player!", player);
  });

  socket.on('deadPlayer', function(player) {
    console.log("Player died :( Fuck him.", player);
  });

  socket.on('newFood', function(food){
    console.log("food generated", food);
  });

  socket.on('foodEaten', function(food){
    console.log("food has been eaten", food);
  });

  socket.on('movePlayer', function(data) {
    // data: { player: {...}, turn: "left|right"}
    console.log("Player moved! Fuck him.", data);
  });

  var API = {
    removePlayer: function(player){
      console.log(player);
      socket.emit('dead', player);
    },
    makeMove: function(player, action){
      console.log(player);
      socket.emit('movement', { player: player.playerId, action: action });
    }
  };

  exports = API;

  return exports;
});
