var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	key: {type: String},
  darkmode: {type: Boolean},
  todos: {type: Array},
	dateCreated: {type: Date, default: Date.now},
	dateModified: {type: Date, default: Date.now}
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};