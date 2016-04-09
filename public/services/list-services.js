import 'isomorphic-fetch'
import status from './status'

export function createList (list, user, cb) {
  if (user.username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  return window.fetch('/lists/create', {
    method: 'put',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ list, user })
  })
  .then(status)
  .then((response) => response.json())
  .then((response) => {
    cb(null, response)
  })
  .catch((err) => {
    cb(err, err.response)
  })
}

export function getList (id, cb) {
  return window.fetch(`/lists/${id}`, {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
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

export function removeList (id, user, cb) {
  if (user.username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  return window.fetch(`/lists/${id}/delete`, {
    method: 'delete',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  })
  .then(status)
  .then((response) => response.json())
  .then((response) => {
    cb(null, response)
  })
  .catch((err) => {
    cb(err, err.response)
  })
}

export function updateList (user, listId, listBody, cb) {
  if (user.username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  return window.fetch(`/lists/${listId}/update`, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user, listId, listBody })
  })
  .then(status)
  .then((response) => response.json())
  .then((response) => {
    cb(null, response)
  })
  .catch((err) => {
    cb(err, err.response)
  })
}
