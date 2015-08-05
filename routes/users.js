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
				emailService.greetEmail(user, req.headers.host, function (err, next) {
					if (err) return next(err);
					return res.send(user);
				})
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
				emailService.resetEmail(user, req.headers.host, function (err, next) {
					if (err) return next(err);
					res.send({
						emailSent: true
					});
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
	var deleteAgendas = req.body.deleteAgendas;
	//console.log(user);
	//Workaround to cancel agendas for deleted todos
	deleteAgendas.forEach(function(val, i) {
		agenda.cancel({
			name: val
		}, function (err, numRemoved) {
			if (err) return next(err);
			console.log('Agenda removed: ' + val);
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
				console.log('Agenda removed: ' + itemVal.agendaID);
			});
			if (itemVal.dueDate) {
				//itemVal.dueDate = Date.parse(itemVal.dueDate) + 21600000;
				//Use the following for testing.
				itemVal.dueDate = Date.now() + 3600000;
				//console.log(itemVal.dueDate);
				agenda.define(itemVal.agendaID, function (job, done) {
					var data = job.attrs.data;
					emailService.notificationEmail(data.username, data.item, data.host, data.date, function (err, next) {
						if (err) return next(err);
						console.log('Notification sent');
						done();
					});
				});
				agenda.schedule(new Date(itemVal.dueDate), itemVal.agendaID, {username: user.username, item: itemVal.item, host: req.headers.host, date: new Date(itemVal.dueDate)});
				//agenda.now(itemVal.agendaID);
			}
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