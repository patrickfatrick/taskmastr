'use strict'

const List = require('../models/List')
const Item = require('../models/Item')

exports.addItemToList = async function (listid, itemid) {
  const list = await List.findOne({ _id: listid })
  if (!list) return null

  list.items.unshift(itemid)
  list.dateModified = new Date().toISOString()

  await list.save()

  // Hacky, but we need to do another lookup to populate the newly made item
  return List.findOne({ _id: listid })
    .populate({ path: 'items' })
    .exec()
}

exports.addItem = async function (item) {
  const result = await new Item(item).save()
  return result
}

exports.deleteItemFromList = async function (listid, index) {
  const list = await List.findOne({ _id: listid })
  console.log(list)
  if (!list) return null

  list.items.splice(index, 1)
  list.dateModified = new Date().toISOString()

  // Hacky, but we need to do another lookup to NOT populate the newly removed item
  await list.save()
  return List.findOne({ _id: listid })
    .populate({ path: 'items' })
    .exec()
}

exports.deleteItemsFromList = async function (listid, itemids) {
  const list = await List.findOne({ _id: listid })
  if (!list) return null

  list.items = list.items.filter((item) => !itemids.includes(item._id))
  list.dateModified = new Date().toISOString()

  // Hacky, but we need to do another lookup to NOT populate the newly removed item
  await list.save()
  return List.findOne({ _id: listid })
    .populate({ path: 'items' })
    .exec()
}

exports.deleteItem = async function (id) {
  const result = await Item.findOneAndRemove({ _id: id })
    .exec()

  return result
}

exports.deleteItems = async function (itemids) {
  return itemids.map((itemid) => {
    return Item.findOneAndRemove({ _id: itemid })
      .exec()
  })
}

exports.updateItem = async function (id, item) {
  item.dateModified = new Date().toISOString()
  const result = Item.findOneAndUpdate({ _id: id }, item, { new: true })
  return result
}
