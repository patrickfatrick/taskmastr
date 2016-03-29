import 'isomorphic-fetch'

export function createItem (listid, item, username, cb) {
  return window.fetch(`/lists/${listid}/items/create`, {
    method: 'put',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item: item, username: username })
  })
  .then((response) => {
    if (response.status !== 200) {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
    return response.json()
  })
  .then((response) => {
    cb(null, response)
  })
  .catch((err) => {
    cb(err, err.response)
  })
}

export function updateItem (listid, itemid, index, item, username, cb) {
  return window.fetch(`/lists/${listid}/items/${itemid}/update`, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index: index, item: item, username: username })
  })
  .then((response) => {
    if (response.status !== 200) {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
    return response.json()
  })
  .then((response) => {
    cb(null, response)
  })
  .catch((err) => {
    cb(err, err.response)
  })
}

export function deleteItem (listid, itemid, index, cb) {
  return window.fetch(`/lists/${listid}/items/${itemid}/delete`, {
    method: 'delete',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index: index })
  })
  .then((response) => {
    if (response.status !== 200) {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
    return response.json()
  })
  .then((response) => {
    cb(null, response)
  })
  .catch((err) => {
    cb(err, err.response)
  })
}