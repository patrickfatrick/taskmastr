const thinky = require('../thinky')
const type = thinky.type

const List = thinky.createModel('lists', {
  dateCreated: type.date().default(new Date().toISOString()),
  dateModified: type.date(),
  id: type.string(),
  items: [
    {
      _deleting: type.boolean(),
      _detailsToggled: type.boolean(),
      _dueDateDifference: type.number(),
      complete: type.boolean(),
      current: type.boolean(),
      dateCompleted: type.string(),
      dateCreated: type.date().default(new Date().toISOString()),
      dueDate: type.string(),
      id: type.string(),
      item: type.string(),
      notes: type.string()
    }
  ],
  list: type.string(),
  owner: type.string(),
  users: [{
    username: type.string(),
    status: type.string()
  }],
  _deleting: type.boolean()
})

List.ensureIndex('dateCreated')
List.ensureIndex('dateModified')

module.exports = List
