require.config({
    baseUrl: '/assets/js',
    paths: {
        jquery: 'libs/jquery-2.0.3.min',
        socketIO: 'libs/socket.io-1.0.4',
        settings: 'settings',
        jquerycookie: 'libs/jquery.cookie'
    }
  });

require([
  'jquery',
  'jquerycookie',
  'game',
  'settings'
], function(
  $,
  Cookie,
  Game,
  Settings
) {

  Game.start(Settings.playground);

  //$.cookie('playerID', 'value');
  //console.log($.cookie('name'));
  if($.cookie('name')){
    console.log("got name");
  }


});
