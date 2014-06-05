define([
  'jquery',
  'settings',
  'snake',
  'snake_plugin',
  'network',
], function(
  $,
  Settings,
  Snake,
  SnakePlugin,
  Network
){
  var exports = {};

  exports.start = initGame;

  // Array of players
  var players = [];
  //var me = new Snake($(Settings.playground.target), {start_pos: {x: 3, y: 3}});
  var paused = false;

  var defaults = {
    size: {x: 20, y: 11}
  };

  var intervalID;

  function initGame(options) {
    var self = this;
    var settings = $.extend(true, {}, defaults, options);

    buildPlayground(settings);
    initKeyBindings();

    addPlayers(startGame);

    // TODO: Timeout: request new player and add me
  }

  function buildPlayground(settings) {
    var $tiles_container = $("<div />").attr("id","tiles");
    var $tile_row = $("<div />")
      .addClass("tilerow")
      .css({
        width: "100%",
        height: 100/settings.size.y + "%"
      });
    var $tile  = $("<div />")
      .addClass("tile")
      .css({
        width:  100/settings.size.x + "%",
        height: "100%",
      });
    var $score = $("<div />").attr("id", "score");
    var i;
    var $element = $(settings.target);

    for (i = 0; i < settings.size.x; i++) {
      $tile.removeClass("tilecol_" + (i - 1));
      $tile.addClass("tilecol_" + i);
      $tile_row.append($tile.clone());
    }
    for (i = 0; i < settings.size.y; i++) {
      $tile_row.attr("id", "tilerow_" + i);
      $tiles_container.append($tile_row.clone());
    }

    $element.append($tiles_container);
    $element.append($score);
  }

  function initKeyBindings() {
    $("body").keyup(function(e) {
      // Globally used keys
      /*switch(e.keyCode) {
        case 27 : // Escape
          gameover();
          reset();
          break;
        case 13 : // Enter
          //self.gameover();
          break;
        case 32 : // Space
          pauseOrRun();
          break;
      }*/
    });
  }

  function addPlayer(player) {
    var newPlayer = {
      home: $(Settings.playground.target),
      player: player
    };
    players.push(new Snake(newPlayer));

    var newPlayerDiv = $("<div></div>").addClass('player').html('player' + player.playerId);
    $(".players").append(newPlayerDiv);
  }

  function addPlayers(cb) {
    $.ajax({
      url: '/getgame',
      method: 'GET'
    }).done(function(data) {
      var players = data.players;
      for (var i in players) {
        addPlayer(players[i]);
        var newPlayerDiv = $(".players").append($("d"));
        newPlayerDiv.id = "div" + i;
      }
      data.me.isMe = true;
      addPlayer(data.me);
      cb();
    });
  }

  function startGame() {
    $.each(players, function(idx, player) {
      player.start();
    });
    intervalID = window.setInterval(function() {
      $.each(players, function(idx, player) {
        player.tick();
      });
    }, (10 - Settings.game.speed) * 30);
  }

  function pauseOrRun() {
    if ( paused ) {
      run();
    }
    else {
      pause();
    }
    paused = !paused;
  }

  function pause() {
    for (var i in players) {
      players[i].pause();
    }
    $(this).addClass("paused");
  }

  function run() {
    $.each(players, function(idx, player) {
      player[i].run();
    });
    $(this).removeClass("paused");
  }

  function gameover() {
    for (var i in players) {
      players[i].gameover();
      players[i].reset();
    }
    $(this).removeClass("paused");
  }

  function reset() {
    for (var i in players) {
      players[i].reset();
    }
    $(this).removeClass("paused");
  }

  function findSnake(player_id) {
    var snake = false;
    $.each(players, function(idx, player) {
      if ( player.playerId === player_id ) {
        snake = player;
        return false;
      }
    });
    return false;
  }

  return exports;
});
