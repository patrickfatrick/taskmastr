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
    .then((result) => resolve(true))
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
