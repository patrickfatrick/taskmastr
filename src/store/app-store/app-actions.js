export function setInitialized ({ commit }, bool) {
  commit('SET_INITIALIZED', bool)
}

export function setAuthenticated ({ commit }, bool) {
  commit('SET_AUTHENTICATED', bool)
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

export function setDisconnect ({ commit }, bool) {
  commit('SET_DISCONNECT', bool)
}

export function setJumpto ({ commit }, location) {
  commit('SET_JUMPTO', location)
}
