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
  'network',
  'jquerycookie',
  'game',
  'timer'
], function(
  $,
  Network,
  Cookie,
  Game,
  Timer
) {

  Game.start();

  //$.cookie('playerID', 'value');
  //console.log($.cookie('name'));
  if($.cookie('name')){
    console.log("got name");
  }

  $.ajax({
    url: '/getgame',
    method: 'GET'
  }).done(function(data){
    console.log(data);
  });

});
