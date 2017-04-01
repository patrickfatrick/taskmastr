import _ from 'lodash'
import { SET_INITIALIZED, SET_AUTHENTICATED, SET_FORGOT, SET_REMEMBER_ME, SET_CREATE, SET_INVALID_KEY, SET_LOGIN_ATTEMPT, SET_CREATE_FAIL, SET_FORGOT_ATTEMPT, SET_FORGOT_EMAIL, SET_FORGOT_FAIL, SET_CONFIRM_ATTEMPT, SET_RESET, SET_RESET_ATTEMPT, SET_RESET_FAIL, SET_DISCONNECT, SET_JUMPTO } from '../mutation-types'

export default {
  [SET_INITIALIZED] (state, bool) {
    _.set(state, 'initialized', bool)
  },
  [SET_AUTHENTICATED] (state, val) {
    _.set(state, 'authenticated', val)
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
  [SET_RESET_ATTEMPT] (state, bool) {
    _.set(state, 'resetAttempt', bool)
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
