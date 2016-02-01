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
  .then(response => {
    if (response.status === 204) return {error: 204, msg: 'No user found. Please confirm your password.'}
    if (response.status === 401) return {error: 401, msg: 'Invalid password.'}
    return response.json()
  })
  .then(response => {
    cb(response)
  })
}

export function create (username, key, rememberMe, cb) {
  return window.fetch('/users/create', {
    method: 'post',
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
  .then(response => response.json())
  .then(response => {
    cb(response)
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
  .then(response => {
    if (response.status === 401) return {error: 401, msg: 'That username doesn\'t exist.'}
    return response.json()
  })
  .then(response => {
    cb(response)
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
  .then(response => {
    if (response.status === 401) {
      return {
        error: 401,
        msg: 'This reset link is no longer or never was valid. Please close this window and try again.'
      }
    }
    return response.json()
  })
  .then(response => {
    cb(response)
  })
}

export function logout (cb) {
  return window.fetch('/users/logout', {
    method: 'get',
    credentials: 'same-origin'
  })
  .then(response => {
    cb(response)
  })
}

export function getSession (cb) {
  return window.fetch('/session-data', {
    method: 'get',
    credentials: 'same-origin'
  })
  .then(response => {
    if (response.status === 204) return {error: 204, msg: 'No session data found'}
    return response.json()
  })
  .then(response => {
    cb(response)
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
  .then(response => {
    cb(response)
  })
}
