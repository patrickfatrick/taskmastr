import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function tipsButton() {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.bind('click', function (e) {
				if ($('#tips-button').hasClass('toggled')) {
					$('.fine-print').velocity('slideUp', {
						duration: 250,
						complete: function () {
							$('#tips-button').removeClass('toggled');
						}
					});
				} else {
					$('.fine-print').velocity('slideDown', {
						duration: 250,
						complete: function () {
							$('#tips-button').addClass('toggled');
						}
					});
				}
			});
		}
	}
}