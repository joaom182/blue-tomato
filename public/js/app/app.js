(function(global){
	"use strict";

	global.angularUtilitesApp = angular.module('angularUtilites', []);

	angularUtilitesApp.factory('safeApply', function(){
		return function(scope, fn) {
			var phase = scope.$root.$$phase;
			if(phase == '$apply' || phase == '$digest') {
				if(fn && (typeof(fn) === 'function')) {
					fn();
				}
			} else {
				scope.$apply(fn);
			}
		};
	});

	global.twitterChartApp = angular.module('twitterChart', ['angularUtilites']);

	twitterChartApp.controller('ChartController', ["$scope", "safeApply", function($scope, safeApply){
		$scope = $scope || {};

		var socket = io.connect('http://localhost:5255');
		var _dilmaHistory = ['Dilma Rosseff', 0];
		var _aecioHistory = ['Aécio Neves', 0];
		var _marinaHistory = ['Marina Silva', 0];
		var chart = c3.generate({
			bindto: '#chart',
			data: {
				columns: [_dilmaHistory, _aecioHistory, _marinaHistory],
				types: {
					'Dilma Rosseff': 'area-spline',
					'Aécio Neves': 'area-spline',
					'Marina Silva': 'area-spline'
				}
			}
		});

		$scope.dilmaTweets = [];
		$scope.marinaTweets = [];
		$scope.aecioTweets = [];

		function _updateChart(){
			chart.load({
				columns: [_dilmaHistory, _aecioHistory, _marinaHistory]
			});
		}

		function _getPercent(count){
			var _total = $scope.dilmaTweets.length + $scope.marinaTweets.length + $scope.aecioTweets.length;

			return parseFloat((parseInt(count) / _total * 100).toPrecision("4"));
		}

		function _addToHistory(history, tweets){
			var _total = tweets.length;
			var percent = _getPercent(_total);

			if(history.length > 30)
				history.remove(history[1]);

			history.push(percent);
		}

		function _updateHistory(){
			_addToHistory(_dilmaHistory, $scope.dilmaTweets);
			_addToHistory(_aecioHistory, $scope.aecioTweets);
			_addToHistory(_marinaHistory, $scope.marinaTweets);
		}

		socket.on('dilma', function (tweet) {
			safeApply($scope, function(){
				$scope.dilmaTweets.push(tweet);
			});
		});

		socket.on('marina', function (tweet) {
			safeApply($scope, function(){
				$scope.marinaTweets.push(tweet);
			});
		});

		socket.on('aecio', function (tweet) {
			safeApply($scope, function(){
				$scope.aecioTweets.push(tweet);
			});
		});

		$scope.$watch('dilmaTweets', function(newValue, oldValue){
			_updateHistory();
			_updateChart();
		}, true);

		$scope.$watch('marinaTweets', function(newValue, oldValue){
			_updateHistory();
			_updateChart();
		}, true);

		$scope.$watch('aecioTweets', function(newValue, oldValue){
			_updateHistory();
			_updateChart();
		}, true);

	}]);

})(window);