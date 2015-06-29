var bcrypt = require('bcrypt');
var User = require('../models/user').User;

exports.addUser = function (user, next) {
	bcrypt.hash(user.key, 10, function (err, hash) {
		if (err) return next(err);
		user.key = hash;
		var newUser = new User({
			username: user.username.toLowerCase(),
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

exports.findUser = function (username, next) {
	User.findOne({
		username: username.toLowerCase()
	}, function (err, user) {
		next(err, user);
	});
};

exports.updateUser = function (user, next) {
	User.update({
		username: user.username.toLowerCase()
	}, {
		$set: {
			todos: user.todos,
			darkmode: user.darkmode,
			dateModified: user.dateModified
		}
	}, function (err, user) {
		next(err, user);
	});
};