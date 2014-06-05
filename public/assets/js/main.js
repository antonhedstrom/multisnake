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
  
  function adjustPlayground() {
    var pg = $(Settings.playground.target);
    var playground  = {
      height: pg.innerHeight(),
      width: pg.innerWidth()
    }
    if (playground.height > playground.width) {
      playground.height = playground.width;
    } else {
      playground.width = playground.height;
    }
    pg.width(playground.width).height(playground.height);
  }
  adjustPlayground();

  $(window).resize(adjustPlayground);

  Game.start(Settings.playground);

  //$.cookie('playerID', 'value');
  //console.log($.cookie('name'));
  if($.cookie('name')){
    console.log("got name");
  }


});
