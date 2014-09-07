var http = require('http');
var app = require('./app');
var server = http.createServer(app);
var io = require('socket.io')(server);
var application = require('./application/');
global.socket = null;

application.start();

io.on('connection', function (socket) {
	global.socket = socket;
});

server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function(){
	var addr = server.address();
	console.log("Application listening at", addr.address + ":" + addr.port);
});