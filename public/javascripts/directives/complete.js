import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';
import _ from 'lodash';

export default function complete() {
	return {
		restrict: "A",
		scope: {
			complete: '=',
			completeIndex: '='
		},
		link: (scope, element, attrs) => {
			element.on('click', () => {
				scope.$apply(() => {
					const todos = scope.complete;
					// If there's a complete todo present, set newIndex to that index, not the end of the list
					const splicedTodo = todos.splice(scope.completeIndex, 1);
					//console.log('OldIndex: ' + scope.completeIndex);
					//console.log(splicedTodo);
					let newIndex = todos.length;
					_.each(todos, (val, i) => {
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
}