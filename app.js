var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var handlers = require('./app/handlers/sockethandler')(io);

app.use(
  express.static( path.join( __dirname, 'public' ) )
);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.post('/init', function(){
  console.log("got ajax");
  return "heeey";
});

io.on('connection', function(socket){
  socket.on('movement', handlers.movement);
  socket.on('score', handlers.score);
  socket.on('dead', handlers.dead);
  socket.on('init', handlers.init);
});

http.listen(1337, function(){
  console.log('listening on localhost:1337');
});