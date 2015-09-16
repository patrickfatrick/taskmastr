import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function rename() {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.on('click', function () {
				var text = element.parents('tr').find('span.name');
				var rename = element.parents('tr').find('.rename');
				text.hide();
				rename.show().select();
			});

			var renameHandler = function (el) {
				if ($('.rename').val()) {
					el.siblings('.name').show();
					el.hide();
				}
			}
			
			$('table tbody').on({
					keydown: function (e) {
						var key = e.which;
						if (key === 13) {
							renameHandler($(this));
						}
					},
					blur: function () {
						renameHandler($(this));
					}
				},
				'.rename'
			);
		}
	}
}