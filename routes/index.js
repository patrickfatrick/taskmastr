var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var vm = {
		title: 'taskmastr',
		error: req.flash('error'),
		env: process.env.NODE_ENV
	};
	res.render('index', vm);
});

router.get('/session-data', function(req, res) {
	if (!req.user) return res.sendStatus(204);
	console.log('Sending user ' + req.user.username + '... OK');
	return res.send({
		username: req.user.username,
		darkmode: req.user.darkmode,
		tasks: (req.user.tasks.length) ? req.user.tasks : req.user.todos
	});
});

module.exports = router;
