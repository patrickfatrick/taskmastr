const mongoose = require('mongoose')
const Schema = mongoose.Schema

const List = mongoose.model('List', new Schema({
  _id: String,
  _deleting: Boolean,
  currentItem: { type: String, ref: 'Item' },
  dateCreated: { type: Date, default: new Date().toISOString() },
  dateModified: { type: Date, default: new Date().toISOString() },
  items: [{ type: String, ref: 'Item' }],
  list: String,
  owner: String,
  users: [{
    username: String,
    status: String
  }]
}))

module.exports = List
