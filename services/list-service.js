'use strict'

// const r = require('../r')
const List = require('../models/List')

exports.getList = function (id) {
  return List.get(id).run()
  .then((result) => result)
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') return null
    console.log(err)
    throw new Error(err)
  })
}

exports.addList = function (list) {
  list.dateCreated = new Date().toISOString()
  return List.insert(list).run()
  .then(() => ({ success: true }))
  .catch((err) => {
    console.log(err)
    throw new Error(err)
  })
}

exports.deleteList = function (id) {
  return List.get(id).delete({ returnChanges: true }).run()
  .then((result) => result.changes[0])
  .catch((err) => {
    console.log(err)
    throw new Error(err)
  })
}

exports.updateList = function (id, body) {
  body.dateModified = new Date().toISOString()
  return List.get(id)
  .update(body).run()
  .then(() => ({ success: true }))
  .catch((err) => {
    console.log(err)
    throw new Error(err)
  })
}
