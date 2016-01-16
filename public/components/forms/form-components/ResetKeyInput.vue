<template>
  <div class="error-text">
    <span v-show="resetAttempt && !require">Password required</span>
    <span v-show="resetAttempt && !match && require">Passwords don't match</span>
    <span v-show="resetAttempt && resetFail">{{resetFail}}</span>
    <span v-show="resetAttempt && !token">This doesn't appear to be a valid reset link. Please try again.</span>
  </div>
  <div id="reset-key-line" class="prompt-line">
    <input id="reset-key" class="prompt" type="password" name="resetKey" placeholder="Password" v-model="user.resetKey" v-bind:class="{'invalid': resetAttempt && (!require || resetFail)}"></input>
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
  }
}

</script>