'use strict'

const r = require('../r')

exports.getList = function (id) {
  return r.table('lists').get(id)
  .then((result) => result)
  .catch((err) => err)
}

exports.addList = function (list) {
  return r.table('lists').insert(list)
  .then((result) => ({ success: true }))
  .catch((err) => err)
}

exports.deleteList = function (id) {
  return r.table('lists').get(id).delete({ returnChanges: true })
  .then((result) => result.changes[0])
  .catch((err) => err)
}

exports.updateList = function (id, body) {
  return r.table('lists').get(id)
  .update(body, { returnChanges: true })
  .then((result) => result.changes[0]['new_val'])
  .catch((err) => err)
}
