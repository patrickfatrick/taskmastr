import $ from 'jquery';
import jQuery from 'jquery';
import 'jquery-ui';
import angular from 'angular';
import _ from 'lodash';
import 'Sortable';
import 'ng-sortable';
import hotkeys from 'angular-hotkeys';
import date from 'date.js';
import dateStrs from 'dateStrs';

export default function UserController () {
	return ['$http', '$scope', '$log', '$location', 'hotkeys',
		($http, $scope, $log, $location, hotkeys) => {
			
			$scope.user.todos = {};
			
			/*******************************
			 *******Server connections******
			 *******************************/
			
			/*********Session data*********/
			
			
			$http.get('/session-data')
			.then(response => {
				//$log.log('Get successful: ' + response.status + response.statusText);
				//$log.log(response);
				if (response.status === 204) return delete $scope.user.todos;
				$scope.user.username = response.data.username;
				if (response.data.hasOwnProperty('todos')) $scope.user.todos = response.data.todos;
				_.each($scope.user.todos, (val, i) => {
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
				if (response.data.hasOwnProperty('key')) $scope.user.key = response.data.key;
				$scope.user.darkmode = (response.data.hasOwnProperty('darkmode')) ? response.data.darkmode : false;
				//$log.log('User profile mounted...');
				//$log.log($scope.user);
				_.each($scope.user.todos, (val, i) => {
					if (!val.agendaID) val.agendaID = $scope.token();
					_.each(val.items, (itemVal, j) => {
						if (!itemVal.agendaID) itemVal.agendaID = $scope.token();
					});
				});
			})
			.catch(response => {
				$log.error('Error getting user: ' + response.status + response.statusText);
			});
			
			/************Lookup************/
			
			$scope.lookup = (username, key, rememberMe) => {
				$http.post('/users/login', {
					username: username,
					key: key,
					rememberMe: rememberMe
				})
				.then(response => {
					//$log.log('Get successful: ' + response.status + response.statusText);
					//$log.log(response);
					if (status === 204) {
						$scope.confirmPassword = true;
						$scope.invalidPassword = false;
						return;
					}
					$scope.user.todos = response.data.todos;
					_.each($scope.user.todos, (val, i) => {
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
					if (response.data.hasOwnProperty('key')) $scope.user.key = response.data.key;
					$scope.user.darkmode = (response.data.hasOwnProperty('darkmode')) ? response.data.darkmode : false;
					//$log.log('User profile mounted...');
					//$log.log($scope.user);
					_.each($scope.user.todos, (val, i) => {
						if (!val.agendaID) val.agendaID = $scope.token();
						_.each(val.items, (itemVal, j) => {
							if (!itemVal.agendaID) itemVal.agendaID = $scope.token();
						});
					});
				})
				.catch(response => {
					$log.error('Error getting user: ' + response.status + response.statusText);
					if (response.status === 401) {
						$scope.invalidPassword = true;
						$scope.confirmPassword = false;
					}
				});
			};
			
			/***********New user***********/
			
			$scope.addUser = (user, key, rememberMe) => {
				$http.post('/users/create', {
					username: user,
					key: key,
					rememberMe: rememberMe
				})
				.then(response => {
					//$log.log('Create successul: ' + response.status + response.statusText);
					//$log.log(response);
					$scope.user.todos = (response.data.todos) ? response.data.todos : [{
						list: "List 1",
						current: true,
						items: []
				}];
					$scope.user.current = _.find($scope.user.todos, _.matchesProperty('current', true)) ? _.find($scope.user.todos, _.matchesProperty('current', true)) : {
						list: "List 1",
						current: true,
						items: []
					};
					if (response.data.hasOwnProperty('key')) $scope.user.key = response.data.key;
					$scope.user.darkmode = (response.data.hasOwnProperty('darkmode')) ? response.data.darkmode : true;
					//$log.log('User profile mounted...');
					//$log.log($scope.user);
					$scope.write(user);
				})
				.catch(response => {
					$log.error('Error creating user: ' + response.status + response.statusText);
				});
			};
			
			/**
			* Save data back to MongoDB
			* @param 		{String} 		username 			email address
			* @returns 	{Boolean} 								success or failure
			*/
			
			$scope.write = username => {
				const now = new Date();
				$scope.user.dateModified = now.toISOString();
				_.set($scope.user.todos, _.find($scope.user.todos, _.matchesProperty('current', true)), $scope.user.current);
				//$log.log('Saving to db...')
				//$log.log($scope.user);
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
				.then(response => {
					//$log.log('Write successful: ' + response.status + responses.statusText);
					//$log.log('saveButton = ' + $scope.saveButton);
					$scope.saveButton = false;
					$scope.deleteAgendas = [];
					return true;
				})
				.catch(response => {
					$log.log('Error writing data: ' + response.status + response.statusText);
				});
			};
			
			/***********Log out************/
			
			$scope.logout = () => {
				$http.get('/users/logout')
				.then(response => {
					//$log.log('Logged out');
					window.location.href = '/';
				})
				.error(response => {
					$log.log('Error logging out: ' + response.status + response.statusText);
				});
			};
			
			/*******************************
			 *******Password resetting*******
			 *******************************/
			
			$scope.resetPassword = (token, newKey) => {
				$http.post('/users/reset', {
					token: token,
					newKey: newKey
				})
				.then(response =>{
					if (response.data) {
						$scope.user.username = response.data.username;
						$scope.user.todos = response.data.todos;
						$scope.user.current = _.find($scope.user.todos, _.matchesProperty('current', true)) ? _.find($scope.user.todos, _.matchesProperty('current', true)) : {
							list: "List 1",
							current: true,
							items: []
						};
						//$log.log($scope.user.current);
						//$scope.user.todos = $scope.user.current.items;
						if (response.data.hasOwnProperty('key')) $scope.user.key = response.data.key;
						$scope.user.darkmode = (response.data.hasOwnProperty('darkmode')) ? response.data.darkmode : false;
						//$log.log('User profile mounted...');
						//$log.log($scope.user);
						$location.path('/');
						//$log.log($location.path());
					}
				})
				.catch(response => {
					$scope.resetFail = true;
					$log.log('Error resetting password: ' + response.status + response.statusText);
				});
			};
			$scope.setToken = user => {
				$http.post('users/forgot', {
					username: user
				})
				.then(response => {
					$log.log(response.data);
					$scope.emailSent = true;
				})
				.catch(response => {
					$log.log('Error creating reset token: ' + response.status + response.statusText);
					$scope.emailSent = false;
				});
			};
			
			const reset = $location.search().reset;
			if (reset) {
				//$log.log('Reset');
				$scope.resetForm = true;
				$scope.resetToken = $location.search().token;
			}
			
			$scope.rand = () => {
				return Math.random().toString(36).substr(2);
			}
			
			$scope.token = () => {
				return $scope.rand() + $scope.rand() + $scope.rand();
			}
			$scope.sortableOptions = {
				handle: '.sort',
				sort: true,
				delay: 0,
				animation: 75,
				ghostClass: 'ghost',
				scroll: true,
				scrollSensitivity: 30,
				scrollSpeed: 10,
				onUpdate: evt => {
					const itemEl = evt.model.item;
					const itemComplete = evt.model.complete;
					let completeIndex;
					_.each($scope.user.current.items, (val, i) => {
						if (val.complete === true && val != evt.model) {
							completeIndex = i;
							return false;
						}
					});
					
					//$log.log(evt.model);
					//$log.log('CompleteIndex: ' + completeIndex);
					//$log.log('OldIndex: ' + evt.oldIndex);
					//$log.log('NewIndex: ' + evt.newIndex);
					
					let spliced;
					
					//Checks:
					//1) If element is not complete and is being moved into complete list, move back up
					//2) If element is complete and is being moved into uncomplete list, move back down
					//3) if element is complete and also the only complete, move back to end of list
					if (evt.newIndex > completeIndex && !itemComplete) {
						spliced = $scope.user.current.items.splice(evt.newIndex, 1);
						$scope.user.current.items.splice(completeIndex, 0, spliced[0]);
					} else if (evt.newIndex < completeIndex && itemComplete) {
						spliced = $scope.user.current.items.splice(evt.newIndex, 1);
						$scope.user.current.items.splice(completeIndex - 1, 0, spliced[0]);
					} else if (!completeIndex && itemComplete) {
						spliced = $scope.user.current.items.splice(evt.newIndex, 1);
						$scope.user.current.items.push(spliced[0]);
					}
				}
			};
			$scope.setDatepickerIndex = index => {
				$scope.datepickerIndex = index;
			}
			$scope.setDatepickerClear = bool => {
				$scope.datepickerClear = bool;
			}
			$scope.setDatepickerShown = bool => {
				$scope.datepickerShown = bool;	
			}
			$scope.datepickerOptions = {
				showButtonPanel: true,
				showAnim: '',
				dateFormat: 'yy-mm-dd',
				closeText: 'Clear',
				prevText: '',
				nextText: '',
				onSelect: () => {
					$scope.datepickerShown = false;
				},
				onClose: (dateText, inst) => {
					//$log.log($scope.datepickerClear);
					//$log.log($scope.user.current.items[$scope.datepickerIndex].dueDate);
					//$log.log($scope.user.todos);
					$scope.datepickerShown = false;
					if ($scope.datepickerClear) {
						delete $scope.user.current.items[$scope.datepickerIndex].dueDate;
						$scope.$apply();
					}
				}
			};
			
			let counter = 0;
			
			/*********Create item**********/
			
			$scope.create = (arr, item, agendaID) => {
				if (arr === $scope.user.todos) {
					arr.unshift({
						list: item.trim(),
						current: false,
						items: [],
						agendaID: agendaID,
					});
				} else {
					let dateObj;
					if (item.indexOf('Remind me to ') === 0 || item.indexOf('remind me to ') === 0 || item.indexOf('/') === 0) {
						const char = (item.indexOf('Remind me to ') !== -1 || item.indexOf('remind me to ') !== -1) ? 13 : 3;
						const shortcut = (item.substring(0, char - 1));
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
						dueDate: dateObj,
						current: (!arr.length) ? true : false
					});
				}
				//$log.log('Creating todo... OK');
			};
			$scope.deleteAgendas = [];
			$scope.setDeleteAgendas = agendaID => {
				$scope.deleteAgendas.push(agendaID);
			};
			
			/**********Observers***********/
			
			$scope.$watch('user.todos', (newValue, oldValue) => {
				if (newValue === oldValue) return;
				if (counter >= 2) $scope.saveButton = true;
				//$log.log('saveButton = ' + $scope.saveButton);
				counter += 1;
				//$.log('todo counter = ' + counter);
			}, true);
			$scope.$watch('user.darkmode', (newValue, oldValue) => {
				if (newValue === oldValue) return;
				if (counter >= 2) $scope.saveButton = true;
				//$log.log('saveButton = ' + $scope.saveButton);
				counter += 1;
				//$.log('darkmode counter = ' + counter);
			}, true);
			
			/**********Set active**********/
			
			$scope.setCurrent = (arr, index) => {
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
			$scope.shiftCurrentDown = (arr, index) => {
				if (!index) {
					index = _.findIndex(arr, 'current', true);
				}
				if (index === arr.length - 1) {
					return false;
				}
				const splicedTodo = _.remove(arr, 'current', true);
				if (!splicedTodo[0].complete && arr[index].complete) {
					arr.splice(index, 0, splicedTodo[0])
				} else {
					arr.splice(index + 1, 0, splicedTodo[0]);
				}
			}
			$scope.shiftCurrentUp = (arr, index) => {
				if (!index) {
					index = _.findIndex(arr, 'current', true);
				}
				if (index === 0) {
					return false;
				}
				const splicedTodo = _.remove(arr, 'current', true);
				if (splicedTodo[0].complete && !arr[index - 1].complete) {
					arr.splice(index, 0, splicedTodo[0])
				} else {
					arr.splice(index - 1, 0, splicedTodo[0]);
				}
			}
			
			/************Hotkeys************/
			
			hotkeys.bindTo($scope).add({
				combo: 'command+m',
				description: 'Toggle Night Mode/Bright Mode',
				callback: (e, keypress) => {
					e.preventDefault();
					$scope.user.darkmode = ($scope.user.darkmode) ? false : true;
				},
				allowIn: ['input']
			}).add({
				combo: 'command+s',
				description: 'Save your data',
				callback: (e, keypress) => {
					e.preventDefault();
					$('#save-button').click();
				},
				allowIn: ['input']
			}).add({
				combo: 'alt+right',
				description: 'Show the lists menu',
				callback: () => {
					$('#icon-menu:not(".toggled")').click();
				},
				allowIn: ['input']
			}).add({
				combo: 'alt+left',
				description: 'Hide the lists menu',
				callback: () => {
					$('#icon-menu.toggled').click();
				},
				allowIn: ['input']
			}).add({
				combo: 'ctrl+f',
				description: 'Focus on the task creation input',
				callback: (e, keypress) => {
					e.preventDefault();
					$('#create-todo').focus();
				},
				allowIn: ['input']
			}).add({
				combo: 'alt+f',
				description: 'Focus on the list creation input',
				callback: (e, keypress) => {
					e.preventDefault();
					$('#create-list').focus();
				},
				allowIn: ['input']
			}).add({
				combo: 'down',
				description: 'Select the next task',
				callback: (e, keypress) => {
					e.preventDefault();
					$scope.setCurrent($scope.user.current.items, _.findIndex($scope.user.current.items, 'current', true) + 1);
				},
				allowIn: ['input']
			}).add({
				combo: 'up',
				description: 'Select the previous task',
				callback: (e, keypress) => {
					e.preventDefault();
					$scope.setCurrent($scope.user.current.items, _.findIndex($scope.user.current.items, 'current', true) - 1);
				},
				allowIn: ['input']
			}).add({
				combo: 'alt+down',
				description: 'Select the next list',
				callback: () => {
					$scope.setCurrent($scope.user.todos, _.findIndex($scope.user.todos, 'current', true) + 1);
				},
				allowIn: ['input']
			}).add({
				combo: 'alt+up',
				description: 'Select the previous list',
				callback: () => {
					$scope.setCurrent($scope.user.todos, _.findIndex($scope.user.todos, 'current', true) - 1);
				},
				allowIn: ['input']
			}).add({
				combo: 'ctrl+r',
				description: 'Rename the selected task',
				callback: () => {
					$('#todo-list .active .rename-button').click();
				},
				allowIn: ['input']
			}).add({
				combo: 'alt+r',
				description: 'Rename the selected list',
				callback: (e, keypress) => {
					e.preventDefault();
					$('#lists-list .current .rename-button').click();
				},
				allowIn: ['input']
			}).add({
				combo: 'ctrl+d',
				description: 'Toggle the active task\'s datepicker',
				callback: (e, keypress) => {
					$('#todo-list .active .datepicker-input').focus();
				},
				allowIn: ['input']
			}).add({
				combo: 'command+down',
				description: 'Move selected task down',
				callback: (e, keypress) => {
					$scope.shiftCurrentDown($scope.user.current.items);
				},
				allowIn: ['input']
			}).add({
				combo: 'command+up',
				description: 'Move selected task up',
				callback: () => {
					$scope.shiftCurrentUp($scope.user.current.items);
				},
				allowIn: ['input']
			}).add({
				combo: 'alt+command+down',
				description: 'Move selected list down',
				callback: (e, keypress) => {
					$scope.shiftCurrentDown($scope.user.todos);
				},
				allowIn: ['input']
			}).add({
				combo: 'alt+command+up',
				description: 'Move selected list up',
				callback: () => {
					$scope.shiftCurrentUp($scope.user.todos);
				},
				allowIn: ['input']
			}).add({
				combo: 'command+backspace',
				description: 'Remove selected task\'s due date',
				callback: () => {
					delete _.find($scope.user.current.items, 'current', true).dueDate;
				},
				allowIn: ['input']
			});
		}
	]
}