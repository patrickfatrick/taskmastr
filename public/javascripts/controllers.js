(function () {
	'use strict';
	/* Controllers */

	var app = angular.module('taskmastrControllers', []);
	
	app.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);    
	}]);

	app.controller('UserController', ['$http', '$scope', '$log', '$location', 'hotkeys',
		function ($http, $scope, $log, $location, hotkeys) {
			$http.get('/session-data')
				.success(function(data) {
					//$log.log('Get successful');
					//$log.log(data);
					if (data) {
						$scope.user.username = data.username;
						$scope.user.key = data.key;
						$scope.user.todos = data.todos;
						_.each($scope.user.todos, function (val, i) {
							if (!(_.find(val.items, 'current', true))) {
								_.set(val.items[0], 'current', true);
							}
						});
						$scope.user.current = _.find($scope.user.todos, _.matchesProperty('current', true)) ? _.find($scope.user.todos, _.matchesProperty('current', true)) : {
							list: "List 1",
							current: true,
							items: []
						};
						//$log.log($scope.user.current);
						if (data.hasOwnProperty('key')) $scope.user.key = data.key;
						$scope.user.darkmode = (data.hasOwnProperty('darkmode')) ? data.darkmode : false;
						//$log.log('User profile mounted...');
						//$log.log($scope.user);
						_.each($scope.user.todos, function(val, i) {
							if (!val.agendaID) val.agendaID = $scope.token();
							_.each(val.items, function(itemVal, j) {
								if (!itemVal.agendaID) itemVal.agendaID = $scope.token();
							});
						}); 
					}
				})
				.error(function(data, status) {
					$log.log('Get fail');
					$log.log(status);
			});
			
			$scope.rand = function () {
				return Math.random().toString(36).substr(2);
			}

			$scope.token = function () {
				return $scope.rand() + $scope.rand() + $scope.rand();
			}
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
				showAnim: '',
				dateFormat: 'yy-mm-dd',
				closeText: 'Clear',
				onClose : function (dateText, inst) {
					//$log.log($scope.datepickerClear);
					//$log.log($scope.user.current.items[$scope.datepickerIndex].dueDate);
					//$log.log($scope.user.todos);
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
							_.each($scope.user.todos, function (val, i) {
								if (!(_.find(val.items, 'current', true))) {
									_.set(val.items[0], 'current', true);
								}
							});
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
							_.each($scope.user.todos, function(val, i) {
								if (!val.agendaID) val.agendaID = $scope.token();
								_.each(val.items, function(itemVal, j) {
									if (!itemVal.agendaID) itemVal.agendaID = $scope.token();
								});
							});
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
						$scope.user.darkmode = (data.hasOwnProperty('darkmode')) ? data.darkmode : true;
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
						list: item.trim(),
						current: false,
						items: [],
						agendaID: agendaID
					});
				} else {
					if (item.indexOf('Remind me to ') === 0 || item.indexOf('remind me to ') === 0 || item.indexOf('/') === 0) {
						var char = (item.indexOf('Remind me to ') !== -1) ? 13 : 3;
						var shortcut = (item.substring(0, char - 1));
						var dateObj;
						item = item.substring(char, item.length);
						switch (shortcut) {
							case '/t':
								dateObj = date('tomorrow');
								item = dateStrs(item).item;
								break;
							case '/w':
								dateObj = date('next Monday');								
								item = dateStrs(item).item;
								break;
							case '/m':
								dateObj = moment().startOf('month').add(1, 'M')._d;								
								item = dateStrs(item).item;
								break;
							case '/y':
								dateObj = moment().startOf('year').add(1, 'y')._d;								
								item = dateStrs(item).item;
								break;
							default:
								dateObj = dateStrs(item).dateObj;
								item = dateStrs(item).item;
								break;
						}
					}
					arr.unshift({
						item: item.trim(),
						complete: false,
						agendaID: agendaID,
						dueDate: dateObj
					});
				}
				//$log.log('Creating todo... OK');
			};
			$scope.complete = function (arr, oldIndex) {
				var todos = arr;
				var newIndex = todos.length;
				// If there's a complete todo present, set newIndex to that index, not the end of the list
				_.each(todos, function (val, i) {
					if (val.complete === true) {
						newIndex = i;
						return false;
					}
				});
				var splicedTodo = arr.splice(oldIndex, 1);
				arr.splice(newIndex, 0, splicedTodo[0]);
			}
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
			$scope.setCurrent = function(arr, index) {
				//$log.log('setCurrent index: ' + index);
				if (index >= arr.length) {
					index = 0;
				}
				if (index === -1) {
					index = arr.length - 1;
				}
				if (arr === $scope.user.todos) {
					_.set(_.find(arr, 'current', true), $scope.user.current);
					_.set($scope.user, 'current', arr[index]);
				}
				_.set(_.find(arr, 'current', true), 'current', false);
				_.set(arr[index], 'current', true);
			}
			hotkeys.bindTo($scope).add({
				combo: 'command+up',
				description: 'Toggle Night Mode/Bright Mode',
				callback: function () {
					$scope.user.darkmode = ($scope.user.darkmode) ? false : true;
				},
				allowIn: ['input']
			}).add({
				combo: 'command+down',
				description: 'Save your data',
				callback: function () {
					$('#save-button').click();
				},
				allowIn: ['input']
			}).add({
				combo: 'command+right',
				description: 'Show the lists menu',
				callback: function () {
					$('#icon-menu:not(".toggled")').click();
				},
				allowIn: ['input']
			}).add({
				combo: 'command+left',
				description: 'Hide the lists menu',
				callback: function () {
					$('#icon-menu.toggled').click();
				},
				allowIn: ['input']
			}).add({
				combo: 'ctrl+t',
				description: 'Focus on the task creation input',
				callback: function () {
					$('#create-todo').focus();
				},
				allowIn: ['input']
			}).add({
				combo: 'ctrl+l',
				description: 'Focus on the list creation input',
				callback: function () {
					$('#create-list').focus();
				},
				allowIn: ['input']
			}).add({
				combo: 'down',
				description: 'Select the next task',
				callback: function () {
					$scope.setCurrent($scope.user.current.items, _.findIndex($scope.user.current.items, 'current', true) + 1);
				},
				allowIn: ['input']
			}).add({
				combo: 'up',
				description: 'Select the previous task',
				callback: function () {
					$scope.setCurrent($scope.user.current.items, _.findIndex($scope.user.current.items, 'current', true) - 1);
				},
				allowIn: ['input']
			}).add({
				combo: 'ctrl+c',
				description: 'Complete the selected task',
				callback: function () {
					//$scope.complete($scope.user.current.items, (_.findIndex($scope.user.current.items, 'current', true)));
					$('#todo-list').find('tr.active .complete').click();
				},
				allowIn: ['input']
			});
		}
	]);
})();