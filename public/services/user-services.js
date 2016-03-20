import 'isomorphic-fetch'

export function login (username, key, rememberMe, cb) {
  return window.fetch('/users/login', {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      key: key,
      rememberMe: rememberMe
    })
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
    if (err.response.status === 204) return cb('No user found. Please confirm your password.', err.response)
    if (err.response.status === 401) return cb('Invalid password.', err.response)
    cb(err, err.response)
  })
}

export function create (username, key, rememberMe, cb) {
  return window.fetch('/users/create', {
    method: 'put',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      key: key,
      rememberMe: rememberMe,
      darkmode: true
    })
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
    if (err.response.status === 400) return cb('User already exists', err.response)
    cb(err, err.response)
  })
}

export function forgot (username, cb) {
  return window.fetch('/users/forgot', {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
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
    if (err.response.status === 401) return cb('That username doesn\'t exist.', err.response)
    cb(err, err.response)
  })
}

export function reset (token, newKey, cb) {
  return window.fetch('/users/reset', {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: token,
      newKey: newKey
    })
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
    if (err.response.status === 401) return cb('This reset link is no longer or never was valid. Please close this window and try again.', err.response)
    cb(err, err.response)
  })
}

export function logout (cb) {
  return window.fetch('/users/logout', {
    method: 'get',
    credentials: 'same-origin'
  })
  .then((response) => {
    cb(response)
  })
}

export function getSession (cb) {
  return window.fetch('/sessions/get', {
    method: 'get',
    credentials: 'same-origin'
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
    if (err.response.status === 204) return cb('No session data found.', err.response)
    cb(err, err.response)
  })
}

export function save (user, deleteAgendas, cb) {
  return window.fetch('/users/write', {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: user,
      deleteAgendas: deleteAgendas
    })
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
