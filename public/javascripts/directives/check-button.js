import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function checkButton() {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.bind('click', function () {
				element.siblings('.check').click();
			});
		}
	}
}