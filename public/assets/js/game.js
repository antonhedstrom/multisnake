define([
  'jquery',
  'underscore',
  'settings',
  'snake',
  'snake_plugin',
  'network',
], function(
  $,
  _,
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

  var intervalID_food;

  //Network.addEventListener('newPlayer', addPlayer);
  Network.addEventListener('deadPlayer', removeSnake);
  Network.addEventListener('movePlayer', moveSnake);

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
        height: 100/settings.tiles.y + "%"
      });
    var $tile  = $("<div />")
      .addClass("tile")
      .css({
        width:  100/settings.tiles.x + "%",
        height: "100%",
      });
    var $score = $("<div />").attr("id", "score");
    var i;
    var $element = $(settings.target);

    for (i = 0; i < settings.tiles.x; i++) {
      $tile.removeClass("tilecol_" + (i - 1));
      $tile.addClass("tilecol_" + i);
      $tile_row.append($tile.clone());
    }
    for (i = 0; i < settings.tiles.y; i++) {
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
        if(!_.isEqual(players[i], data.me)){
          addPlayer(players[i]);
          var newPlayerDiv = $(".players").append($("d"));
          newPlayerDiv.id = "div" + i;
        }
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

    intervalID_food = window.setInterval(function() {
      var food_pos = {
        x: Math.floor(Math.random()*Settings.playground.tiles.x),
        y: Math.floor(Math.random()*Settings.playground.tiles.y),
      }

      $(Settings.playground.target)
        .find("#tilerow_" +food_pos.y + " .tilecol_" + food_pos.x)
        .addClass("food");

      console.log("Food!", food_pos);
    }, Math.floor(Math.random()*4000));
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
    var returnVal = false;
    _.each(players, function(snake) {
      if ( snake.player.playerId === player_id ) {
        returnVal = snake;
      }
    });
    return returnVal;
  }

  function moveSnake(data){
    var snake = findSnake(data.player);
    console.log("GOT MOVES LIKE", data);
    //snake.queue(data.action);
    //snake.body = data.body;

  }

  function removeSnake(player){
    var snake = findSnake(player.playerId);
    snake.die();
  }



  return exports;
});
