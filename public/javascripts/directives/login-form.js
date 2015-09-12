import angular from 'angular';
import $ from 'jquery';
import jQuery from 'jquery';

export default function loginForm() {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.bind('submit', function (e) {
				scope.$apply(function () {
					var username = scope.user.username;
					var userKey = scope.user.key;
					var confirmKey = scope.user.confirm;
					var rememberMe = scope.rememberMe;
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
					//Set variables for animations and error messages
					scope.$apply(function () {
						scope.formAttempt = true;
						scope.loginAttempt = true;
						if (scope.confirmPassword) {
							scope.confirmAttempt = true;
						}
						setTimeout(function () {
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