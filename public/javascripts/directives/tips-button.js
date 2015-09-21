import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function tipsButton() {
	return {
		restrict: 'A',
		scope: false,
		link: (scope, element, attrs) => {
			element.on('click', e => {
				if ($('#tips-button').hasClass('toggled')) {
					$('.fine-print').velocity('slideUp', {
						duration: 250,
						complete: () => {
							$('#tips-button').removeClass('toggled');
						}
					});
				} else {
					$('.fine-print').velocity('slideDown', {
						duration: 250,
						complete: () => {
							$('#tips-button').addClass('toggled');
						}
					});
				}
			});
		}
	}
}