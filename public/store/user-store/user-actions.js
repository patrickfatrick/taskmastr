import _ from 'lodash'
import socket from '../../socket.js'
import { getSession, login, create, reset, forgot, logout, updateUser } from '../../services/user-services'

export function setInit ({ dispatch }, bool) {
  dispatch('SET_INIT', bool)
}

export function setAuth ({ dispatch }, bool) {
  dispatch('SET_AUTH', bool)
}

export function setUsername ({ dispatch }, str) {
  dispatch('SET_USERNAME', str)
}

export function setKey ({ dispatch }, str) {
  dispatch('SET_KEY', str)
}

export function setConfirm ({ dispatch }, str) {
  dispatch('SET_CONFIRM', str)
}

export function setTasks ({ dispatch }, arr) {
  dispatch('SET_TASKS', arr)
}

export function setForgot ({ dispatch }, bool) {
  dispatch('SET_FORGOT', bool)
}

export function setRememberMe ({ dispatch }, bool) {
  dispatch('SET_REMEMBER_ME', bool)
}

export function setCreate ({ dispatch }, bool) {
  dispatch('SET_CREATE', bool)
}

export function setInvalidKey ({ dispatch }, msg) {
  dispatch('SET_INVALID_KEY', msg)
}

export function setLoginAttempt ({ dispatch }, bool) {
  dispatch('SET_LOGIN_ATTEMPT', bool)
}

export function setCreateFail ({ dispatch }, msg) {
  dispatch('SET_CREATE_FAIL', msg)
}

export function setForgotAttempt ({ dispatch }, bool) {
  dispatch('SET_FORGOT_ATTEMPT', bool)
}

export function setForgotEmail ({ dispatch }, bool) {
  dispatch('SET_FORGOT_EMAIL', bool)
}

export function setForgotFail ({ dispatch }, bool) {
  dispatch('SET_FORGOT_FAIL', bool)
}

export function setConfirmAttempt ({ dispatch }, bool) {
  dispatch('SET_CONFIRM_ATTEMPT', bool)
}

export function setReset ({ dispatch }, bool) {
  dispatch('SET_RESET', bool)
}

export function setResetAttempt ({ dispatch }, bool) {
  dispatch('SET_RESET_ATTEMPT', bool)
}

export function setResetFail ({ dispatch }, msg) {
  dispatch('SET_RESET_FAIL', msg)
}

export function setResetKey ({ dispatch }, str) {
  dispatch('SET_RESET_KEY', str)
}

export function setResetConfirmKey ({ dispatch }, str) {
  dispatch('SET_RESET_CONFIRM_KEY', str)
}

export function setResetToken ({ dispatch }, str) {
  dispatch('SET_RESET_TOKEN', str)
}

export function setDisconnect ({ dispatch }, bool) {
  dispatch('SET_DISCONNECT', bool)
}

export function setDarkmode ({ dispatch, state }, bool) {
  dispatch('SET_DARKMODE', bool)
  return updateUser(state.user.username, { darkmode: bool }, (err, res) => {
    if (err) dispatch('SET_DARKMODE', !bool)
    return res
  })
}

export function getUserSession ({ dispatch }) {
  return getSession((err, response) => {
    if (err) return dispatch('SET_INIT', true)
    /**
     * Failsafes for IDs, set delete if it doesn't exist.
     */
    let tasks = (response.tasks) ? response.tasks : response.todos
    dispatch('SET_USERNAME', response.username)
    dispatch('SET_KEY', '')
    dispatch('SET_DARKMODE', response.darkmode)
    dispatch('SET_TASKS', tasks)
    dispatch('SET_CURRENT_LIST', _.find(tasks, { current: true }) || tasks[0])
    dispatch('SET_AUTH', response.username)
    socket.emit('join', response.username)
    return response.username
  })
}

export function loginUser ({ dispatch }, username, key, rememberMe) {
  return login(username, key, rememberMe, (err, response) => {
    if (err) {
      if (response.status === 204) return dispatch('SET_CREATE', true)
      if (response.status === 401) return dispatch('SET_INVALID_KEY', err)
    }
    let tasks = response.tasks || response.todos
    dispatch('SET_USERNAME', response.username)
    dispatch('SET_KEY', '')
    dispatch('SET_DARKMODE', response.darkmode)
    dispatch('SET_TASKS', tasks)
    dispatch('SET_CURRENT_LIST', _.find(tasks, { current: true }) || tasks[0])
    dispatch('SET_AUTH', response.username)
    socket.emit('join', response.username)
    return response.username
  })
}

export function createUser ({ dispatch }, username, key, rememberMe) {
  return create(username, key, rememberMe, (err, response) => {
    if (err) {
      if (response.status === 400) {
        dispatch('SET_CREATE_FAIL', err)
        dispatch('SET_CONFIRM_ATTEMPT', true)
        return
      }
    }
    dispatch('SET_USERNAME', response.username)
    dispatch('SET_KEY', '')
    dispatch('SET_CONFIRM', '')
    dispatch('SET_DARKMODE', response.darkmode)
    dispatch('SET_AUTH', response.username)
    socket.emit('join', response.username)
    return response.username
  })
}

export function forgotPassword ({ dispatch }, username) {
  forgot(username, (err, response) => {
    if (err) return dispatch('SET_FORGOT_FAIL', err)
    if (response.emailSent) return dispatch('SET_FORGOT_EMAIL', true)
  })
}

export function resetPassword ({ dispatch }, token, key) {
  return reset(token, key, (err, response) => {
    if (err) return dispatch('SET_RESET_FAIL', err)
    dispatch('SET_USERNAME', response.username)
    socket.emit('join', response.username)
    return response.username
  })
}

export function logoutUser () {
  return logout(() => {
    window.location.href = '/'
  })
}
