var mongoose = require('mongoose');

var Tweet = mongoose.model('Tweet', { 
	text: String,
});

module.exports = Tweet;