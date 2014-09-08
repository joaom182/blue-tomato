var Tweet = require('./../models/Tweet');

var TweetRepository = function(){

	this.save = function(tweet){
		tweet.save(function(err){
			if(err)
				console.log(err);
		});
	};

	this.findTweets = function(filter, callback){
		Tweet.find(filter, callback);
	};

	this.countTweets = function(filter, callback){
		Tweet.count(filter, callback);
	};
	
};

module.exports = TweetRepository;