import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function rename() {
	return {
		restrict: 'A',
		scope: false,
		link: (scope, element, attrs) => {
			element.on('click', () => {
				const text = element.parents('tr').find('span.name');
				const rename = element.parents('tr').find('.rename');
				text.hide();
				rename.show().select();
			});

			let renameHandler = el => {
				if ($('.rename').val()) {
					el.siblings('.name').show();
					el.hide();
				}
			}
			
			$('table tbody').on({
					keydown: e => {
						const key = e.which;
						if (key === 13) {
							renameHandler($(this));
						}
					},
					blur: () => {
						renameHandler($(this));
					}
				},
				'.rename'
			);
		}
	}
}