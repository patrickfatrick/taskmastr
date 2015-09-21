import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function todoButton () {
	return {
		restrict: 'A',
		scope: {
			todoButton: '=',
			todoModel: '='
		},
		link: (scope, element, attrs) => {
			let attempt;
			element.on('click', e => {
				scope.$apply(() => {
					//console.log(scope.todoButton + ' ' + scope.$parent.newTodo);
					if (scope.todoModel) {
						scope.$parent.create(scope.todoButton, scope.todoModel, scope.$parent.token());
						//console.log(scope.$parent.user.todos);
						scope.todoModel = '';
						//Remove attempt if it's present
						scope.$parent[attempt] = false;
					}
				});
			});
			//Emoticon handlers
			element.on('mousedown', e => {
				attempt = (scope.todoButton === scope.$parent.user.todos) ? 'listAttempt' : 'todoAttempt';
				if (element.siblings('input:text').val()) {
					$(this).removeClass('fa-arrow-down');
					$(this).addClass('fa-smile-o');
				} else {
					$(this).removeClass('fa-arrow-down');
					$(this).addClass('fa-meh-o');
					//Set attempt to true to show animation
					scope.$parent[attempt] = true;
				}
			});
			element.on('mouseup', e => {
				$(this).removeClass('fa-smile-o').removeClass('fa-meh-o');
				$(this).addClass('fa-arrow-down');
				//Remove attempt after 500ms for animation to finish
				setTimeout(() => {
					scope.$parent[attempt] = false;
					scope.$apply();
				}, 500);
			});
		}
	}
}