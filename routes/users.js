var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config');
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