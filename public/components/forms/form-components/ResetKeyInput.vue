<template>
  <div class="error-text">
    <span :class="{'hidden': !(resetAttempt && !require)}">Password required</span>
    <span :class="{'hidden': !(resetAttempt && !match && require)}">Passwords don't match</span>
    <span :class="{'hidden': !(resetAttempt && resetFail)}">{{resetFail}}</span>
    <span :class="{'hidden': !(!token)}">This doesn't appear to be a valid reset link. Please try again.</span>
  </div>
  <div id="reset-key-line" class="prompt-line">
    <input id="reset-key" class="prompt" type="password" name="resetKey" placeholder="Password" :value="user.resetKey" @input="setResetKey($event.target.value)" :class="{'invalid': resetAttempt && (!require || resetFail)}"></input>
  </div>
</template>

<script>

import { setResetKey } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      user: (state) => state.user.user,
      resetAttempt: (state) => state.user.resetAttempt,
      resetFail: (state) => state.user.resetFail
    },
    actions: {
      setResetKey
    }
  },
  props: {
    require: Boolean,
    match: Boolean,
    token: Boolean
  }
}

</script>