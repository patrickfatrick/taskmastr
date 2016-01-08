var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {type: String},
	key: {type: String},
	darkmode: {type: Boolean},
	tasks: [
		{
			items: [
				{
					item: {type: String},
					complete: {type: Boolean},
					dueDate: {type: Date},
					id: {type: String},
					current: {type: Boolean},
					_id: false
				}
			],
			current: {type: Boolean},
			list: {type: String},
			id: {type: String},
			_id: false
		}
	],
	todos: [], // legacy, removed on write
	dateCreated: {type: Date, default: Date.now},
	dateModified: {type: Date, default: Date.now},
	resetToken: {type: String},
	resetDate: {type: Date}
});

var User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};
