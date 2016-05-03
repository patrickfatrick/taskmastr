import 'isomorphic-fetch'
import socket from '../socket'
import status from './status'

export function getList (id, cb) {
  return window.fetch(`/lists/${id}`, {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(status)
  .then((response) => response.json())
  .then((response) => {
    cb(null, response)
  })
  .catch((err) => {
    if (err.response.status === 404) return cb('You\'re not viewing a list. Please click on one in the menu to the left.', err.response)
    cb(err, err.response)
  })
}

export function createList (list, user, cb) {
  if (user.username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  socket.emit('create-list', { list, user }, (err, response) => {
    if (err) return cb(err, err.message)
    cb(null, response)
  })
}

export function removeList (listid, user, cb) {
  if (user.username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  socket.emit('delete-list', { listid, user }, (err, response) => {
    if (err) return cb(err, err.message)
    cb(null, response)
  })
}

export function updateList (user, listid, listBody, cb) {
  if (user.username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  socket.emit('update-list', { user, listid, listBody }, (err, response) => {
    if (err) return cb(err, err.message)
    cb(null, response)
  })
}

export function inviteUser (user, listid, username, users, cb) {
  if (user.username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  socket.emit('invite-user', { listid, username, users }, (err, response) => {
    if (err) return cb(err, err.message)
    cb(null, response)
  })
}

export function removeUser (user, listid, users, cb) {
  if (user.username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  socket.emit('remove-user', { listid, users }, (err, response) => {
    if (err) return cb(err, err.message)
    cb(null, response)
  })
}

export function confirmUser (user, listid, listUser, cb) {
  if (user.username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  socket.emit('confirm-user', { listid, listUser }, (err, response) => {
    if (err) return cb(err, err.message)
    cb(null, response)
  })
}
