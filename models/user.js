var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {type: String},
	key: {type: String},
  darkmode: {type: Boolean},
  //todos: {type: Array},
	todos: [
		{
			items: [
				{
					item: {type: String},
					complete: {type: Boolean},
					dueDate: {type: Date},
					agendaID: {type: String},
					_id: false
				}
			],
			current: {type: Boolean},
			list: {type: String},
			_id: false
		}
	],
	dateCreated: {type: Date, default: Date.now},
	dateModified: {type: Date, default: Date.now},
	resetToken: {type: String},
	resetDate: {type: Date}
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};
