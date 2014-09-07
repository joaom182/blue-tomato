module.exports = {
	index: function(req, res){
		var streamMonitor = require('../../twitter/services/StreamMonitor');

		streamMonitor.monitor();

		res.render('index');
	}
};