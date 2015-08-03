(function () {
	'use strict';
	/* Controllers */

	var app = angular.module('taskmastrControllers', []);
	
	app.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);    
	}]);

	app.controller('UserController', ['$http', '$scope', '$log', '$location',
		function ($http, $scope, $log, $location) {
			$http.get('/session-data')
				.success(function(data) {
					//$log.log('Get successful');
					//$log.log(data);
					if (data) {
						$scope.user.username = data.username;
						$scope.user.key = data.key;
						$scope.user.todos = data.todos;
						$scope.user.current = _.find($scope.user.todos, _.matchesProperty('current', true)) ? _.find($scope.user.todos, _.matchesProperty('current', true)) : {
							list: "List 1",
							current: true,
							items: []
						};
						//$log.log($scope.user.current);
						//$scope.user.todos = $scope.user.current.items;
						if (data.hasOwnProperty('key')) $scope.user.key = data.key;
						$scope.user.darkmode = (data.hasOwnProperty('darkmode')) ? data.darkmode : false;
						//$log.log('User profile mounted...');
						//$log.log($scope.user);
					}
				})
				.error(function(data, status) {
					$log.log('Get fail');
					$log.log(status);
			});
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
					$scope.user.current.items.every(function (val, i) {
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
						spliced = $scope.user.current.items.splice(evt.newIndex, 1);
						$scope.user.current.items.splice(completeIndex, 0, spliced[0]);
					} else if (evt.newIndex < completeIndex && itemComplete) {
						spliced = $scope.user.current.items.splice(evt.newIndex, 1);
						$scope.user.current.items.splice(completeIndex - 1, 0, spliced[0]);
					}
				}
			};
			
			$scope.setDatepickerIndex = function(index) {
				$scope.datepickerIndex = index;
			}
			$scope.setDatepickerClear = function(bool) {
				$scope.datepickerClear = bool;
			}
			$scope.datepickerOptions = {
				showButtonPanel: true,
				closeText: 'Clear',
				minDate: 1,
				onClose : function (dateText, inst) {
					//$log.log($scope.datepickerClear);
					//$log.log($scope.user.current.items[$scope.datepickerIndex].dueDate);
					if ($scope.datepickerClear) {
						$scope.user.current.items[$scope.datepickerIndex].dueDate = '';
						$scope.$apply();
					}
				}
			};
			var counter = 0;
			
			var reset = $location.search().reset;
			if (reset) {
				//$log.log('Reset');
				$scope.resetForm = true;
				$scope.resetToken = $location.search().token;
			}
			$scope.lookup = function (username, key, rememberMe) {
				$http.post('/users/login', {
						username: username,
						key: key,
						rememberMe: rememberMe
					})
					.success(function (data) {
						//$log.log(data);
						if (data) {
							$scope.user.todos = data.todos;
							$scope.user.current = _.find($scope.user.todos, _.matchesProperty('current', true)) ? _.find($scope.user.todos, _.matchesProperty('current', true)) : {
								list: "List 1",
								current: true,
								items: []
							};
							//$log.log($scope.user.current);
							//$scope.user.todos = $scope.user.current.items;
							if (data.hasOwnProperty('key')) $scope.user.key = data.key;
							$scope.user.darkmode = (data.hasOwnProperty('darkmode')) ? data.darkmode : false;
							//$log.log('User profile mounted...');
							//$log.log($scope.user);
						} else {
							$scope.confirmPassword = true;
							$scope.invalidPassword = false;
						}
					})
					.error(function (data, status) {
						//$log.log('Error connecting to db!');
						$log.log(status);
						if (status === 401) {
							$scope.invalidPassword = true;
							$scope.confirmPassword = false;
						}
					});
			};
			$scope.setToken = function (user) {
				$http.post('users/forgot', {
					username: user
				})
				.success(function (data) {
					$log.log(data);
					$scope.emailSent = true;
				})
				.error(function (data, status) {
					$log.log(status);
					$scope.emailSent = false;
				});
			};
			$scope.resetPassword = function (token, newKey) {
				$http.post('/users/reset', {
					token: token,
					newKey: newKey
				})
				.success(function (data) {
					if (data) {
						$scope.user.todos = data.todos;
						$scope.user.current = _.find($scope.user.todos, _.matchesProperty('current', true)) ? _.find($scope.user.todos, _.matchesProperty('current', true)) : {
							list: "List 1",
							current: true,
							items: []
						};
						//$log.log($scope.user.current);
						//$scope.user.todos = $scope.user.current.items;
						if (data.hasOwnProperty('key')) $scope.user.key = data.key;
						$scope.user.darkmode = (data.hasOwnProperty('darkmode')) ? data.darkmode : false;
						//$log.log('User profile mounted...');
						//$log.log($scope.user);
						$location.path('/');
						//$log.log($location.path());
					}
				})
				.error(function (data, status) {
					$scope.resetFail = true;
					$log.log(status);
				});
			};
			$scope.addUser = function (user, key, rememberMe) {
				$http.post('/users/create', {
						username: user,
						key: key,
						rememberMe: rememberMe
					})
					.success(function (data) {
						//$log.log(data);
						$scope.user.todos = (data.todos) ? data.todos : [{
							list: "List 1",
							current: true,
							items: []
						}];
						$scope.user.current = _.find($scope.user.todos, _.matchesProperty('current', true)) ? _.find($scope.user.todos, _.matchesProperty('current', true)) : {
							list: "List 1",
							current: true,
							items: []
						};
						if (data.hasOwnProperty('key')) $scope.user.key = data.key;
						$scope.user.darkmode = (data.hasOwnProperty('darkmode')) ? data.darkmode : false;
						//$log.log('User profile mounted...');
						//$log.log($scope.user);
						$scope.write(user);
					})
					.error(function (data, status) {
						$log.log('Error connecting to db!');
						$log.log(status);
					});
			};
			$scope.create = function (arr, item, agendaID) {
				if (arr === $scope.user.todos) {
					arr.unshift({
						list: item,
						current: false,
						items: []
					});
				} else {
					arr.unshift({
						item: item,
						complete: false,
						agendaID: agendaID
					});
				}
				//$log.log('Creating todo... OK');
			};
			$scope.write = function (username) {
				var now = new Date();
				$scope.user.dateModified = now.toISOString();
				_.set($scope.user.todos, _.find($scope.user.todos, _.matchesProperty('current', true)), $scope.user.current);
				//$log.log('Saving to db...')
				//$log.log($scope.user);
				$scope.saveButton = false;
				//$log.log('saveButton = ' + $scope.saveButton);
				$http.post('/users/write', {
						//json: angular.toJson($scope.user)
						user: {
							username: $scope.user.username,
							todos: $scope.user.todos,
							darkmode: $scope.user.darkmode,
							dateModified: now
						},
						deleteAgendas: $scope.deleteAgendas
					})
					.success(function (data) {
						//$log.log('Writing data... OK');
						return true;
					})
					.error(function (data, status) {
						$log.log('Error writing data!');
						$log.log(status);
					});
			};
			$scope.logout = function () {
				$http.get('/users/logout')
					.success(function (data) {
						//$log.log('Logged out');
						window.location.href = '/';
					})
					.error(function (data, status) {
						$log.log('Error logging out! ');
						$log.log(status);
					});
			};
			$scope.deleteAgendas = [];
			$scope.setDeleteAgendas = function (agendaID) {
				$scope.deleteAgendas.push(agendaID);
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
			$scope.setCurrent = function(index) {
				_.set($scope.user.todos, _.find($scope.user.todos, _.matchesProperty('current', true)), $scope.user.current);
				_.set(_.find($scope.user.todos, _.matchesProperty('current', true)), 'current', false);
				$scope.user.current = $scope.user.todos[index];
				_.set($scope.user.todos[index], 'current', true);
				//$log.log($scope.user.todos);
			}
		}
	]);
})();