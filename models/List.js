const thinky = require('../thinky')
const type = thinky.type

const List = thinky.createModel('lists', {
  _delete: type.boolean(),
  current: type.boolean(),
  dateCreated: type.date(),
  dateModified: type.date(),
  id: type.string(),
  items: [
    {
      _delete: type.boolean(),
      _detailsToggled: type.boolean(),
      _dueDateDifference: type.number(),
      complete: type.boolean(),
      current: type.boolean(),
      dateCompleted: type.string(),
      dateCreated: type.date(),
      dueDate: type.string(),
      id: type.string(),
      item: type.string(),
      notes: type.string()
    }
  ],
  list: type.string(),
  owner: type.string(),
  users: [type.string()]
})

List.ensureIndex('dateCreated')
List.ensureIndex('dateModified')

module.exports = List
