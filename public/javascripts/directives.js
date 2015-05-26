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
						var checked = element.prop('checked');
						var item = element.parents('.todo');
						var list = element.parents('tbody');
						var firstComplete = item.siblings('.complete').first();
						/*if (checked) {
							firstComplete.length > 0 ? firstComplete.before(item) : list.append(item);
							list.removeAttr('ui-sortable');
							list.attr('ui-sortable', 'sortableOptions');
						} else {
							firstComplete.length > 0 ? firstComplete.before(item) : list.append(item);
							list.removeAttr('ui-sortable');
							list.attr('ui-sortable', 'sortableOptions');
						}*/
					});
				});
			}
		}
	});
})();