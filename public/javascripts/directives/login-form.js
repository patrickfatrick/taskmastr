import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function loginForm() {
	return {
		restrict: 'A',
		scope: false,
		link: (scope, element, attrs) => {
			element.on('submit', e => {
				scope.$apply(() => {
					const username = scope.user.username;
					const userKey = scope.user.key;
					const confirmKey = scope.user.confirm;
					const rememberMe = scope.rememberMe;
					// Do lookup if confirm password is null
					if (!scope.confirmPassword) {
						scope.lookup(username, userKey, rememberMe);
						//console.log('lookup');
					}
					//Add user if confirm password is not null and passwords match
					if (scope.confirmPassword && !scope.userForm.confirm.$error.pattern) {
						scope.addUser(username, confirmKey, rememberMe);
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
					//Set variables for animations and error messages
					scope.$apply(() => {
						scope.formAttempt = true;
						scope.loginAttempt = true;
						if (scope.confirmPassword) {
							scope.confirmAttempt = true;
						}
						setTimeout(() => {
							scope.confirmAttempt = false;
							scope.loginAttempt = false;
							scope.$apply();
						}, 500);
					});
					if (scope.forgot) {
						scope.setToken(scope.user.username);
						return false;
					}
					if (scope.userForm.$invalid) {
						e.preventDefault();
					}
				}
			});
		}
	}
}