/**
* Controls the checkbox to complete a task
*/

import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function checkButton() {
	return {
		restrict: 'A',
		scope: false,
		link: (scope, element, attrs) => {
			element.on('click', () => {
				element.siblings('.check').click();
			});
		}
	}
}