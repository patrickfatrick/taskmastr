const thinky = require('../thinky')
const type = thinky.type
const List = require('./List')

const User = thinky.createModel('users', {
  darkmode: type.boolean(),
  dateCreated: type.date(),
  dateModified: type.date(),
  id: type.string(),
  key: type.string(),
  resetDate: type.date(),
  resetToken: type.string(),
  tasks: [
    {
      _delete: type.boolean(),
      current: type.boolean(),
      id: type.string(),
      list: type.string()
    }
  ],
  username: type.string()
}, {
  pk: 'username'
})

User.ensureIndex('username')
User.ensureIndex('dateCreated')
User.ensureIndex('dateModified')

module.exports = User
