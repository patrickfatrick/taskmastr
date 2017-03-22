<template>
  <div>
    <div class="error-text">
      <span :class="{'hidden': required || !loginAttempt}">Password required</span>
      <span :class="{'hidden': !invalidKey || !loginAttempt}">{{invalidKey}}</span>
    </div>
    <div id="key-line" class="prompt-line">
      <input id="key" class="prompt" type="password" name="password" placeholder="Password" :value="user.key" @input="setKey($event.target.value)" :class="{'invalid': loginAttempt && (!required || invalidKey)}"></input>
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
    create: (state) => state.create,
    invalidKey: (state) => state.invalidKey,
    loginAttempt: (state) => state.loginAttempt
  }),
  props: {
    required: Boolean
  },
  methods: mapActions([
    'setKey'
  ])
}
</script>