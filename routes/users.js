var express = require('express');
var router = express.Router();
var passport = require('passport');
var hat = require('hat');
var config = require('../config');
var agenda = require('../services/agenda');
var emailService = require('../services/email-service');
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
		//console.log(req.body);
		var username = req.body.username;
		var key = req.body.key;
		var rememberMe = req.body.rememberMe;
		userService.addUser({
			username: username,
			key: key,
			rememberMe: rememberMe
		}, function (err, user) {
			if (err) console.log(err);
			console.log(username + ' not found.');
			console.log('Creating user ' + username + ' ... OK');
			req.login(user, function (err) {
				if (err) return next(err);
				agenda.define('greet ' + user.username, function (job, done) {
					var data = job.attrs.data;
					emailService.greetEmail(data.username, data.host, function (err, next) {
						if (err) return next(err);
						return res.send(user);
					});
				});
				agenda.now('greet ' + user.username, {
					username: user.username,
					host: req.headers.host
				});
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
				console.log('No user: ' + username);
				return next(null, null);
			}
			userService.setToken(user, function (err, user) {
				if (err) return next(err);
				//console.log(user);
				agenda.define('reset ' + user.username, function (job, done) {
					var data = job.attrs.data;
					emailService.resetEmail(data.username, data.resetToken, data.host, function (err, next) {
						if (err) return next(err);
						res.send({
							emailSent: true
						});
						done();
					});
				});
				agenda.now('reset ' + user.username, {
					username: user.username,
					resetToken: user.resetToken,
					host: req.headers.host
				});
			});
		});
	}
);

router.post('/reset',
	function (req, res, next) {
		var token = req.body.token;
		var newKey = req.body.newKey;
		console.log('Reset token: ' + token);
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
	var deleteAgendas = req.body.deleteAgendas;
	//console.log(user);
	//Workaround to cancel agendas for deleted todos
	deleteAgendas.forEach(function (val, i) {
		agenda.cancel({
			name: val
		}, function (err, numRemoved) {
			if (err) return next(err);
			console.log(user.username + ' => Agenda removed: ' + val);
		})
	});
	//Cancel current agendas and make new ones
	user.todos.forEach(function (val, i) {
		val.items.forEach(function (itemVal, j) {
			//console.log(itemVal);
			agenda.cancel({
				name: itemVal.agendaID
			}, function (err, numRemoved) {
				if (err) return next(err);
				console.log(user.username + ' => Agenda removed: ' + itemVal.agendaID);
				if (itemVal.dueDate) {
					var milliseconds = Math.floor(Math.random() * 150000);
					itemVal.dueDate = Date.parse(itemVal.dueDate) + 21600000 + milliseconds;
					if (itemVal.dueDate <= Date.now()) return true;
					//Use the following for testing.
					//itemVal.dueDate = Date.now() + 5000;
					console.log(user.username + ' => Scheduled task => ' + 'Agenda: ' + itemVal.agendaID + ' ' + new Date(itemVal.dueDate));
					agenda.define(itemVal.agendaID, function (job, done) {
						var data = job.attrs.data;
						emailService.notificationEmail(data.username, data.item, data.host, data.date, function (err, next) {
							if (err) return next(err);
							console.log('Notification sent');
							done();
						});
					});
					agenda.schedule(new Date(itemVal.dueDate), itemVal.agendaID, {
						username: user.username,
						item: itemVal.item,
						host: req.headers.host,
						date: new Date(itemVal.dueDate)
					});
				}
			});
		});
	});
	userService.updateUser(user, function (err, user) {
		if (err) return next(err);
		res.sendStatus(200);
		//console.log(user.todos[1].items[0]);
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