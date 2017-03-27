<template>
  <div>
    <div class="error-text">
      <span
        class="error-text__message"
        v-show="loginAttempt && !required"
      >
        Password required
      </span>
      <span
        class="error-text__message"
        v-show="loginAttempt && invalidKey"
      >
        {{invalidKey}}
      </span>
    </div>
    <div
      class="prompt-line--key-line"
    >
      <input
        class="prompt-line__prompt"
        type="password"
        name="password"
        placeholder="Password"
        :value="user.key"
        @input="setKey($event.target.value)"
        :class="{'prompt-line__prompt--invalid': loginAttempt && (!required || invalidKey)}"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  @import "../../../stylesheets/variables";

  .error-text {
    @apply --modalSmallText;
  }

  .prompt-line--key-line {
    @apply --promptLine;

    lost-column: 8/12;
    lost-offset: 2/12;
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