import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function resetForm() {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.bind('submit', function (e) {
				scope.$apply(function ($location) {
					var token = scope.resetToken;
					var newKey = scope.user.newKey;
					if (!scope.resetForm.confirmReset.$error.pattern) {
						scope.resetPassword(token, newKey);
					}
				});
			});
			//Emoticon handlers
			$('#user-form .submit').on({
				mousedown: function (e) {
					$(this).removeClass('fa-arrow-right');
					if (!scope.userForm.$invalid) {
						$(this).addClass('fa-smile-o');
					} else {
						$(this).addClass('fa-meh-o');
					}
				},
				mouseup: function (e) {
					$(this).removeClass('fa-smile-o').removeClass('fa-meh-o');
					$(this).addClass('fa-arrow-right');
				},
				click: function (e) {
					scope.$apply(function () {
						scope.formAttempt = true;
					});
					if (scope.resetForm.$invalid) {
						e.preventDefault();
					}
				}
			});
		}
	}
}