'use strict'

const bcrypt = require('bcrypt')
const hashish = require('harsh').hashish
const User = require('../models/User')

exports.addUser = async function (user) {
  const hash = await bcrypt.hash(user.key, 10)
  const result = await new User({
    username: user.username.toLowerCase(),
    key: hash,
    darkmode: user.darkmode,
    dateCreated: new Date().toISOString()
  }).save()

  return result
}

exports.findUser = async function (username, fields = 'username') {
  const result = await User.findOne({ username: username.toLowerCase() })
  .select('username key token currentList darkmode tasks')
  .populate({
    path: 'tasks',
    select: '_deleting dateCreated dateModified list owner users'
  })
  .exec()

  return result
}

exports.updateUser = async function (username, body) {
  body.dateModified = new Date().toISOString()
  const result = await User.findOneAndUpdate(
    {
      username: username.toLowerCase()
    },
    body,
    {
      new: true
    }
  )
  .populate({
    path: 'tasks',
    select: '_deleting dateCreated dateModified list owner users'
  })
  .exec()

  return result
}

exports.setToken = async function (username) {
  const result = await User.findOneAndUpdate(
    { username: username.toLowerCase() },
    {
      dateModified: new Date().toISOString(),
      resetToken: hashish(),
      resetDate: Date.now() + 1060 * 60
    },
    {
      new: true
    }
  )
  .exec()

  return result
}

exports.resetPassword = async function (user) {
  if (Date.now() > user.resetDate) throw new Error('Expired token')

  const hash = await bcrypt.hash(user.newKey, 10)
  const result = User.findOneAndUpdate(
    {
      resetToken: user.token
    },
    {
      dateModified: new Date().toISOString(),
      key: hash,
      resetToken: null
    }, 
    {
      new: true
    }
  )
  .exec()

  return result
}
