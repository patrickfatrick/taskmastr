const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = mongoose.model('Item', new Schema({
  _id: String,
  _deleting: Boolean,
  _detailsToggled: Boolean,
  _dueDateDifference: Number,
  complete: Boolean,
  completedBy: String,
  createdBy: String,
  dateCompleted: Date,
  dateCreated: { type: Date, default: new Date().toISOString() },
  dateModified: { type: Date, default: new Date().toISOString() },
  dueDate: Date,
  item: String,
  notes: String
}))

module.exports = Item
