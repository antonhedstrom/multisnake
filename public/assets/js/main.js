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
  SocketIO,
  Game,
  Snake,
  SnakePlugin,
  Timer
) {

  //Game.init();
  $("#game").snake();

});
