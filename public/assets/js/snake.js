define([
  'network',
], function(
  Network
){

  var exports = {};

  exports = Snake;

  // CONSTANTS
  var DIR = {UP : 1, RIGHT : 2, DOWN : 3, LEFT : 4};

  /* Snake class */
  function Snake(options) {
    this.player;

    this.$myhome; // The jQuery object where I live
    this.default_pos;   //Start here
    this.food;          //There might be foooood.

    this.is_running;    //Is the snake moving or not?
    this.is_game_over;  //Am I dead?
    this.score;         //Score collected
    this.growth;        //Growing or not?
    this.direction;     //Current direction
    this.speed;         //Current speed

    // Arrays
    this.body = [];         //Array of tiles (bodyparts)
    this.action_queue = []; //Queue when controller is pressed
    this.controlls = [];    //Array of how to control the snake

    this.initSnake(options);
    this.initKeyBindings();
  }

  Snake.prototype.initSnake = function(options) {
    this.default_pos = options.player.startPos;
    this.player = options.player;
    this.$myhome = options.home;
    this.reset(); // Sets variables to default value
  };

  Snake.prototype.reset = function() {
    if ( this.is_game_over && this.body.length > 0 ) {
      for ( var i in this.body ) {
        // Remove all CSS classes for previously snake
        this.findTile(this.body[i].x, this.body[i].y)
          .removeClass("snake head dead");
      }
    }
    this.findTile(this.default_pos.x, this.default_pos.y)
      .addClass("snake head");

    this.is_running   = false;
    this.is_game_over = false;
    this.score        = 0;  // Dah?
    this.speed        = 6;
    this.growth       = 10; // Let snake initially grow
    this.direction    = null;
    this.body         = [this.default_pos]; // Snake start here
    this.action_queue = []; // Empty action queue
  };

  Snake.prototype.initKeyBindings = function(controlls) {
    var self = this;
    var action;

    var default_controlls = [];
    default_controlls[119] = "UP";
    default_controlls[97] = "LEFT";
    default_controlls[115] = "DOWN";
    default_controlls[100] = "RIGHT";

    if ( !this.player.isMe ) {
      console.log("I am not me.");
      return;
    }
    console.log("I AM me.");

    if ( !controlls ) {
      controlls = default_controlls;
    }

    for ( var i in controlls ) {
      switch (controlls[i]) {
        case "UP" :
          action = DIR.UP;
          break;
        case "RIGHT" :
          action = DIR.RIGHT;
          break;
        case "DOWN" :
          action = DIR.DOWN;
          break;
        case "LEFT" :
          action = DIR.LEFT;
          break;
        default :
          action = DIR.UP;
      }
      controlls[i] = action;
    }
    this.controlls = controlls;

    $("body").keypress(function(e) {
      self.queue(self.controlls[e.keyCode] || false);
      if ( !(self.is_running || self.is_game_over) ) {
        self.queue(self.controlls[e.keyCode] || false, true);
        if ( self.action_queue.length > 0 ) {
          // We have actions, lets start!
          self.start();
        }
      }

    });
  };

  Snake.prototype.tick = function() {
    if ( !this.is_running ) {
      return;
    }

    var current_pos = this.body[this.body.length - 1];
    var new_pos = {
      x: current_pos.x,
      y: current_pos.y
    };
    var $food;

    if ( this.action_queue.length > 0 ) {
      this.direction = this.action_queue.shift();
    }
    switch(this.direction) {
      case DIR.UP :
        new_pos.y--;
        this.body.push(new_pos);
        break;
      case DIR.RIGHT :
        new_pos.x++;
        this.body.push(new_pos);
        break;
      case DIR.LEFT :
        new_pos.x--;
        this.body.push(new_pos);
        break;
      case DIR.DOWN :
      default :
        new_pos.y++;
        this.body.push(new_pos);
    }

    if ( this.isAlive() ) {
      if ( this.findTile(new_pos.x, new_pos.y).hasClass("food") ) {
        $food = this.findTile(new_pos.x, new_pos.y);
        //Network.foodEaten($food.data("id"), player.id);
        this.growth += this.growth + 3;
        this.score += $food.data("score");
        console.log("Du har " + this.score + " poäng.");
        $food.removeClass("food");
      }

      // Move snake
      this.updateSnakeUI(this.growth == 0);

      if ( this.growth > 0 ) {
        this.growth--;
      }
    }
    else {
      if ( this.player.isMe ) {
        Network.removePlayer(this.player);
      }
      this.gameover();
    }

  };

  Snake.prototype.start = function() {
    this.is_running = true;
  };

  Snake.prototype.die = function() {
    for ( var i in this.body ) {
      this.findTile(this.body[i].x, this.body[i].y).removeClass("snake head tail me dead");
    }
  };

  /*
    Function to check if we should queue action.
    * Dont queue more than 2 actions.
    * Dont queue an action that make the snake turn 180 degrees.
    * Dont queue an action that means going same direction as we move.
  */
  Snake.prototype.queue = function(action, allow_same_dir) {
    var zero_based_idx;
    if ( !action ) {
      return;
    }
    zero_based_idx = action - 1;

    if ( this.action_queue.length == 0
         && (((zero_based_idx + 2) % 4) + 1 != this.direction) // Prevent 180 turn
         && (action != this.direction || allow_same_dir ) // Prevent same direct (no reason)
      ) {
      Network.makeMove(this.player, action);
      this.action_queue.push(action);
    }
    else if (this.action_queue.length == 1) {
      this.action_queue.push(action);
    }
  };
/*
  Snake.prototype.pause = function() {
    this.is_running = false;
  };
*/
  Snake.prototype.gameover = function() {
    this.is_running   = false;
    this.is_game_over = true;

    for ( var i in this.body ) {
      this.findTile(this.body[i].x, this.body[i].y).addClass("dead");
    }
  };

  Snake.prototype.isAlive = function() {
    var head = this.body[this.body.length - 1];
    var head_element = this.findTile(head.x, head.y);
    if ( head_element.length == 0 //Out of bound
        || head_element.hasClass("snake") // Smash into myself (or other snake!)
        || head.x < 0 //Out of bound
        || head.y < 0 //Out of bound
        ) {
      return false;
    }
    return true;
  };

  Snake.prototype.updateSnakeUI = function(delete_tail) {
    var body      = this.body;
    var head      = this.body[this.body.length - 1]; // Snake head
    var prev_head = this.body[this.body.length - 2]; // Previously snake head
    var tail      = delete_tail ? this.body.shift() : this.body[0];

    if ( delete_tail ) {
      this.findTile(tail.x, tail.y).removeClass("snake me head tail");
    }
    else {
      this.findTile(tail.x, tail.y).addClass("tail");
    }
    this.findTile(prev_head.x, prev_head.y).removeClass("head");
    this.findTile(head.x, head.y).addClass("snake head " + (this.player.isMe ? "me" : ""));
  };

  Snake.prototype.findTile = function(x, y) {
    return this.$myhome.find("#tilerow_"+y + " .tilecol_" + x);
  }

  return exports;

});
