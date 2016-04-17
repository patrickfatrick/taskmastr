'use strict'

// const r = require('../r')
const List = require('../models/List')

exports.getList = function (id) {
  return List.get(id).run()
  .then((result) => result)
  .catch((err) => err)
}

exports.addList = function (list) {
  list.dateCreated = new Date().toISOString()
  return List.insert(list).run()
  .then((result) => ({ success: true }))
  .catch((err) => err)
}

exports.deleteList = function (id) {
  return List.get(id).delete({ returnChanges: true }).run()
  .then((result) => result.changes[0])
  .catch((err) => err)
}

exports.updateList = function (id, body) {
  body.dateModified = new Date().toISOString
  return List.get(id).run()
  .update(body, { returnChanges: true })
  .then((result) => result.changes[0]['new_val'])
  .catch((err) => err)
}
