import 'isomorphic-fetch'

export function createList (list, user, cb) {
  return window.fetch('/lists/create', {
    method: 'put',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ list, user })
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

export function getList (id, cb) {
  return window.fetch(`/lists/${id}`, {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
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

export function removeList (id, user, cb) {
  return window.fetch(`/lists/${id}/delete`, {
    method: 'delete',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
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
    console.log(err)
    cb(err, err.response)
  })
}

export function updateList (user, listId, listBody, cb) {
  return window.fetch(`/lists/${listId}/update`, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user, listId, listBody })
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
    console.log(err)
    cb(err, err.response)
  })
}