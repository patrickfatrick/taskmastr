const thinky = require('../thinky')
const type = thinky.type

const User = thinky.createModel('users', {
  darkmode: type.boolean(),
  dateCreated: type.date(),
  dateModified: type.date(),
  id: type.string(),
  key: type.string(),
  resetDate: type.date(),
  resetToken: type.string(),
  tasks: [ type.object().schema({
    id: type.string(),
    current: type.boolean()
  }).removeExtra() ],
  username: type.string()
}, {
  pk: 'username'
})

User.ensureIndex('username')
User.ensureIndex('dateCreated')
User.ensureIndex('dateModified')

module.exports = User
