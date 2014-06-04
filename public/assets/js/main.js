require.config({
    baseUrl: '/assets/js',
    paths: {
        jquery: 'libs/jquery-2.0.3.min',
        socketIO: 'libs/socket.io-1.0.4'
    }
  });

require([
  'jquery',
  'socketIO',
  'game',
  'snake',
  'snake_plugin',
  'timer'
], function(
  $,
  io,
  Game,
  Snake,
  SnakePlugin,
  Timer
) {

  //Game.init();
  $("#game").snake();

  var socket = io('http://localhost');
  socket.emit("new");
  socket.on('connect', function(){
    console.log("Connect");

    socket.on('event', function(data){
      console.log("Event");
    });
    socket.on('disconnect', function(){
      console.log("Disconnect");
    });
  });

});
