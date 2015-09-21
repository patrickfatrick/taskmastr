import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';
import _ from 'lodash';

export default function save() {
	return {
		restrict: 'A',
		scope: false,
		link: (scope, element, attrs) => {
			element.on('click', () => {
				_.each(scope.user.todos, (val, i) => {
					_.each(val.items, (itemVal, j) => {
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