<template>
  <div>
    <div class="error-text">
      <span
        class="error-text__message"
        v-show="(loginAttempt || forgotAttempt) && !required"
      >
        Email address required
      </span>
      <span
        v-show="(loginAttempt || forgotAttempt) && required && !validate"
      >
        Invalid email address
      </span>
      <span
        v-show="$route.path === '/create' && confirmAttempt && createFail"
      >
        {{createFail}}
      </span>
      <span
        v-show="$route.path === '/forgot' && forgotAttempt && forgotFail && !forgotEmail"
      >
        {{forgotFail}}
      </span>
      <span
        v-show="$route.path === '/forgot' && forgotAttempt && forgotEmail && !forgotFail"
      >
        Check your email for instructions on how to reset your password.
      </span>
    </div>
    <div
      class="prompt-line--user-line">
      <input
        class="prompt-line__prompt"
        type="text"
        name="username"
        placeholder="Email"
        :value="user.username" @input="setUsername($event.target.value)"
        :class="{'prompt-line__prompt--invalid': (loginAttempt || forgotAttempt) && (!required || !validate || forgotFail)}"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.error-text {
  @apply --modalSmallText;
}

.prompt-line--user-line {
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
    confirmAttempt: (state) => state.confirmAttempt,
    createFail: (state) => state.createFail,
    forgot: (state) => state.forgot,
    forgotAttempt: (state) => state.forgotAttempt,
    forgotEmail: (state) => state.forgotEmail,
    forgotFail: (state) => state.forgotFail,
    loginAttempt: (state) => state.loginAttempt
  }),
  props: {
    validate: Boolean,
    required: Boolean
  },
  methods: mapActions([
    'setUsername'
  ])
}
</script>