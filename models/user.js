var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	key: {type: String},
  darkmode: {type: String},
  todos: {type: Array},
	dateCreated: {type: Date, default: Date.now},
	dateModified: {type: Date, default: Date.now}
});

/*userSchema.path('key').validate(function(value, next) {
  userService.findUser(value, function(err, user) {
    if (err) {
      console.log(err);
      return next(false);
    }
    next(!user);
  });
}, 'That email is already in use');*/

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};