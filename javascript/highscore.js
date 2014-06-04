
/* Highscore class */

function Highscore(id) {
  /* Everything is saved as localstorage? */
  this.storage_identifier = id ? id : "ABC_game_highscore";
}

Highscore.prototype.saveScore = function(name, score) {
  var highscores = this.getScores(); // Get scores
  highscores = highscores || [];
  var score = parseFloat(score);
  if ( !score || isNaN(score) || score == 0 ) {
    return false;
  }
  var item = {};
  item.player_name = name ? name : "Unknown";
  item.score = score; 
  item.logdate = new Date().getTime();
  highscores.push(item);
  this.setScores(highscores); //Save scores
};

Highscore.prototype.getScores = function(get_sorted) {
  var items;
  var get_sorted = get_sorted ? true : false;
  var score_sorter = function(a,b) { return (a.score - b.score); };
  
  items = localStorage.getItem(this.storage_identifier);
  items = items ? JSON.parse(items) : [];

  if ( get_sorted ) {
    items.sort(score_sorter);
  }

  return items;
};

Highscore.prototype.setScores = function(new_scores) {
    localStorage.setItem(this.storage_identifier, 
      JSON.stringify(new_scores));
};
