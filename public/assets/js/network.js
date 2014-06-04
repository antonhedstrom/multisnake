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
  });

  socket.on('newPlayer', function(player) {
    console.log("New player!", player);
  });

  socket.on('deadPlayer', function(player) {
    console.log("Player died :( Fuck him.", player);
  });

  socket.on('movePlayer', function(data) {
    // data: { player: {...}, turn: "left|right"}
    console.log("Player died :( Fuck him.", data);
  });

  return exports;
});
