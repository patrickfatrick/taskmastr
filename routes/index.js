var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var vm = {
		title: 'taskmastr',
		error: req.flash('error'),
	}
  res.render('index', vm);
});

router.get('/session-data', function(req, res, next) {
  res.send(req.user);
});

module.exports = router;
