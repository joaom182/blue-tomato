require('../../application/helpers/string');
var twitter = require('../twitter');

var StreamMonitor = {
	monitor: function(){
		var trackTweets = {
			dilma: ['@dilmabr'],
			aecio: ['@AecioNeves'],
			marina: ['@silva_marina']
		};

		twitter.stream('statuses/filter', {
			'track': trackTweets.dilma.join(',') + ',' + trackTweets.aecio.join(',') + ',' + trackTweets.marina.join(',')
		}, function(stream){
			stream.on('data', function(tweet){
				if(global.socket == null)
					return;

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
	}
};

module.exports = StreamMonitor;