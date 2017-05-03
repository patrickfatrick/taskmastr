import _ from 'lodash'
import socket from '../../socket.js'
import { getSession, login, create, reset, forgot, logout, updateUser } from '../../services/user-services'

export function setUsername ({ commit }, str) {
  commit('SET_USERNAME', str)
}

export function setKey ({ commit }, str) {
  commit('SET_KEY', str)
}

export function setConfirmKey ({ commit }, str) {
  commit('SET_CONFIRM_KEY', str)
}

export function setTasks ({ commit }, arr) {
  commit('SET_TASKS', arr)
}

export function setResetKey ({ commit }, str) {
  commit('SET_RESET_KEY', str)
}

export function setResetConfirmKey ({ commit }, str) {
  commit('SET_RESET_CONFIRM_KEY', str)
}

export function setResetToken ({ commit }, str) {
  commit('SET_RESET_TOKEN', str)
}

export function setDarkmode ({ commit, state }, bool) {
  commit('SET_DARKMODE', bool)
  window.localStorage.setItem('darkmode', bool)
  return updateUser(state.user.username, { darkmode: bool }, (err, res) => {
    if (err) commit('SET_DARKMODE', !bool)
    return res
  })
}

export function getUserSession ({ commit }) {
  return getSession((err, response) => {
    if (err) return commit('SET_INITIALIZED', true)
    let tasks = response.tasks
    commit('SET_INITIALIZED', true)
    commit('SET_USERNAME', response.username)
    commit('SET_KEY', '')
    commit('SET_DARKMODE', response.darkmode)
    window.localStorage.setItem('darkmode', response.darkmode)
    commit('SET_TASKS', tasks)
    commit('SET_CURRENT_LIST', _.find(tasks, { _id: response.currentList }) || tasks[0])
    commit('SET_AUTHENTICATED', true)
    socket.emit('join', response.username)
    return response.username
  })
}

export function loginUser ({ commit }, { username, key, rememberMe }) {
  return login(username, key, rememberMe, (err, response) => {
    if (err) {
      if (response.status === 204) return commit('SET_CREATE', true)
      if (response.status === 401) return commit('SET_INVALID_KEY', err.message)
    }
    let tasks = response.tasks
    commit('SET_USERNAME', response.username)
    commit('SET_KEY', '')
    commit('SET_DARKMODE', response.darkmode)
    window.localStorage.setItem('darkmode', response.darkmode)
    commit('SET_TASKS', tasks)
    commit('SET_CURRENT_LIST', _.find(tasks, { _id: response.currentList }) || tasks[0])
    commit('SET_AUTHENTICATED', true)
    socket.emit('join', response.username)
    return response.username
  })
}

export function createUser ({ commit }, { username, key, rememberMe }) {
  return create(username, key, rememberMe, (err, response) => {
    if (err) {
      if (response.status === 400) {
        commit('SET_CREATE_FAIL', err.message)
        commit('SET_CONFIRM_ATTEMPT', true)
        return
      }
    }
    commit('SET_USERNAME', response.username)
    commit('SET_KEY', '')
    commit('SET_CONFIRM_KEY', '')
    commit('SET_DARKMODE', response.darkmode)
    commit('SET_AUTHENTICATED', true)
    socket.emit('join', response.username)
    return response.username
  })
}

export function forgotPassword ({ commit }, username) {
  forgot(username, (err, response) => {
    if (err) return commit('SET_FORGOT_FAIL', err.message)
    if (response.emailSent) return commit('SET_FORGOT_EMAIL', true)
  })
}

export function resetPassword ({ commit }, { token, key }) {
  return reset(token, key, (err, response) => {
    if (err) return commit('SET_RESET_FAIL', err.message)
    commit('SET_USERNAME', response.username)
    socket.emit('join', response.username)
    return response.username
  })
}

export function logoutUser () {
  return logout(() => {
    window.location.assign('/')
  })
}
