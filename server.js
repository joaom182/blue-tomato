var http = require('http');
var app = require('./app');

var server = http.createServer(app);
var io = require('socket.io')(server);
var twitter = require('./twitter/twitter');

global.socket = null;

app.get('/', function(req, res){
	res.render('index');
});

io.on('connection', function (socket) {
	global.socket = socket;
});

require('./application/helpers/string');

var trackTweets = {
	dilma: ['dilma rousseff', 'dilma'],
	aecio: ['aécio neves', 'aécio'],
	marina: ['marina silva']
};

twitter.stream('statuses/filter', {
	'track': trackTweets.dilma.join(',') + ',' + trackTweets.aecio.join(',') + ',' + trackTweets.marina.join(',')
}, function(stream){
	stream.on('data', function(tweet){
		if(global.socket == null)
			return;

		console.log('Tweet Sent to Client');

		trackTweets.dilma.forEach(function(d){
			if(tweet.text.toLowerCase().contains(d.toLowerCase()))
				global.socket.emit('dilma', tweet);
		});

		trackTweets.aecio.forEach(function(a){
			if(tweet.text.toLowerCase().contains(a.toLowerCase()))
				global.socket.emit('aecio', tweet);
		});

		trackTweets.marina.forEach(function(m){
			if(tweet.text.toLowerCase().contains(m.toLowerCase()))
				global.socket.emit('marina', tweet);
		});
	});
});

server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function(){
	var addr = server.address();
	console.log("Application listening at", addr.address + ":" + addr.port);
});