import 'isomorphic-fetch'
import gregorian from 'gregorian'
import status from './status'

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
  .then(status)
  .then((response) => response.json())
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
      darkmode: true,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      tasks: []
    })
  })
  .then(status)
  .then((response) => response.json())
  .then((response) => {
    cb(null, response)
  })
  .catch((err) => {
    if (err.response.status === 400) return cb('User already exists', err.response)
    cb(err, err.response)
  })
}

export function forgot (username, cb) {
  if (username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  return window.fetch(`/users/${username}/forgot`, {
    method: 'post',
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
  .then(status)
  .then((response) => response.json())
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
  return window.fetch('/sessions', {
    method: 'get',
    credentials: 'same-origin'
  })
  .then(status)
  .then((response) => response.json())
  .then((response) => {
    return cb(null, response)
  })
  .catch((err) => {
    if (err.response.status === 204) return cb('No session data found.', err.response)
    return cb(err, err.response)
  })
}

export function updateUser (username, body, cb) {
  if (username === 'mrormrstestperson@taskmastr.co') return cb(null, { success: true })
  return window.fetch(`/users/${username}/update`, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
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
