var express = require('express');
var router = express.Router();
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
		var key = req.body.key;
		//console.log(req.body);
		userService.findUser(key, function (err, user) {
			if (err) {
				return next(err);
			}
			if (!user) {
				userService.addUser({
					key: key
				}, function (err, user) {
					if (err) console.log(err);
					console.log('No user found.');
					console.log('Creating user... OK');
					res.send(user);
				})
			} else {
				console.log('Finding user... OK');
				res.send(user);
			}
		});
	}
);

router.post('/write', function (req, res, next) {
	var user = JSON.parse(req.body.json);
	console.log(user);
	userService.updateUser(user, function (err, user) {
		if (err) return next(err);
		console.log('Saving user... OK');
	});
});

router.get('/logout', function (req, res, next) {
	//req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
