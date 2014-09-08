var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express3-handlebars');
var helmet = require('helmet');
var app = express();

var hbs = exphbs.create({
	defaultLayout:'main'
});

// view engine setup
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/application/views')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.nocache());

module.exports = app;