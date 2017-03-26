// require express so that we can build an express app
var express = require('express');
// instantiate the app
var app = express();

var path = require('path');

//Look for statics first
app.use(express.static(path.join(__dirname, 'public')));
//Return the index for any other GET request
app.get('/*', function (req, res) {
    res.sendFile('index.htm', {root: path.join(__dirname, 'public')});
});

var http = require('http').Server(app);

http.listen(3000, function () {
  console.log('Listening on port: 3000');
});

//socket Server
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('Connected');

  socket.on('message', function(msg){
    console.log('Message receive from client: ' + msg);
  })

  // Called when the client calls socket.emit('move')
  socket.on('move', function(msg) {
    socket.broadcast.emit('move', msg);
  });

})