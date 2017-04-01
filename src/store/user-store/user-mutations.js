import _ from 'lodash'
import { SET_USERNAME, SET_KEY, SET_CONFIRM_KEY, SET_RESET_KEY, SET_RESET_CONFIRM_KEY, SET_DARKMODE, SET_TASKS, SET_RESET_TOKEN } from '../mutation-types'

export default {
  [SET_USERNAME] (state, username) {
    _.set(state, 'user.username', username)
  },
  [SET_KEY] (state, key) {
    _.set(state, 'user.key', key)
  },
  [SET_CONFIRM_KEY] (state, key) {
    _.set(state, 'user.confirmKey', key)
  },
  [SET_DARKMODE] (state, bool) {
    _.set(state, 'user.darkmode', bool)
  },
  [SET_TASKS] (state, tasks) {
    _.set(state, 'user.tasks', tasks)
  },
  [SET_RESET_KEY] (state, key) {
    _.set(state, 'user.resetKey', key)
  },
  [SET_RESET_CONFIRM_KEY] (state, key) {
    _.set(state, 'user.resetConfirmKey', key)
  },
  [SET_RESET_TOKEN] (state, val) {
    _.set(state, 'resetToken', val)
  }
}
