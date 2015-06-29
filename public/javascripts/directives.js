(function () {
	var app = angular.module('taskmastrDirectives', []);

	var mobileButtons = function () {
		var width = $(window).width();
		if (width < 768) {
			$('table tbody td.utils').velocity('fadeOut', {
				duration: 100
			});
			$('table tbody td.toggle').velocity('fadeIn', {
				delay: 100,
				display: 'table-cell',
				duration: 100
			});
		}
	}
	var getIndex = function (scope, element) {
		var item = element.parents('.todo');
		var itemVal = item.find('td.todo-cell span').text();
		var todos = scope.user.todos;
		var index;
		_.each(todos, function (val, i) {
			if (val.item === itemVal) {
				index = i;
				return false;
			}
		});
		return index;
	}
	var timeoutID;

	app.directive('complete', function () {
		return {
			restrict: "A",
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					scope.$apply(function () {
						var todos = scope.user.todos;
						var oldIndex = getIndex(scope, element);
						var newIndex = todos.length;
						var splicedTodo = todos.splice(oldIndex, 1);
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
					mobileButtons();
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
	app.directive('mobileButton', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					$('table tbody td.toggle').velocity('fadeOut', {
						duration: 100
					});
					$('table tbody td.utils').velocity('fadeIn', {
						delay: 100,
						display: 'table-cell',
						duration: 100
					});
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
						$('#todo-button').click();
						$('#create-todo').val('');
					}
				});
			}
		}
	});
	app.directive('todoButton', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function (e) {
					scope.$apply(function () {
						if (scope.newTodo) {
							scope.create(scope.newTodo);
							mobileButtons();
							scope.newTodo = '';
						}
					});
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
			}
		}
	});
	app.directive('deleteButton', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function (e) {
					scope.$apply(function () {
						var todo = element.parents('.todo');
						if (!todo.hasClass('deleting')) {
							element.removeClass('fa-trash-o').addClass('fa-undo');
							todo.addClass('deleting');
							timeoutID = setTimeout(function () {
								var index = getIndex(scope, element);
								scope.delete(index);
								scope.$apply();
							}, 5000);
						} else {
							clearTimeout(timeoutID);
							element.removeClass('fa-undo').addClass('fa-trash-o');
							todo.removeClass('deleting');
						}
					});
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
				$('#user-form').on('submit', function (e) {
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
})();