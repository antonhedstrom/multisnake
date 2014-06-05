var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sockethandler = require('./app/handlers/sockethandler')(io);
var ajaxhandler = require('./app/handlers/ajaxhandler')(io);

app.use(
  express.static( path.join( __dirname, 'public' ) )
);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/getgame', ajaxhandler.getgame);



io.on('connection', function(socket){

  // Add to current connected clients
  sockethandler.addClient(socket);
  sockethandler.currentSocket = socket;

  sockets.on('disconnect', sockethandler.disconnect);

  socket.on('movement', sockethandler.movement);
  socket.on('score', sockethandler.score);
  socket.on('dead', sockethandler.dead);
  //socket.on('init', sockethandler.init);

});

http.listen(1337, function(){
  console.log('listening on localhost:1337');
});