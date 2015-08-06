var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

exports.greetEmail = function (username, host, next) {
	var options = {
		auth: {
			api_key: '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'
		}
	}
	var mailer = nodemailer.createTransport(sgTransport(options));
	var email = {
		to: username,
		from: 'taskmastr <do-not-reply@taskmastr.co>',
		subject: 'Greetings from taskmastr',
		text: 'Thanks for using taskmastr!\n\n' + 'We really hope you enjoy using it as much as we\'ve enjoyed making it. Here\'s a link to it in case you ever forget.\n\n' + 'http://' + host + '\n\n' + '\n\n' + 'If you ever have any questions please contact Patrick directly at patrick@taskmastr.co or tap him on the shoulder.\n\n' + 'Sincerely,\n\ntaskmastr\n\nP.S. Don\'t forget to check out the tips at the login screen if you haven\'t already.\n'
	};
	mailer.sendMail(email, function (err, info) {
		console.log('Email sent to ' + username);
		next(err, info)
	});
}

exports.resetEmail = function (username, resetToken, host, next) {
	var options = {
		auth: {
			api_key: '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'
		}
	}
	var mailer = nodemailer.createTransport(sgTransport(options));
	var email = {
		to: username,
		from: 'taskmastr <do-not-reply@taskmastr.co>',
		subject: 'taskmastr Password Reset',
		text: 'Hi there,\n\n' + 'You\'ve received this email because you or someone else requested to reset the password for your account.\n\n' + 'Please click on the following link to create a new password:\n\n' + 'http://' + host + '?reset=true&token=' + resetToken + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged. This link becomes invalid once you reset your password, or after one hour; whichever comes first.\n\n' + 'Sincerely,\n\ntaskmastr\n'
	};
	mailer.sendMail(email, function (err, info) {
		console.log('Email sent to ' + username);
		next(err, info)
	});
}

exports.notificationEmail = function (username, item, host, date, next) {
	var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var dateStr = date.getDate();
	switch (date.getDate()) {
		case 1:
		case 21:
		case 31:
			dateStr += 'st';
			break;
		case 2:
		case 22:
			dateStr += 'nd';
			break;
		case 3:
		case 23:
			dateStr += 'rd';
			break;
		default:
			dateStr += 'th';
	};
	var options = {
		auth: {
			api_key: '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'
		}
	}
	var mailer = nodemailer.createTransport(sgTransport(options));
	var email = {
		to: username,
		from: 'taskmastr <do-not-reply@taskmastr.co>',
		subject: 'taskmastr Notification: "' + item + '"',
		text: 'Good morning!\n\n' + 'It is currently the morning of ' + monthArr[date.getMonth()] + ' ' + dateStr + ', and we just wanted to let you know that you have a task due today:\n\n "' + item + '"\n\n' + 'If you\'d like to check out your tasks please click this link! ' + 'http://' + host + '\n\n' + 'Sincerely,\n\ntaskmastr\n'
	};
	mailer.sendMail(email, function (err, info) {
		console.log('Email sent to ' + username);
		next(err, info)
	});
}