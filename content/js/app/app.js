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

		var socket = io.connect('http://localhost:3000');
		var _dilmaHistory = ['@dilmabr', 0];
		var _aecioHistory = ['@AecioNeves', 0];
		var _marinaHistory = ['@silva_marina', 0];
		var chart = c3.generate({
			bindto: '#chart',
			data: {
				columns: [_dilmaHistory, _aecioHistory, _marinaHistory],
				types: {
					'@dilmabr': 'area-spline',
					'@AecioNeves': 'area-spline',
					'@silva_marina': 'area-spline'
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

			if(isNaN(percent))
				return;

			if(history.length > 16)
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
				$scope.dilmaTweets.unshift(tweet);
			});
		});

		socket.on('marina', function (tweet) {
			safeApply($scope, function(){
				$scope.marinaTweets.unshift(tweet);
			});
		});

		socket.on('aecio', function (tweet) {
			safeApply($scope, function(){
				$scope.aecioTweets.unshift(tweet);
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