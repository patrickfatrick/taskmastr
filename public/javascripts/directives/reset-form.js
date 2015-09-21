import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function resetForm() {
	return {
		restrict: 'A',
		scope: false,
		link: (scope, element, attrs) => {
			element.on('submit', e => {
				scope.$apply($location => {
					const token = scope.resetToken;
					const newKey = scope.user.newKey;
					if (!scope.resetForm.confirmReset.$error.pattern) {
						scope.resetPassword(token, newKey);
					}
				});
			});
			//Emoticon handlers
			$('#user-form .submit').on({
				mousedown: e => {
					$(this).removeClass('fa-arrow-right');
					if (!scope.userForm.$invalid) {
						$(this).addClass('fa-smile-o');
					} else {
						$(this).addClass('fa-meh-o');
					}
				},
				mouseup: e => {
					$(this).removeClass('fa-smile-o').removeClass('fa-meh-o');
					$(this).addClass('fa-arrow-right');
				},
				click: e => {
					scope.$apply(() => {
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