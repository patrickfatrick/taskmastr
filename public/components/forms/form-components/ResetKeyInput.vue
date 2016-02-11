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

import store from '../../../store/store'

export default {
  computed: {
    user () {
      return store.state.user
    },
    resetAttempt () {
      return store.state.resetAttempt
    },
    resetFail () {
      return store.state.resetFail
    }
  },
  props: {
    require: Boolean,
    match: Boolean,
    token: Boolean
  },
  methods: {
    setResetKey: store.actions.setResetKey
  }
}

</script>