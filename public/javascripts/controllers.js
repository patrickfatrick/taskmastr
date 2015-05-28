(function () {
	'use strict';
	/* Controllers */

	var app = angular.module('taskmastrControllers', []);

	app.controller('UserController', ['$http', '$scope', '$log',
		function ($http, $scope, $log) {
			$scope.newTodo = '';
			$scope.user = {};
			$scope.user.todos = [];
			$scope.user.darkmode = false;
			$scope.saveButton = false;
			$scope.sortableOptions = {
				handle: '.fa-bars',
				sort: true,
				animation: 150,
				ghostClass: 'ghost',
				scroll: true,
				scrollSensitivity: 30,
    		scrollSpeed: 10
			};
			$scope.lookup = function (key) {
				$http.post('/users/login', {
						key: key
					})
					.success(function (data) {
						if (data.hasOwnProperty('todos')) $scope.user.todos = data.todos;
						if (data.hasOwnProperty('key')) $scope.user.key = data.key;
						if (data.hasOwnProperty('darkmode')) $scope.user.darkmode = data.darkmode;
						$log.log('User profile mounted...');
						$log.log($scope.user);
					})
					.error(function () {
						$log.log('Error connecting to db!');
					});
			};
			$scope.create = function (item) {
				$scope.user.todos.unshift({
					item: item,
					complete: false
				});
			};
			$scope.write = function (key) {
				var now = new Date();
				$scope.user.dateModified = now.toISOString();
				$log.log('Saving to db...')
				$log.log($scope.user);
				$scope.saveButton = false;
				$log.log('saveButton = ' + $scope.saveButton);
				$http.post('/users/write', {
						json: angular.toJson($scope.user)
					})
					.success(function (data) {
						$log.log('Writing data... OK');
					})
					.error(function (data) {
						$log.log('Error writing data!');
					});
			};
			$scope.$watchCollection('user.todos', function (newValue, oldValue) {
				if (newValue === oldValue) {
					return
				}
				$scope.saveButton = true;
				$log.log('saveButton = ' + $scope.saveButton);
			}, true);
			$scope.$watchCollection('user.darkmode', function (newValue, oldValue) {
				if (newValue === oldValue) {
					return
				}
				$scope.saveButton = true;
				$log.log('saveButton = ' + $scope.saveButton);
			}, true);
		}
	]);
})();