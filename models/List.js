const thinky = require('../thinky')
const type = thinky.type

const List = thinky.createModel('lists', {
  current: type.boolean().default(false),
  dateCreated: type.date().default(new Date().toISOString()),
  dateModified: type.date(),
  id: type.string(),
  items: [
    {
      _deleting: type.boolean().default(false),
      _detailsToggled: type.boolean(),
      _dueDateDifference: type.number(),
      complete: type.boolean().default(false),
      current: type.boolean().default(false),
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
  users: [type.string()],
  _deleting: type.boolean().default(false) // TODO: Why is this throwing an error when `boolean`
})

List.ensureIndex('dateCreated')
List.ensureIndex('dateModified')

module.exports = List
