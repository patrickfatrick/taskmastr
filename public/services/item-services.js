import 'isomorphic-fetch'

export function createItem (listid, item, cb) {
  return window.fetch(`/lists/${listid}/items/create`, {
    method: 'put',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
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
