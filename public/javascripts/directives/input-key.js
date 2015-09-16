import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function inputKey () {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.on('keydown', function (e) {
				var key = e.which;

				if (key === 13) {
					if (attrs.inputKey === 'key') {
						$('#key-button').click();
					}
					if (attrs.inputKey === 'confirm') {
						$('#confirm-button').click();
					}
				}
			});
		}
	}
}