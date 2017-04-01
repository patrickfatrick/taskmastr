import _ from 'lodash'
import { SET_INITIALIZED, SET_AUTHENTICATED, SET_USERNAME, SET_KEY, SET_CONFIRM, SET_DARKMODE, SET_TASKS, SET_FORGOT, SET_REMEMBER_ME, SET_CREATE, SET_INVALID_KEY, SET_LOGIN_ATTEMPT, SET_CREATE_FAIL, SET_FORGOT_ATTEMPT, SET_FORGOT_EMAIL, SET_FORGOT_FAIL, SET_CONFIRM_ATTEMPT, SET_RESET, SET_RESET_KEY, SET_RESET_CONFIRM_KEY, SET_RESET_ATTEMPT, SET_RESET_TOKEN, SET_RESET_FAIL, SET_DISCONNECT, SET_JUMPTO } from '../mutation-types'

export default {
  [SET_INITIALIZED] (state, bool) {
    _.set(state, 'initialized', bool)
  },
  [SET_AUTHENTICATED] (state, val) {
    _.set(state, 'authenticated', val)
  },
  [SET_USERNAME] (state, username) {
    _.set(state, 'user.username', username)
  },
  [SET_KEY] (state, key) {
    _.set(state, 'user.key', key)
  },
  [SET_CONFIRM] (state, confirm) {
    _.set(state, 'user.confirm', confirm)
  },
  [SET_DARKMODE] (state, bool) {
    _.set(state, 'user.darkmode', bool)
  },
  [SET_TASKS] (state, tasks) {
    _.set(state, 'user.tasks', tasks)
  },
  [SET_FORGOT] (state, bool) {
    _.set(state, 'forgot', bool)
  },
  [SET_REMEMBER_ME] (state, bool) {
    _.set(state, 'rememberMe', bool)
  },
  [SET_CREATE] (state, bool) {
    _.set(state, 'create', bool)
  },
  [SET_INVALID_KEY] (state, msg) {
    _.set(state, 'invalidKey', msg)
  },
  [SET_LOGIN_ATTEMPT] (state, bool) {
    _.set(state, 'loginAttempt', bool)
  },
  [SET_CREATE_FAIL] (state, msg) {
    _.set(state, 'createFail', msg)
  },
  [SET_FORGOT_ATTEMPT] (state, bool) {
    _.set(state, 'forgotAttempt', bool)
  },
  [SET_FORGOT_EMAIL] (state, bool) {
    _.set(state, 'forgotEmail', bool)
  },
  [SET_FORGOT_FAIL] (state, msg) {
    _.set(state, 'forgotFail', msg)
  },
  [SET_CONFIRM_ATTEMPT] (state, bool) {
    _.set(state, 'confirmAttempt', bool)
  },
  [SET_RESET] (state, bool) {
    _.set(state, 'reset', bool)
  },
  [SET_RESET_KEY] (state, key) {
    _.set(state, 'user.resetKey', key)
  },
  [SET_RESET_CONFIRM_KEY] (state, key) {
    _.set(state, 'user.resetConfirmKey', key)
  },
  [SET_RESET_ATTEMPT] (state, bool) {
    _.set(state, 'resetAttempt', bool)
  },
  [SET_RESET_TOKEN] (state, val) {
    _.set(state, 'resetToken', val)
  },
  [SET_RESET_FAIL] (state, val) {
    _.set(state, 'resetFail', val)
  },
  [SET_DISCONNECT] (state, bool) {
    _.set(state, 'disconnect', bool)
  },
  [SET_JUMPTO] (state, location) {
    _.set(state, 'jumpto', location)
  }
}
