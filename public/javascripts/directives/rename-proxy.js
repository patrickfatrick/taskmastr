import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function renameProxy() {
	return {
		restrict: 'A',
		scope: false,
		link: (scope, element, attrs) => {
			element.on('dblclick', () => {
				element.parents('tr').find('.rename-button').click();
			});
		}
	}
}