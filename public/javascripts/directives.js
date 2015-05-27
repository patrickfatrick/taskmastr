(function () {
	var app = angular.module('taskmastrDirectives', []);

	app.directive('complete', function () {
		return {
			restrict: "E",
			template: '<input class="check" type="checkbox" ng-checked="todo.complete" ng-model="todo.complete"></input>',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					scope.$apply(function () {
						var item = element.parents('.todo');
						var itemVal = item.find('td.todo-cell span').text();
						var todos = scope.user.todos;
						var oldIndex;
						var newIndex;
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
		}
	});
	
	app.directive('delete', function () {
		return {
			restrict: "E",
			template: '<i class="fa fa-trash-o")></i>',
			scope: false,
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					scope.$apply(function () {
						var todos = scope.user.todos;
						var item = element.parents('.todo');
						var itemVal = item.find('td.todo-cell span').text();
						var itemIndex;
						$.each(todos, function (i, val) {
							if (val.item === itemVal) {
								itemIndex = i;
								return false;
							}
						});
						console.log('Deleted the following item');
						console.log(itemVal);
						item.toggle('fade', 250, function() {
							todos.splice(itemIndex, 1);
						});
					});
				});
			}
		}
	});
})();