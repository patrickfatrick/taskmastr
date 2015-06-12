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
			link: function (scope, element, attr) {
				element.bind('click', function () {
					scope.write(scope.user.key);
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
			link: function (scope, element, attr) {
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
			link: function (scope, element, attr) {
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
			link: function (scope, element, attr) {
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
			link: function (scope, element, attr) {
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
			link: function (scope, element, attr) {
				element.bind('keydown', function (e) {
					var key = e.which;
					if (key === 13) {
						$('#key-button').click();
					}
				});
			}
		}
	});
	app.directive('keyButton', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attr) {
				element.bind('click', function (e) {
					var userKey = scope.user.key;
					scope.lookup(userKey);
					scope.$apply(function () {
						var modal = $('#key-modal');
						var mask = $('#mask');
						var modalWidth = modal.width();
						var modalHeight = modal.height();
						var width = $(window).width();
						if (userKey) {
							mask.addClass('inactive-mask');
							modal.removeClass('active-modal').addClass('inactive-modal');
							setTimeout(function () {
								modal.remove();
								mask.remove();
							}, 750);
						}

						$('#create-todo').focus();
					});
				});
			}
		}
	});
	app.directive('deleteButton', function () {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attr) {
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
})();
