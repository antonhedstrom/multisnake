/* Timer inner class */

function Timer() {
  this.ts_started = 0;
  this.elapsed_msecs = 0;
  this.is_running = false;
}

Timer.prototype.start = function() {
  if ( !this.is_running ) {
    this.is_running = true;
    this.ts_started = new Date().getTime();
  }
  return this;
};
Timer.prototype.stop = function() {
  if ( this.is_running ) {
    this.is_running = false;
    this.elapsed_msecs += parseInt(new Date().getTime() - this.ts_started,10);
  }
  return this;
};
Timer.prototype.reset = function() {
  this.ts_started = 0;
  this.elapsed_msecs = 0;
  this.is_running = false;
  return this;
};
Timer.prototype.getTime = function() {
  var elapsed_msecs = 0;
  if ( this.is_running ) {
    elapsed_msecs += parseInt(new Date().getTime() - this.ts_started,10);
  }
  elapsed_msecs += this.elapsed_msecs;
  return elapsed_msecs;
};
Timer.prototype.getTimeInSecs = function(decimals) {
  var elapsed_secs = parseFloat(this.getTime() / 1000);
  return elapsed_secs.toFixed(decimals ? decimals : 2);
};
