var mongoose = require('mongoose');
var mongodbConnectionString = require('./config/mongodbConnectionString');

function _start(){
	mongoose.connect(mongodbConnectionString);
}

var application = {
	start: _start
};

module.exports = application;