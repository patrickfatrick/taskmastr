module.exports = function(req, res, next) {
	if(!req.isAuthenticated()) {
		console.log(req);
		res.sendStatus(401);
	} else {
		console.log(req.user);
		next();
	}
}