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

  var eventArray = {
    newPlayer: [],
    deadPlayer: [],
    movePlayer: []
  };

  function addEventListener(event, listener) {
    eventArray[event].push(listener);
  }

  // Add event callbacks
  addEventListener('newPlayer', function(player) {
    console.log("New player!", player);
  });

  addEventListener('deadPlayer', function(player) {
    console.log("Player died :( Fuck him.", player);
  });


  // Add handlers without callback method
  socket.on('connect', function() {
    console.log("Connected");
  });

  socket.on('disconnect', function() {
    console.log("Disconnect");
    socket.emit('score');
  });
  

  // real ones
  socket.on('newPlayer', function(player) {
    var events = eventArray['newPlayer'];
    $.each(events, function(idx, event) {
      event(player);
    });
  });

  socket.on('deadPlayer', function(player) {
    var events = eventArray['deadPlayer'];
    $.each(events, function(idx, event) {
      event(player);
    });
  });

  socket.on('movePlayer', function(data) {
    var events = eventArray['movePlayer'];
    $.each(events, function(idx, event) {
      event(data);
    });
  });

/*
  socket.on('newFood', function(food){
    console.log("food generated", food);
  });

  socket.on('foodEaten', function(food){
    console.log("food has been eaten", food);
  });

  socket.on('movePlayer', function(data) {
    // data: { player: {...}, turn: "left|right"}
    console.log("Player moved: ", data.playerId);
  });
  */

  var API = {
    addEventListener: addEventListener,
    removePlayer: function(player){
      console.log(player);
      socket.emit('dead', player);
    },
    makeMove: function(player, action, body){
      console.log(player);
      socket.emit('movement', { player: player.playerId, action: action, body: body });
    },
    deadPlayer: function() {

    }
  };

  exports = API;

  return exports;
});
