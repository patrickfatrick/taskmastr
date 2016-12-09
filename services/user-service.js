'use strict'

const bcrypt = require('bcrypt')
const harsh = require('harsh')
const r = require('../thinky').r
const User = require('../models/User')

exports.addUser = function (user) {
  bcrypt.hash(user.key, 10)
  .then((hash) => {
    return {
      username: user.username.toLowerCase(),
      key: hash,
      darkmode: user.darkmode,
      dateCreated: new Date().toISOString()
    }
  })
  .then((newUser) => User.insert(newUser, { returnChanges: true }).run())
  .then((result) => result.changes[0]['new_val'])
  .catch((err) => {
    throw new Error(err)
  })
}

exports.findUser = function (username) {
  return User.get(username.toLowerCase()).run()
  .then((result) => {
    return r.table('users').get(username.toLowerCase()).merge({
      tasks: r.row('tasks').eqJoin('id', r.table('lists'), { ordered: true })
        .pluck({ left: true, right: ['_deleting', 'dateCreated', 'dateModified', 'list', 'owner', 'users'] })
        .zip()
    }).run()
  })
  .then((result) => result)
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') return null
    throw new Error(err)
  })
}

exports.updateUser = function (username, body) {
  body.dateModified = new Date().toISOString()
  return User.get(username.toLowerCase()).update(body).run()
  .then((result) => {
    return r.table('users').get(username.toLowerCase()).merge({
      tasks: r.row('tasks').eqJoin('id', r.table('lists'), { ordered: true })
        .pluck({ left: true, right: ['_deleting', 'dateCreated', 'dateModified', 'list', 'owner', 'users'] })
        .zip()
    }).run()
  })
  .then((result) => result)
  .catch((err) => {
    throw new Error(err)
  })
}

exports.setToken = function (user) {
  return User.get(user.username.toLowerCase())
  .update({
    dateModified: new Date().toISOString(),
    resetToken: harsh.hash().hashes[0],
    resetDate: Date.now() + 1000 * 60 * 60
  }).run()
  .then((result) => result)
  .catch((err) => {
    throw new Error(err)
  })
}

exports.resetPassword = function (user) {
  if (Date.now() > user.resetDate) throw new Error('Expired token')
  return bcrypt.hash(user.newKey, 10)
  .then((hash) => {
    return User.filter({ resetToken: user.token })
    .update({
      dateModified: new Date().toISOString(),
      key: hash,
      resetToken: null
    }).run()
  })
  .then((result) => {
    if (!result[0]) return null
    return result[0]
  })
  .catch((err) => {
    throw new Error(err)
  })
}
