(function () {
	var app = angular.module('taskmastrDirectives', []);
	// timoutID set for 'delete' directive timer
	var timeoutID;
	var pending = {};

	// Handler to prevent auto-focuses on text inputs for mobile
	function windowWidth() {
		return ($(window).width() > 768) ? true : false;
	}

	app.directive('complete', function () {
		return {
			restrict: "A",
			scope: {
				complete: '=',
				completeIndex: '='
			},
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					scope.$apply(function () {
						var todos = scope.complete;
						// If there's a complete todo present, set newIndex to that index, not the end of the list
						var splicedTodo = todos.splice(scope.completeIndex, 1);
						//console.log('OldIndex: ' + scope.completeIndex);
						//console.log(splicedTodo);
						var newIndex = todos.length;
						_.each(todos, function (val, i) {
							if (val.complete === true) {
								newIndex = i;
								return false;
							}
						});
						//console.log('NewIndex: ' + newIndex);
						todos.splice(newIndex, 0, splicedTodo[0]);
						//scope.$parent.complete(scope.complete, scope.completeIndex);
					});
				});
			}
		};
	});
	app.directive('save', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					_.each(scope.user.todos, function (val, i) {
						_.each(val.items, function (itemVal, j) {
							if (itemVal.dueDate) {
								//console.log(new Date(itemVal.dueDate).getHours());
								itemVal.dueDate = new Date(itemVal.dueDate).setHours(0)
								itemVal.dueDate = new Date(itemVal.dueDate).setMinutes(0);
								itemVal.dueDate = new Date(itemVal.dueDate);
								//console.log(new Date(itemVal.dueDate).getHours());
							}
						});
					});
					//scope.$apply();
					scope.write(scope.user.username);
				});
			}
		}
	});
	app.directive('checkButton', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					element.siblings('.check').click();
				});
			}
		}
	});
	// 'createTodo' is actually also used for the Lists text input
	app.directive('createTodo', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('keydown', function (e) {
					var key = e.which;
					if (key === 13) {
						element.siblings('.submit').click();
						element.val('');
					}
				});
			}
		}
	});
	app.directive('todoButton', function () {
		return {
			restrict: 'A',
			scope: {
				todoButton: '=',
				todoModel: '='
			},
			link: function (scope, element, attrs) {
				element.bind('click', function (e) {
					scope.$apply(function () {
						//console.log(scope.todoButton + ' ' + scope.$parent.newTodo);
						if (scope.todoModel) {
							scope.$parent.create(scope.todoButton, scope.todoModel, scope.$parent.token());
							//console.log(scope.$parent.user.todos);
							scope.todoModel = '';
						}
					});
				});
				//Emoticon handlers
				element.bind('mousedown', function (e) {
					if (element.siblings('input:text').val()) {
						$(this).removeClass('fa-arrow-down');
						$(this).addClass('fa-smile-o');
					} else {
						$(this).removeClass('fa-arrow-down');
						$(this).addClass('fa-meh-o');
					}
				});
				element.bind('mouseup', function (e) {
					$(this).removeClass('fa-smile-o').removeClass('fa-meh-o');
					$(this).addClass('fa-arrow-down');
				});
			}
		}
	});
	app.directive('inputKey', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('keydown', function (e) {
					var key = e.which;

					if (key === 13) {
						if (attrs.inputKey === 'key') {
							$('#key-button').click();
						}
						if (attrs.inputKey === 'confirm') {
							$('#confirm-button').click();
						}
					}
				});
			}
		}
	});
	app.directive('loginForm', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('submit', function (e) {
					scope.$apply(function () {
						var username = scope.user.username;
						var userKey = scope.user.key;
						var confirmKey = scope.user.confirm;
						var rememberMe = scope.rememberMe;
						// Do lookup if confirm password is null
						if (!scope.confirmPassword) {
							scope.lookup(username, userKey, rememberMe);
							//console.log('lookup');
						}
						//Add user if confirm password is not null and passwords match
						if (scope.confirmPassword && !scope.userForm.confirm.$error.pattern) {
							scope.addUser(username, confirmKey, rememberMe);
						}
					});
				});
				//Emoticon handlers
				$('#user-form .submit').on({
					mousedown: function (e) {
						$(this).removeClass('fa-arrow-right');
						if (!scope.userForm.$invalid) {
							$(this).addClass('fa-smile-o');
						} else {
							$(this).addClass('fa-meh-o');
						}
					},
					mouseup: function (e) {
						$(this).removeClass('fa-smile-o').removeClass('fa-meh-o');
						$(this).addClass('fa-arrow-right');
					},
					click: function (e) {
						scope.$apply(function () {
							scope.formAttempt = true;
						});
						if (scope.forgot) {
							scope.setToken(scope.user.username);
							return false;
						}
						if (scope.userForm.$invalid) {
							e.preventDefault();
						}
					}
				});
			}
		}
	});
	app.directive('resetForm', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('submit', function (e) {
					scope.$apply(function ($location) {
						var token = scope.resetToken;
						var newKey = scope.user.newKey;
						if (!scope.resetForm.confirmReset.$error.pattern) {
							scope.resetPassword(token, newKey);
						}
					});
				});
				//Emoticon handlers
				$('#user-form .submit').on({
					mousedown: function (e) {
						$(this).removeClass('fa-arrow-right');
						if (!scope.userForm.$invalid) {
							$(this).addClass('fa-smile-o');
						} else {
							$(this).addClass('fa-meh-o');
						}
					},
					mouseup: function (e) {
						$(this).removeClass('fa-smile-o').removeClass('fa-meh-o');
						$(this).addClass('fa-arrow-right');
					},
					click: function (e) {
						scope.$apply(function () {
							scope.formAttempt = true;
						});
						if (scope.resetForm.$invalid) {
							e.preventDefault();
						}
					}
				});
			}
		}
	});
	app.directive('deleteButton', function () {
		return {
			restrict: 'A',
			scope: {
				deleteButton: '=',
				deleteIndex: '='
			},
			link: function (scope, element, attrs) {
				element.bind('click', function (e) {
					var item = element.parents('tr');
					var arr = scope.deleteButton;
					if (!item.hasClass('deleting')) {
						element.removeClass('fa-trash-o').addClass('fa-undo');
						item.addClass('deleting');
						var arrLength = arr.length;
						var index = _.findIndex(arr, 'agendaID', scope.deleteIndex);;
						// 1) Deleting a list
						// 2) Deleting a task
						if (arr === scope.$parent.user.todos) {
							timeoutID = setTimeout(function () {
								scope.$apply(function () {
									var spliced = _.remove(arr, 'agendaID', scope.deleteIndex);
									//console.log(spliced[0]);
									
									// Current list handlers: 
									// 1) Check if user is deleting the only list: do not allow
									// 2) Check if deleted list is the last list: set current to first list
									// 3) By default if current list is deleted: set current to next list
									if (spliced[0].current && arrLength === 1) {
										arr.splice(0, 1, spliced[0]);
										spliced = undefined;
										element.removeClass('fa-undo').addClass('fa-trash-o');
										item.removeClass('deleting');
									} else if (spliced[0].current && index === (arrLength - 1)) {
										scope.$parent.setCurrent(arr, 0);
									} else if (spliced[0].current) {
										scope.$parent.setCurrent(arr, index);
									}
									//If deleted, delete the list's agendas
									if (spliced) {
										_.each(spliced[0].items, function (val, i) {
											scope.$parent.setDeleteAgendas(val.agendaID);
										});
									}
								});
							}, 5000);
							pending[timeoutID] = 1;
							_.find(arr, _.matchesProperty('agendaID', scope.deleteIndex)).timeoutID = timeoutID;
						} else {
							timeoutID = setTimeout(function () {
								scope.$apply(function () {
									var spliced = _.remove(arr, 'agendaID', scope.deleteIndex);
									if (spliced[0].current && index === (arrLength - 1)) {
										scope.$parent.setCurrent(arr, 0);
									} else if (spliced[0].current) {
										scope.$parent.setCurrent(arr, index);
									}
									//console.log(spliced);
									
									//If deleted, delete associated agendas
									scope.$parent.setDeleteAgendas(spliced[0].agendaID);
								});
							}, 5000);
							pending[timeoutID] = 1;
							_.find(arr, _.matchesProperty('agendaID', scope.deleteIndex)).timeoutID = timeoutID;
						}
					} else {
						element.removeClass('fa-undo').addClass('fa-trash-o');
						item.removeClass('deleting');
						var deleteID;
						scope.$apply(function () {
							deleteID = _.find(arr, _.matchesProperty('agendaID', scope.deleteIndex)).timeoutID;
							if (pending.hasOwnProperty(deleteID)) {
								clearTimeout(deleteID);
								delete pending[deleteID];
								delete _.find(arr, _.matchesProperty('agendaID', scope.deleteIndex)).timeoutID;
								//console.log('Timeout cleared: ' + deleteID);
							}
						});
					}
				});
			}
		}
	});
	app.directive('tipsButton', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function (e) {
					if ($('#tips-button').hasClass('toggled')) {
						$('.fine-print').velocity('slideUp', {
							duration: 250,
							complete: function () {
								$('#tips-button').removeClass('toggled');
							}
						});
					} else {
						$('.fine-print').velocity('slideDown', {
							duration: 250,
							complete: function () {
								$('#tips-button').addClass('toggled');
							}
						});
					}
				});
			}
		}
	});
	app.directive('menuToggle', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function (e) {
					if (!$('#menu').hasClass('toggled')) {
						$('#content').addClass('menued');
						element.addClass('toggled');
						element.find('.fa-bars').removeClass('fa-bars').addClass('fa-times');
						$('#menu').addClass('toggled');
						if (windowWidth()) {
							$('#create-list').focus();
						}
					} else {
						$('#content').removeClass('menued');
						element.removeClass('toggled');
						element.find('.fa-times').removeClass('fa-times').addClass('fa-bars');
						$('#menu').removeClass('toggled');
						if (windowWidth()) {
							$('#create-todo').focus();
						}
					}
				});
			}
		}
	});
	app.directive('datepickerToggle', function () {
		return {
			restrict: 'A',
			scope: {
				datepickerToggle: '=',
				datepickerIndex: '='
			},
			link: function (scope, element, attrs) {
				var todos = scope.datepickerToggle;
				element.bind('click', function (e) {
					scope.$apply(function () {
						scope.$parent.setDatepickerIndex(scope.datepickerIndex);
						scope.$parent.setDatepickerClear(false);
						element.siblings('.datepicker-input').focus();
					});
				});
				$('body').on('mousedown', '.ui-datepicker-close', function () {
					scope.$apply(function () {
						scope.$parent.setDatepickerClear(true);
					});
				});
			}
		}
	});
})();