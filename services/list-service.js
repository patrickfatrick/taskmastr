'use strict'

const _ = require('lodash')
const List = require('../models/List')

exports.getList = async function (id) {
  const result = await List.findOne({ _id: id })
    .populate({ path: 'items' })
    .exec()

  return result
}

exports.addList = async function (list) {
  const result = await new List(list).save()
  return result
}

exports.deleteList = async function (id) {
  const result = await List.findOneAndRemove({ _id: id })
    .exec()

  return result
}

exports.updateList = async function (id, body) {
  body.dateModified = new Date().toISOString()
  const result = await List.findOneAndUpdate({ _id: id }, body, { new: true })
    .populate({ path: 'items' })
    .exec()

  return result
}

exports.updateListAt = async function (id, user) {
  const list = await List.findOne({ _id: id })
    .populate({ path: 'items' })
    .exec()

  if (!list) return null

  const userIndex = _.findIndex(list.users, { username: user.username })
  list.users[userIndex] = user

  return list.save()
}
