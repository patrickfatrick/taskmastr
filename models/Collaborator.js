const thinky = require('../thinky')
const type = thinky.type

const Collaborator = thinky.createModel('collaborators', {
  id: type.string(),
  username: type.string(),
  status: type.string()
})

const List = require('./List')
Collaborator.belongsTo(List, 'list', 'listId', 'id')
