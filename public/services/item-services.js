import 'isomorphic-fetch'
import status from './status'

export function createItem (listid, item, username, cb) {
  if (username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  return window.fetch(`/lists/${listid}/items/create`, {
    method: 'put',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item: item, username: username })
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

export function updateItem (listid, itemid, index, item, username, cb) {
  if (username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  return window.fetch(`/lists/${listid}/items/${itemid}/update`, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index: index, item: item, username: username })
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

export function deleteItem (listid, itemid, index, username, cb) {
  if (username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  return window.fetch(`/lists/${listid}/items/${itemid}/delete`, {
    method: 'delete',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index: index })
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
