var r = require('../r')

exports.getList = function (id) {
  return new Promise((resolve, reject) => {
    r.table('lists').get(id)
    .then((result) => resolve(result))
    .catch((err) => reject(err))
  })
}

exports.addList = function (list) {
  return new Promise((resolve, reject) => {
    r.table('lists').insert(list)
    .then((result) => resolve({ success: true }))
    .catch((err) => reject(err))
  })
}

exports.deleteList = function (id) {
  return new Promise((resolve, reject) => {
    r.table('lists').get(id).delete({ returnChanges: true })
    .then((result) => resolve(result.changes[0]))
    .catch((err) => reject(err))
  })
}

exports.updateList = function (id, body) {
  return new Promise((resolve, reject) => {
    r.table('lists').get(id)
    .update(body, { returnChanges: true })
    .then((result) => resolve(result.changes[0]['new_val']))
    .catch((err) => reject(err))
  })
}
