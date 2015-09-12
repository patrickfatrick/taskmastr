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
		link: function (scope, element, attrs) {
			var todos = scope.datepickerToggle;
			element.bind('click', function (e) {
				scope.$apply(function () {
					scope.$parent.setDatepickerIndex(scope.datepickerIndex);
					scope.$parent.setDatepickerClear(false);
					element.siblings('.datepicker-input').focus();
				});
			});
			$('body').on('mousedown', '.ui-datepicker-close', function () {
				scope.$apply(function () {
					scope.$parent.setDatepickerClear(true);
				});
			});
		}
	}
}