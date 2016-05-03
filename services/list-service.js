'use strict'

const _ = require('lodash')
const r = require('../thinky').r
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
  return List.save(list)
  .then((result) => ({ success: true }))
  .catch((err) => {
    throw new Error(err)
  })
}

exports.deleteList = function (id) {
  return List.get(id)
  .then((list) => list.delete())
  .then((result) => result)
  .catch((err) => {
    throw new Error(err)
  })
}

exports.updateList = function (id, body) {
  // body.dateModified = new Date().toISOString()
  return List.get(id)
  .update(body).run()
  .then((result) => result)
  .catch((err) => {
    throw new Error(err)
  })
}

exports.updateListAt = function (id, user) {
  return List.get(id).update({
    dateModified: new Date().toISOString(),
    users: r.row('users').changeAt(_.findIndex(r.row('users'), { username: user.username }), user)
  }).run()
  .then((result) => result)
  .catch((err) => {
    throw new Error(err)
  })
}
