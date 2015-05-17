var crypto = require('crypto');
var User = require('../models/user').User;

var salt = 'dRiPPInGniGhTM4RE1~';
var iterations = 4096;
var len = 512;
var hash = 'sha256';

exports.addUser = function (user, next) {
	crypto.pbkdf2(user.key, salt, iterations, len, hash, function (err, hash) {
		if (err) return next(err);
		user.key = hash.toString('hex');
		var newUser = new User({
			key: user.key,
			todos: user.todos,
			darkmode: user.darkmode
		});
		newUser.save(function (err, user) {
			if (err) {
				return next(err);
			}
			next(err, user);
		});
	});
};

exports.findUser = function (key, next) {
	crypto.pbkdf2(key, salt, iterations, len, hash, function (err, hash) {
		User.findOne({
			key: hash.toString('hex')
		}, function (err, user) {
			next(err, user);
		});
	})
};

exports.updateUser = function(user, next) {
	User.update(
		{key: user.key},
		{
			$set: {
				todos: user.todos,
				darkmode: user.darkmode,
				dateModified: user.dateModified
			}
		}, function (err, user) {
		next(err, user);
	});
};