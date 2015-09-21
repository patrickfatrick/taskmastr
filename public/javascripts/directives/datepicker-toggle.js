import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function datepickerToggle () {
	return {
		restrict: 'A',
		scope: {
			datepickerToggle: '=',
			datepickerIndex: '='
		},
		link: (scope, element, attrs) => {
			const todos = scope.datepickerToggle;
			element.on('click', e => {
				scope.$apply(() => {
					scope.$parent.setDatepickerIndex(scope.datepickerIndex);
					scope.$parent.setDatepickerClear(false);
					scope.$parent.setDatepickerShown(true);
					element.siblings('.datepicker-input').focus();
				});
			});
			$('body').on('mousedown', '.ui-datepicker-close', () => {
				scope.$apply(() => {
					scope.$parent.setDatepickerClear(true);
				});
			});
		}
	}
}