<template>
  <div>
    <div class="error-text">
      <span
        class="error-text__message"
        v-show="loginAttempt && !user.confirm && !confirmAttempt"
      >
        No user found. Please confirm your password.
      </span>
      <span
        class="error-text__message"
        v-show="confirmAttempt && !user.confirm"
      >
        Password confirmation required.
      </span>
      <span
        class="error-text__message"
        v-show="!match && loginAttempt && user.confirm"
      >
        Passwords don't match.
      </span>
    </div>
    <div class="prompt-line--confirm-line">
      <input
        class="prompt-line__prompt"
        :class="{'prompt-line__prompt--invalid': confirmAttempt && !match}"
        type="password"
        name="password"
        placeholder="Confirm Password"
        :value="user.confirm"
        @input="setConfirm($event.target.value)"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.error-text {
  @apply --modalSmallText;
}

.prompt-line--confirm-line {
  @apply --promptLine;

  @media (--medium) {
    lost-column: 8/12;
    lost-offset: 2/12;
  }
}
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    user: (state) => state.user,
    loginAttempt: (state) => state.loginAttempt,
    confirmAttempt: (state) => state.confirmAttempt
  }),
  props: {
    match: Boolean
  },
  methods: mapActions([
    'setConfirmKey'
  ])
}
</script>