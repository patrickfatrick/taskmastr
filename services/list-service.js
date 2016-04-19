'use strict'

const List = require('../models/List')

exports.getList = function (id) {
  return List.get(id).run()
  .then((result) => result)
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') return null
    throw new Error(err)
  })
}

exports.addList = function (list) {
  list.dateCreated = new Date().toISOString()
  console.log(list)
  return List.save(list)
  .then((result) => ({ success: true }))
  .catch((err) => {
    throw new Error(err)
  })
}

exports.deleteList = function (id) {
  return List.get(id)
  .then((list) => {
    list.delete()
    .then((result) => {
      console.log(result)
      return result
    })
  })
  .catch((err) => {
    throw new Error(err)
  })
}

exports.updateList = function (id, body) {
  body.dateModified = new Date().toISOString()
  return List.get(id)
  .update(body).run()
  .then((result) => ({ success: true }))
  .catch((err) => {
    throw new Error(err)
  })
}
