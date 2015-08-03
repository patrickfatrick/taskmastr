var bcrypt = require('bcrypt');
var hat = require('hat');
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
	User.findOneAndUpdate({
		username: user.username.toLowerCase()
	}, {
		$set: {
			todos: user.todos,
			darkmode: user.darkmode,
			dateModified: user.dateModified
		}
	}, {
		new: true
	}, function (err, user) {
		next(err, user);
	});
};

exports.setToken = function (user, next) {
	User.findOneAndUpdate({
		username: user.username.toLowerCase()
	}, {
		$set: {
			resetToken: hat(),
			resetDate: Date.now() + 3600000
		}
	}, {
		new: true
	}, function (err, user) {
		next(err, user);
	});
};

exports.resetPassword = function (user, next) {
	bcrypt.hash(user.newKey, 10, function (err, hash) {
		if (err) return next(err);
		User.findOne({
			resetToken: user.token
		}, function (err, user) {
			if (err) return next(err, err);
			if (!user) return next(null, null)
			var username = user.username
			var newKey = hash;
			if (err) return next(err);
			if (Date.now() > user.resetDate) {
				return next(err, null)
			}
			User.update({
				username: username
			}, {
				$set: {
					key: newKey,
					resetToken: null
				}
			}, function (err, user) {
				console.log('User updated');
			});
			next(err, user);
		});
	});
};