(function () {
	var app = angular.module('taskmastrDirectives', []);
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
						if (!scope.confirmPassword) {
							scope.lookup(username, userKey, rememberMe);
							//console.log('lookup');
						}
						if (scope.confirmPassword && !scope.userForm.confirm.$error.pwmatch) {
							scope.addUser(username, confirmKey, rememberMe);
						}
					});
				});
				$('#user-form .submit').bind('mousedown', function (e) {
					$(this).removeClass('fa-arrow-right');
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
								if (spliced[0].current && index === (arrLength - 1)) {
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
})();