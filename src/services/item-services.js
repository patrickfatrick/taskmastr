import 'isomorphic-fetch'
import socket from '../socket'

export function createItem (listid, item, username, cb) {
  if (username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  socket.emit('create-item', { listid, item, username }, (err, response) => {
    if (err) return cb(err, err.message)
    cb(null, response)
  })
}

export function updateItem (listid, item, username, cb) {
  if (username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  socket.emit('update-item', { listid, item }, (err, response) => {
    if (err) return cb(err, err.message)
    cb(null, response)
  })
}

export function deleteItem (listid, itemid, index, username, cb) {
  if (username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  socket.emit('delete-item', { index, listid, itemid }, (err, response) => {
    if (err) return cb(err, err.message)
    cb(null, response)
  })
}
