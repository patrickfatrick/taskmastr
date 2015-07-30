var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

exports.greetEmail = function (user, host, next) {
	var options = {
		auth: {
			api_key: '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'
		}
	}
	var mailer = nodemailer.createTransport(sgTransport(options));
	var email = {
		to: user.username,
		from: 'taskmastr <do-not-reply@taskmastr.co>',
		subject: 'Greetings from taskmastr',
		text: 'Thanks for using taskmastr!\n\n' + 'We really hope you enjoy using it as much as we enjoyed making it. Here\'s a link to it in case you ever forget.\n\n' + 'http://' + host + '\n\n' + '\n\n' + 'If you ever have any questions please contact Patrick directly at patrick@taskmastr.co or find him on Twitter @patrickfatrick.\n\n' + 'Sincerely,\n\ntaskmastr\n\nP.S. Don\'t forget to check out the tips at the login screen.\n'
	};
	mailer.sendMail(email, function (err, info) {
		console.log('Email sent to ' + user.username);
		next(err, info)
	});
}

exports.resetEmail = function (user, host, next) {
	var options = {
		auth: {
			api_key: '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'
		}
	}
	var mailer = nodemailer.createTransport(sgTransport(options));
	var email = {
		to: user.username,
		from: 'taskmastr <do-not-reply@taskmastr.co>',
		subject: 'taskmastr Password Reset',
		text: 'Hi there,\n\n' + 'You\'ve received this email because you or someone else requested to reset the password for your account.\n\n' + 'Please click on the following link to create a new password:\n\n' + 'http://' + host + '?reset=true&token=' + user.resetToken + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged. This link becomes invalid once you reset your password, or after one hour; whichever comes first.\n\n' + 'Sincerely,\n\ntaskmastr\n'
	};
	mailer.sendMail(email, function (err, info) {
		console.log('Email sent to ' + user.username);
		next(err, info)
	});
}