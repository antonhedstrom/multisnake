define([
  'jquery',
  'snake',
  'snake_plugin'
], function(
  $
){
  var exports = {};

  exports.start = initGame;

  // Array of players
  var players = [];
  var me = new Snake($("#game"), {start_pos: {x: 3, y: 3}});
  var paused = false;

  var defaults = {
    size: {x:20, y:20}
  };

  function initGame(options) {
    var self = this;
    var settings = $.extend(true, {}, defaults, options);

    buildPlayground(settings);
    initKeyBindings();

    return {
      addPlayer : function() {
        //players.push(new Snake(self, player));
        return addPlayer.apply(self, arguments);
      }
    };
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
      switch(e.keyCode) {
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
      }
    });
  }

  function addPlayer(player) {
    players.push(new Snake(this, player));
    return this;
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
    for (var i in players) {
      players[i].run();
    }
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

  return exports;
});
