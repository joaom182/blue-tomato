var twitter = require('ntwitter');
var twitterConfig = require('./config/twitter');
var twitt = new twitter(twitterConfig);

module.exports = twitt;