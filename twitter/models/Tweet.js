var mongoose = require('mongoose');

var Tweet = mongoose.model('Tweet', { 
	text: String,
	created_at: String,
	user: {
		profile_image_url: String,
		screen_name: String,
		name: String
	}
});

module.exports = Tweet;