var app = require('../app');
var mongoose = require('mongoose');
var mongodbConnectionString = require('./config/mongodbConnectionString');

function _start(){
	// mongoose.connect(mongodbConnectionString);
	_routeParser();
}

function _routeParser(){
	var homeController = require('./controllers/home');

	app.get('/', homeController.index);
}

function _loadHelpers(){
	requireFolder('./helpers');
}

var application = {
	start: _start,
	routeParser: _routeParser
};

module.exports = application;