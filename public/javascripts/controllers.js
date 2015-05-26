(function () {
	'use strict';
	/* Controllers */

	var app = angular.module('taskmastrControllers', []);

	app.controller('UserController', ['$http', '$scope', '$log',
		function ($http, $scope, $log) {
			$scope.newTodo = '';
			$scope.user = {};
			$scope.master = angular.copy($scope.user);
			$scope.user.todos = [];
			$scope.user.darkmode = false;
			$scope.saveButton = false;
			$scope.sortableOptions = {
				axis: "y",
				handle: '.fa-bars',
				opacity: 0.8,
				helper: function (e, ui) {
					ui.children().each(function () {
						$(this).width($(this).width());
					});
					return ui;
				}
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
			$scope.delete = function (item) {
				$log.log('Deleted the following item');
				$log.log(item);
				$scope.user.todos.splice($scope.user.todos.indexOf(item), 1);
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
			/*$scope.checkChanges = function() {
				var equality = angular.equals($scope.user, $scope.master);
				$scope.master = angular.copy($scope.user);	
				return equality;
			}*/
			$scope.$watch('user.todos', function (newValue, oldValue) {
				if (newValue === oldValue) {
					return
				}
				$scope.saveButton = true;
				$log.log('saveButton = ' + $scope.saveButton);
			}, true);
			$scope.$watch('user.darkmode', function (newValue, oldValue) {
				if (newValue === oldValue) {
					return
				}
				$scope.saveButton = true;
				$log.log('saveButton = ' + $scope.saveButton);
			}, true);
		}
	]);
})();