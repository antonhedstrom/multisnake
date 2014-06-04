
// jQuery plugin: Play snake!
(function($){
  // Allowed methods
  var methods = {
    init : function(options) {
      return initGame.apply(this, options);
    },
    addPlayer : function() { 
      return addPlayer.apply(this, arguments);
    }
  };

  // Array of players
  var players = [];
  var paused = false;

  // Register as jQuery plugin
  $.fn.snake = function(method) {
    if ( methods[method] ) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ( typeof method === 'object' || !method ) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.snake' );
    }    
  };

  // Public default settings (overridable)
  $.fn.snake.defaults = {
    size : {x : 30, y : 30}
  };

  function initGame(options) {
    var self = this;
    var settings = $.extend(true, {}, $.fn.snake.defaults, options);

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
    var j;

    for (i = 0; i < settings.size.x; i++) {
      $tile.removeClass("tilecol_" + (i - 1));
      $tile.addClass("tilecol_" + i);
      $tile_row.append($tile.clone());
    }
    for (j = 0; j < settings.size.y; j++) {
      $tile_row.attr("id", "tilerow_" + j);
      $tiles_container.append($tile_row.clone());
    }
    self.append($tiles_container);
    self.append($score);

    generateFood($(self), settings.size.x, settings.size.y);

    initKeyBindings();

    return { 
      addPlayer : function() {
        //players.push(new Snake(self, player));
        return addPlayer.apply(self, arguments);
      }
    };
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

  function generateFood(playground, max_x, max_y) {
    var food = {};
    while (true) {
      food.x = Math.floor(Math.random() * max_x);
      food.y = Math.floor(Math.random() * max_y);

      if ( !playground.find("tilerow_" + food.x)
                      .find("tilecol_" + food.y)
                      .hasClass("snake") ) {
        return food;
      }
    }
  }


})(jQuery);