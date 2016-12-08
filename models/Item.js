const thinky = require('../thinky')
const type = thinky.type

const Item = thinky.createModel('items', {
  _deleting: type.boolean(),
  _detailsToggled: type.boolean(),
  _dueDateDifference: type.number(),
  complete: type.boolean(),
  completedBy: type.string(),
  createdBy: type.string(),
  current: type.boolean(),
  dateCompleted: type.string(),
  dateCreated: type.date().default(new Date().toISOString()),
  dueDate: type.string(),
  id: type.string(),
  index: type.number(),
  item: type.string(),
  notes:w type.string()
})

Item.ensureIndex('listId')

module.exports = Item

const List = require('./List')
Item.belongsTo(List, 'list', 'listId', 'id')
