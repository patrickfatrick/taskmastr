const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = mongoose.model('User', new Schema({
  currentList: { type: String, ref: 'List' },
  darkmode: Boolean,
  dateCreated: { type: Date, default: new Date().toISOString() },
  dateModified: { type: Date, default: new Date().toISOString() },
  key: String,
  resetDate: Date,
  resetToken: String,
  tasks: [{ type: String, ref: 'List' }],
  username: { type: String, index: { unique: true } }
}))

module.exports = User
