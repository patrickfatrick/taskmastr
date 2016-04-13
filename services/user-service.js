'use strict'

const bcrypt = require('bcrypt')
const hat = require('hat')
const r = require('../r')

exports.addUser = function (user) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.key, 10, (err, hash) => {
      if (err) reject(err)
      var newUser = {
        username: user.username.toLowerCase(),
        key: hash,
        darkmode: user.darkmode
      }
      r.table('users').insert(newUser, { returnChanges: true })
      .then((result) => resolve(result.changes[0]['new_val']))
      .catch((err) => reject(err))
    })
  })
}

exports.findUser = function (username) {
  return r.table('users').getAll(username.toLowerCase(), { index: 'username' })
  .then((result) => {
    if (!result.length) return null
    return result[0]
  })
  .catch((err) => err)
}

exports.updateUser = function (username, body) {
  return r.table('users').getAll(username.toLowerCase(), { index: 'username' })
  .update(body, { returnChanges: true })
  .then((result) => result)
  .catch((err) => err)
}

exports.setToken = function (user) {
  return r.table('users').getAll(user.username.toLowerCase(), { index: 'username' })
  .update({
    resetToken: hat(),
    resetDate: Date.now() + 1000 * 60 * 60
  }, {
    returnChanges: true
  })
  .then((result) => result.changes[0]['new_val'])
  .catch((err) => err)
}

exports.resetPassword = function (user) {
  return new Promise((resolve, reject) => {
    if (Date.now() > user.resetDate) reject()
    bcrypt.hash(user.newKey, 10, (err, hash) => {
      if (err) reject(err)
      r.table('users').filter(r.row('resetToken').eq(user.token))
      .update({
        key: hash,
        resetToken: null
      }, {
        returnChanges: true
      })
      .then((result) => {
        if (!result.changes) resolve(null)
        resolve(result.changes[0]['new_val'])
      })
      .catch((err) => reject(err))
    })
  })
}
