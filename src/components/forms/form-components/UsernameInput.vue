<template>
  <div>
    <div class="error-text">
      <span :class="{'hidden': !(!required && (loginAttempt || forgotAttempt))}">Email address required</span>
      <span :class="{'hidden': !(!validate && required && (loginAttempt || forgotAttempt))}">Invalid email address</span>
      <span :class="{'hidden': !($route.path === '/create' && confirmAttempt && createFail)}">{{createFail}}</span>
      <span :class="{'hidden': !($route.path === '/forgot' && forgotAttempt && forgotFail && !forgotEmail)}">{{forgotFail}}</span>
      <span :class="{'hidden': !($route.path === '/forgot' && forgotAttempt && forgotEmail && !forgotFail)}">Check your email for instructions on how to reset your password.</span>
    </div>
    <div id="user-line" class="prompt-line">
      <input id="user" class="prompt" type="text" name="username" placeholder="Email" :value="user.username" @input="setUsername($event.target.value)" :class="{'invalid': (loginAttempt || forgotAttempt) && (!required || !validate || forgotFail)}"></input>
    </div>
  </div>
</template>

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