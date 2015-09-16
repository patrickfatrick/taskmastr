import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';
import placeholders from '../../libraries/placeholders';

export default function createTodo() {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.on('keydown', function (e) {
				var key = e.which;
				if (key === 13) {
					element.siblings('.submit').click();
					element.val('');
				}
			});
			if (element.hasClass('random-placeholder')) {
				var randIndex = Math.floor(Math.random() * placeholders.placeholders.length);
				element.attr('placeholder', placeholders.placeholders[randIndex]);
			}
		}
	}
}