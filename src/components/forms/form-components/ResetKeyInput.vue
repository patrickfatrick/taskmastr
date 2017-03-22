<template>
  <div>
    <div class="error-text">
      <span :class="{'hidden': !(resetAttempt && !required)}">Password required</span>
      <span :class="{'hidden': !(resetAttempt && !match && required)}">Passwords don't match</span>
      <span :class="{'hidden': !(resetAttempt && resetFail)}">{{resetFail}}</span>
      <span :class="{'hidden': !(!token)}">This doesn't appear to be a valid reset link. Please try again.</span>
    </div>
    <div id="reset-key-line" class="prompt-line">
      <input id="reset-key" class="prompt" type="password" name="resetKey" placeholder="Password" :value="user.resetKey" @input="setResetKey($event.target.value)" :class="{'invalid': resetAttempt && (!required || resetFail)}"></input>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "bourbon";
  @import "neat";
  @import "../../../stylesheets/mixins";

  .error-text {
    @include modal-small-text;
  }
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    user: (state) => state.user,
    resetAttempt: (state) => state.resetAttempt,
    resetFail: (state) => state.resetFail
  }),
  props: {
    required: Boolean,
    match: Boolean,
    token: Boolean
  },
  methods: mapActions([
    'setResetKey'
  ])
}
</script>