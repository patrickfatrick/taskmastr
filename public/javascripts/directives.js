(function () {
	var app = angular.module('taskmastrDirectives', []);

	app.directive('complete', function () {
		return {
			restrict: "A",
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					scope.$apply(function () {
						var item = element.parents('.todo');
						var itemVal = item.find('td.todo-cell span').text();
						var todos = scope.user.todos;
						var oldIndex;
						var newIndex = todos.length;
						$.each(todos, function (i, val) {
							if (val.item === itemVal) {
								oldIndex = i;
								return false;
							}
						});
						var splicedTodo = todos.splice(oldIndex, 1);
						$.each(todos, function (i, val) {
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
					scope.$apply(function() {
						scope.create(scope.newTodo);
					});
				});
			}
		}
	});
})();