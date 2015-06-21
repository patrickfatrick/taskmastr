(function () {
	'use strict';
	/* Controllers */

	var app = angular.module('taskmastrControllers', []);

	app.controller('UserController', ['$http', '$scope', '$log',
		function ($http, $scope, $log) {
			$scope.newTodo = '';
			$scope.user = {};
			$scope.user.todos = null;
			$scope.user.darkmode = null;
			$scope.saveButton = false;
			$scope.sortableOptions = {
				handle: '.sort',
				sort: true,
				animation: 150,
				ghostClass: 'ghost',
				scroll: true,
				scrollSensitivity: 30,
				scrollSpeed: 10,
				onUpdate: function (evt) {
					var itemEl = evt.model.item;
					var itemComplete = evt.model.complete;
					var completeIndex;
					//$log.log(itemEl);
					$scope.user.todos.every(function (val, i) {
						if (val.complete === true && val.item != itemEl) {
							completeIndex = i;
							return false;
						}
						return true;
					});
					//$log.log(completeIndex);
					//$log.log(evt.newIndex);
					var spliced;
					if (evt.newIndex > completeIndex && !itemComplete) {
						spliced = $scope.user.todos.splice(evt.newIndex, 1);
						$scope.user.todos.splice(completeIndex, 0, spliced[0]);
					} else if (evt.newIndex < completeIndex && itemComplete) {
						spliced = $scope.user.todos.splice(evt.newIndex, 1);
						$scope.user.todos.splice(completeIndex - 1, 0, spliced[0]);
					}
				}
			};
			var counter = 0;
			$scope.lookup = function (key) {
				$http.post('/users/login', {
						key: key
					})
					.success(function (data) {
						$scope.user.todos = (data.todos) ? data.todos : [];
						if (data.hasOwnProperty('key')) $scope.user.key = data.key;
						$scope.user.darkmode = (data.hasOwnProperty('darkmode')) ? data.darkmode : false;
						//$log.log('User profile mounted...');
						//$log.log($scope.user);
					})
					.error(function () {
						//$log.log('Error connecting to db!');
					});
			};
			$scope.create = function (item) {
				$scope.user.todos.unshift({
					item: item,
					complete: false
				});
				//$log.log('Creating todo... OK');
			};
			$scope.write = function (key) {
				var now = new Date();
				$scope.user.dateModified = now.toISOString();
				//$log.log('Saving to db...')
				//$log.log($scope.user);
				$scope.saveButton = false;
				//$log.log('saveButton = ' + $scope.saveButton);
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
			$scope.delete = function (index) {
				$scope.user.todos.splice(index, 1);
			};
			$scope.$watch('user.todos', function (newValue, oldValue) {
				if (newValue === oldValue) return;
				if (counter >= 2) $scope.saveButton = true;
				//$log.log('saveButton = ' + $scope.saveButton);
				counter += 1;
				//$.log('todo counter = ' + counter);
			}, true);
			$scope.$watch('user.darkmode', function (newValue, oldValue) {
				if (newValue === oldValue) return;
				if (counter >= 2) $scope.saveButton = true;
				//$log.log('saveButton = ' + $scope.saveButton);
				counter += 1;
				//$.log('darkmode counter = ' + counter);
			}, true);
		}
	]);
})();
