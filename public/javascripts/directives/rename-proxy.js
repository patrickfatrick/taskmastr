import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function renameProxy() {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.on('dblclick', function () {
				element.parents('tr').find('.rename-button').click();
			});
		}
	}
}