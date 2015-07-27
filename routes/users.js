var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var userService = require('../services/user-service');

router.post('/login',
	function (req, res, next) {
		if (req.body.rememberMe) {
			req.session.cookie.maxAge = config.cookieMaxAge;
		}
		next();
	},
	function (req, res, next) {
		//console.log(req.body);
		return passport.authenticate('local', {
				failureFlash: true
			},
			function (err, user, info) {
				console.log('Sending user... OK');
				//console.log(user);
				//console.log(info);
				//console.log(err);
				if (!user) return res.send(user);
				if (user === 401) return res.sendStatus(401);
				req.login(user, function (err) {
					if (err) return next(err);
					return res.send(user);
				});
			}
		)(req, res, next);
	}
);

router.post('/create',
	function (req, res, next) {
		if (req.body.rememberMe) {
			req.session.cookie.maxAge = config.cookieMaxAge;
		}
		next();
	},
	function (req, res, next) {
		console.log(req.body);
		var username = req.body.username;
		var key = req.body.key;
		var rememberMe = req.body.rememberMe;
		userService.addUser({
			username: username,
			key: key,
			rememberMe: rememberMe
		}, function (err, user) {
			if (err) console.log(err);
			console.log('No user found.');
			console.log('Creating user... OK');
			req.login(user, function (err) {
				if (err) return next(err);
				return res.send(user);
			});
		});
	}
);

router.post('/forgot', 
	function (req, res, next) {
		var username = req.body.username;
		userService.findUser(username, function (err, user) {
			if (err) return next(err);
			if (!user) {
				console.log('No user');
				return next(null, null);
			}
			userService.setToken(user, function (err, user) {
				if (err) return next(err);
				//console.log(user);
				var options = {
					auth: {
						api_key: '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'
					}
				}
				var mailer = nodemailer.createTransport(sgTransport(options));
				var email = {
					to: user.username,
					from: 'taskmastr <do-not-reply@taskmastr.co>',
					subject: 'Taskmastr Password Reset',
					text: 'Hi there,\n\n' + 'You\'ve received this email because you or someone else requested to reset the password for your account.\n\n' + 'Please click on the following link to create a new password:\n\n' + 'http://' + req.headers.host + '?reset=true&token=' + user.resetToken + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged. This link becomes invalid once you reset your password, or after one hour; whichever comes first.\n\n' + 'Sincerely,\n\ntaskmastr\n'
				};
				mailer.sendMail(email, function(err, info) {
					//req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
					console.log('Email sent to ' + user.username);
					res.send({emailSent: true});
				});
			});
		});
	}
);

router.post('/reset',
	function (req, res, next) {
		var token = req.body.token;
		var newKey = req.body.newKey;
		console.log('Token: ' + token);
		console.log('New Key: ' + newKey);
		userService.resetPassword({
			token: token,
			newKey: newKey
		}, function (err, user) {
			if (err) return next(err);
			//console.log(user);
			if (!user) res.status(401);
			res.send(user);
		});
	}
);

router.post('/write', function (req, res, next) {
	var user = req.body.user;
	console.log(user);
	userService.updateUser(user, function (err, user) {
		if (err) return next(err);
		console.log('Saving user... OK');
	});
});

router.get('/logout', function (req, res) {
	req.logout();
	res.clearCookie('name', 'connect.sid');
	req.session.destroy(function (err) {
		res.sendStatus(200);
	});
});

module.exports = router;