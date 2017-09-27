var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('chat', function(msg){
		console.log('send: ' + msg);
		io.sockets.to(6).emit('chat', msg);
	});
});

http.listen(3000, function() {
  console.log('Http server started with :3000');
});
