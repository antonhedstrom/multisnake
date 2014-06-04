require.config({
    baseUrl: '/assets/js',
    paths: {
        jquery: 'libs/jquery-2.0.3.min',
        socketIO: 'libs/socket.io-1.0.4',
        jquerycookie: 'libs/jquery.cookie'
    }
  });

require([
  'jquery',
  'socketIO',
  'jquerycookie',
  'game',
  'snake',
  'snake_plugin',
  'timer'
], function(
  $,
  io,
  cookie,
  Game,
  Snake,
  SnakePlugin,
  Timer
) {

  //Game.init();
  $("#game").snake();
  $.cookie('playerID', 'value');
  //console.log($.cookie());

  $.ajax({
    url: '/init',
    method: 'POST'
  }, function(){
    console.log("lol");
  });

  // Create socket
  var socket = io('http://localhost');

  // init game
  socket.emit("init");

  socket.on('newPlayers', function( players ){
    console.log(players);
  });


});
