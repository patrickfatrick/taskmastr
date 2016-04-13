'use strict'

const r = require('../r')

exports.addItem = function (listid, item) {
  return r.table('lists').get(listid).update({
    'items': r.row('items').prepend(item)
  })
  .then((result) => ({ success: true }))
  .catch((err) => err)
}

exports.deleteItem = function (listid, index) {
  return r.table('lists').get(listid).update({
    'items': r.row('items').deleteAt(index)
  })
  .then((result) => ({ success: true }))
  .catch((err) => err)
}

exports.updateItem = function (listid, index, item) {
  return r.table('lists').get(listid).update({
    'items': r.row('items').changeAt(index, item)
  })
  .then((result) => ({ success: true }))
  .catch((err) => err)
}
