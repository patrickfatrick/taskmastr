var r = require('../r')

exports.addItem = function (listid, item) {
  // return new Promise((resolve, reject) => {
  //   r.table('lists').get(listid).update({
  //     'items': r.row('items').prepend(item)
  //   })
  //   .then((result) => resolve({ success: true }))
  //   .catch((err) => reject(err))
  // })
  return r.table('lists').get(listid).update({
    'items': r.row('items').prepend(item)
  })
  .then((result) => ({ success: true }))
  .catch((err) => err)
}

exports.deleteItem = function (listid, index) {
  // return new Promise((resolve, reject) => {
  //   r.table('lists').get(listid).update({
  //     'items': r.row('items').deleteAt(index)
  //   })
  //   .then((result) => resolve({ success: true }))
  //   .catch((err) => reject(err))
  // })
  return r.table('lists').get(listid).update({
    'items': r.row('items').deleteAt(index)
  })
  .then((result) => ({ success: true }))
  .catch((err) => err)
}

exports.updateItem = function (listid, index, item) {
  // return new Promise((resolve, reject) => {
  //   r.table('lists').get(listid).update({
  //     'items': r.row('items').changeAt(index, item)
  //   })
  //   .then((result) => resolve({ success: true }))
  //   .catch((err) => reject(err))
  // })
  return r.table('lists').get(listid).update({
    'items': r.row('items').changeAt(index, item)
  })
  .then((result) => ({ success: true }))
  .catch((err) => err)
}
