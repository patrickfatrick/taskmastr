import _ from 'lodash'
import socket from '../../socket.js'
import { getSession, login, create, reset, forgot, logout, updateUser } from '../../services/user-services'

export function setInit ({ commit }, bool) {
  commit('SET_INIT', bool)
}

export function setAuth ({ commit }, bool) {
  commit('SET_AUTH', bool)
}

export function setUsername ({ commit }, str) {
  commit('SET_USERNAME', str)
}

export function setKey ({ commit }, str) {
  commit('SET_KEY', str)
}

export function setConfirm ({ commit }, str) {
  commit('SET_CONFIRM', str)
}

export function setTasks ({ commit }, arr) {
  commit('SET_TASKS', arr)
}

export function setForgot ({ commit }, bool) {
  commit('SET_FORGOT', bool)
}

export function setRememberMe ({ commit }, bool) {
  commit('SET_REMEMBER_ME', bool)
}

export function setCreate ({ commit }, bool) {
  commit('SET_CREATE', bool)
}

export function setInvalidKey ({ commit }, msg) {
  commit('SET_INVALID_KEY', msg)
}

export function setLoginAttempt ({ commit }, bool) {
  commit('SET_LOGIN_ATTEMPT', bool)
}

export function setCreateFail ({ commit }, msg) {
  commit('SET_CREATE_FAIL', msg)
}

export function setForgotAttempt ({ commit }, bool) {
  commit('SET_FORGOT_ATTEMPT', bool)
}

export function setForgotEmail ({ commit }, bool) {
  commit('SET_FORGOT_EMAIL', bool)
}

export function setForgotFail ({ commit }, bool) {
  commit('SET_FORGOT_FAIL', bool)
}

export function setConfirmAttempt ({ commit }, bool) {
  commit('SET_CONFIRM_ATTEMPT', bool)
}

export function setReset ({ commit }, bool) {
  commit('SET_RESET', bool)
}

export function setResetAttempt ({ commit }, bool) {
  commit('SET_RESET_ATTEMPT', bool)
}

export function setResetFail ({ commit }, msg) {
  commit('SET_RESET_FAIL', msg)
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

export function setDisconnect ({ commit }, bool) {
  commit('SET_DISCONNECT', bool)
}

export function setDarkmode ({ commit, state }, bool) {
  commit('SET_DARKMODE', bool)
  return updateUser(state.user.username, { darkmode: bool }, (err, res) => {
    if (err) commit('SET_DARKMODE', !bool)
    return res
  })
}

export function getUserSession ({ commit }) {
  return getSession((err, response) => {
    if (err) return commit('SET_INIT', true)
    /**
     * Failsafes for IDs, set delete if it doesn't exist.
     */
    let tasks = (response.tasks) ? response.tasks : response.todos
    commit('SET_USERNAME', response.username)
    commit('SET_KEY', '')
    commit('SET_DARKMODE', response.darkmode)
    commit('SET_TASKS', tasks)
    commit('SET_CURRENT_LIST', _.find(tasks, { current: true }) || tasks[0])
    commit('SET_AUTH', response.username)
    socket.emit('join', response.username)
    return response.username
  })
}

export function loginUser ({ commit }, { username, key, rememberMe }) {
  return login(username, key, rememberMe, (err, response) => {
    if (err) {
      if (response.status === 204) return commit('SET_CREATE', true)
      if (response.status === 401) return commit('SET_INVALID_KEY', err)
    }
    let tasks = response.tasks || response.todos
    commit('SET_USERNAME', response.username)
    commit('SET_KEY', '')
    commit('SET_DARKMODE', response.darkmode)
    commit('SET_TASKS', tasks)
    commit('SET_CURRENT_LIST', _.find(tasks, { current: true }) || tasks[0])
    commit('SET_AUTH', response.username)
    socket.emit('join', response.username)
    return response.username
  })
}

export function createUser ({ commit }, { username, key, rememberMe }) {
  return create(username, key, rememberMe, (err, response) => {
    if (err) {
      if (response.status === 400) {
        commit('SET_CREATE_FAIL', err)
        commit('SET_CONFIRM_ATTEMPT', true)
        return
      }
    }
    commit('SET_USERNAME', response.username)
    commit('SET_KEY', '')
    commit('SET_CONFIRM', '')
    commit('SET_DARKMODE', response.darkmode)
    commit('SET_AUTH', response.username)
    socket.emit('join', response.username)
    return response.username
  })
}

export function forgotPassword ({ commit }, username) {
  forgot(username, (err, response) => {
    if (err) return commit('SET_FORGOT_FAIL', err)
    if (response.emailSent) return commit('SET_FORGOT_EMAIL', true)
  })
}

export function resetPassword ({ commit }, token, key) {
  return reset(token, key, (err, response) => {
    if (err) return commit('SET_RESET_FAIL', err)
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
