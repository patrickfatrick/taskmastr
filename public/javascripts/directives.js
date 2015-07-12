(function () {
	var app = angular.module('taskmastrDirectives', []);
	// timoutID set for 'delete' directive timer
	var timeoutID;

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
						var newIndex = todos.length;
						var splicedTodo = todos.splice(scope.completeIndex, 1);
						// If there's a complete todo present, set newIndex to that index, not the end of the list
						_.each(todos, function (val, i) {
							if (val.complete === true) {
								newIndex = i;
								return false;
							}
						});
						todos.splice(newIndex, 0, splicedTodo[0]);
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
					scope.write(scope.user.username);
					element.removeClass('toggled');
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
							scope.$parent.create(scope.todoButton, scope.todoModel);
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
						//console.log(rememberMe);
						// Do lookup if confirm password is null
						if (!scope.confirmPassword) {
							scope.lookup(username, userKey, rememberMe);
							//console.log('lookup');
						}
						//Add user if confirm password is not null and passwords match
						if (scope.confirmPassword && !scope.userForm.confirm.$error.pwmatch) {
							scope.addUser(username, confirmKey, rememberMe);
						}
					});
				});
				//Emoticon handlers
				$('#user-form .submit').bind('mousedown', function (e) {
					$(this).removeClass('fa-arrow-right');
					scope.formAttempt = true;
					if (!scope.userForm.$invalid) {
						$(this).addClass('fa-smile-o');
					} else {
						$(this).addClass('fa-meh-o');
					}
				});
				$('#user-form .submit').bind('mouseup', function (e) {
					$(this).removeClass('fa-smile-o').removeClass('fa-meh-o');
					$(this).addClass('fa-arrow-right');
				})
				//Prevent submission if form is invalid
				$('#user-form .submit').bind('click', function (e) {
					if (scope.userForm.$invalid) {
						e.preventDefault();
					}
				});
			}
		}
	});
	app.directive('pwCheck', function () {
		return {
			restrict: 'A',
			scope: false,
			require: 'ngModel',
			link: function (scope, element, attrs, ctrl) {
				var firstPassword = '#' + attrs.pwCheck;
				$('.submit').on('click', function (e) {
					if (scope.confirmPassword) {
						var valid;
						scope.$apply(function () {
							valid = element.val() === $(firstPassword).val();
							ctrl.$setValidity('pwmatch', valid);
						});
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
					scope.$apply(function () {
						var item = element.parents('tr');
						if (!item.hasClass('deleting')) {
							element.removeClass('fa-trash-o').addClass('fa-undo');
							item.addClass('deleting');
							timeoutID = setTimeout(function () {
								var index = scope.deleteIndex;
								var arr = scope.deleteButton;
								var arrLength = arr.length;
								var spliced = arr.splice(index, 1);
								// Current list handlers: 
								// 1) Check if user is deleting the only list: do not allow
								// 2) Check if deleted list is the last list: set current to first list
								// 3) By default if current list is deleted: set current to next list
								if (spliced[0].current && arrLength === 1) {
									arr.splice(0, 1, spliced[0]);
									element.removeClass('fa-undo').addClass('fa-trash-o');
									item.removeClass('deleting');
								} else if (spliced[0].current && index === (arrLength - 1)) {
									scope.$parent.setCurrent(0);
								} else if (spliced[0].current) {
									scope.$parent.setCurrent(index);
								}
								scope.$apply();
							}, 5000);
						} else {
							clearTimeout(timeoutID);
							element.removeClass('fa-undo').addClass('fa-trash-o');
							item.removeClass('deleting');
						}
					});
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
						$('#create-list').focus();
					} else {
						$('#content').removeClass('menued');
						element.removeClass('toggled');
						element.find('.fa-times').removeClass('fa-times').addClass('fa-bars');
						$('#menu').removeClass('toggled');
						$('#create-todo').focus();
					}
				});
			}
		}
	});
})();