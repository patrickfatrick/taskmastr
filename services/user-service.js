'use strict'

const bcrypt = require('bcrypt')
const hat = require('hat')
const User = require('../models/User')

exports.addUser = function (user) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.key, 10, (err, hash) => {
      if (err) reject(err)
      var newUser = {
        username: user.username.toLowerCase(),
        key: hash,
        darkmode: user.darkmode,
        dateCreated: new Date().toISOString()
      }
      User.insert(newUser, { returnChanges: true }).run()
      .then((result) => resolve(result.changes[0]['new_val']))
      .catch((err) => reject(err))
    })
  })
}

exports.findUser = function (username) {
  return User.get(username.toLowerCase()).run()
  .then((result) => result)
  .catch((err) => err)
}

exports.updateUser = function (username, body) {
  body.dateModified = new Date().toISOString()
  return User.get(username.toLowerCase())
  .update(body, { returnChanges: true }).run()
  .then((result) => result)
  .catch((err) => err)
}

exports.setToken = function (user) {
  return User.get(user.username.toLowerCase())
  .update({
    dateModified: new Date().toISOString(),
    resetToken: hat(),
    resetDate: Date.now() + 1000 * 60 * 60
  }, {
    returnChanges: true
  }).run()
  .then((result) => result.changes[0]['new_val'])
  .catch((err) => err)
}

exports.resetPassword = function (user) {
  return new Promise((resolve, reject) => {
    if (Date.now() > user.resetDate) reject()
    bcrypt.hash(user.newKey, 10, (err, hash) => {
      if (err) reject(err)
      User.filter({ resetToken: user.token })
      .update({
        dateModified: new Date().toISOString(),
        key: hash,
        resetToken: null
      }, {
        returnChanges: true
      }).run()
      .then((result) => {
        if (!result.changes) resolve(null)
        resolve(result.changes[0]['new_val'])
      })
      .catch((err) => reject(err))
    })
  })
}
