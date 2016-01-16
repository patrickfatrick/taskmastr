import {SET_INIT, SET_AUTH, TOGGLE_CHECKBOX, SET_USERNAME, SET_KEY, SET_CONFIRM, SET_DARKMODE, SET_TASKS, SET_FORGOT, SET_CREATE, SET_INVALID_KEY, SET_LOGIN_ATTEMPT, SET_FORGOT_ATTEMPT, SET_FORGOT_EMAIL, SET_CONFIRM_ATTEMPT, SET_RESET, SET_RESET_ATTEMPT, SET_RESET_TOKEN, SET_RESET_FAIL, SET_SAVE_BUTTON} from '../mutation-types'

export const userMutations = {
  [SET_INIT] (state, bool) {
    state.init = bool
  },
  [SET_AUTH] (state, val) {
    state.auth = val
  },
  [TOGGLE_CHECKBOX] (state, checkbox) {
    state[checkbox] = !state[checkbox]
  },
  [SET_USERNAME] (state, username) {
    state.user.username = username
  },
  [SET_KEY] (state, key) {
    state.user.key = key
  },
  [SET_CONFIRM] (state, confirm) {
    state.user.confirm = confirm
  },
  [SET_DARKMODE] (state, bool) {
    state.user.darkmode = bool
  },
  [SET_TASKS] (state, tasks) {
    state.user.tasks = tasks
  },
  [SET_FORGOT] (state) {
    state.forgot = !state.forgot
  },
  [SET_CREATE] (state) {
    state.create = !state.create
  },
  [SET_INVALID_KEY] (state, msg) {
    state.invalidKey = msg
  },
  [SET_LOGIN_ATTEMPT] (state, bool) {
    state.loginAttempt = bool
  },
  [SET_FORGOT_ATTEMPT] (state, bool) {
    state.forgotAttempt = bool
  },
  [SET_FORGOT_EMAIL] (state, bool) {
    state.forgotEmail = bool
  },
  [SET_CONFIRM_ATTEMPT] (state, bool) {
    state.confirmAttempt = bool
  },
  [SET_RESET] (state, bool) {
    state.reset = bool
  },
  [SET_RESET_ATTEMPT] (state, bool) {
    state.resetAttempt = bool
  },
  [SET_RESET_TOKEN] (state, val) {
    state.resetToken = val
  },
  [SET_RESET_FAIL] (state, val) {
    state.resetFail = val
  },
  [SET_SAVE_BUTTON] (state, bool) {
    state.saveButton = bool
  }
}
