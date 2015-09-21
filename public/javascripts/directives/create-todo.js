import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';
import placeholders from '../../libraries/placeholders';

export default function createTodo() {
	return {
		restrict: 'A',
		scope: false,
		link: (scope, element, attrs) => {
			element.on('keydown', e => {
				const key = e.which;
				if (key === 13) {
					element.siblings('.submit').click();
					element.val('');
				}
			});
			if (element.hasClass('random-placeholder')) {
				const randIndex = Math.floor(Math.random() * placeholders.placeholders.length);
				element.attr('placeholder', placeholders.placeholders[randIndex]);
			}
		}
	}
}