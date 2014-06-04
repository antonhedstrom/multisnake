var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var handlers = require('./handlers/sockethandler');

app.use(
  express.static( path.join( __dirname, 'public' ) )
);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('movement', handlers.movement);
  socket.on('score', handlers.score);
  socket.on('dead', handlers.dead);
  socket.on('new', handlers.new);

  /*
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
*/
});

http.listen(1337, function(){
  console.log('listening on localhost:1337');
});