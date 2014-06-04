require.config({
    baseUrl: '/assets/js',
    paths: {
        jquery: 'libs/jquery-2.0.3.min',
        socketIO: 'libs/socket.io-1.0.4',
        settings: 'settings'
    }
  });

require([
  'jquery',
  'network',
  'game',
  'timer'
], function(
  $,
  Network,
  Game,
  Snake,
  SnakePlugin,
  Timer
) {



});
