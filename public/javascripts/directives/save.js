import angular from 'angular';
import _ from 'lodash';

export default function save() {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.on('click', function () {
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
}