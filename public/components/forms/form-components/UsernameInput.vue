<template>
  <div class="error-text">
    <span :class="{'hidden': !(!require && (loginAttempt || forgotAttempt))}">Email address required</span>
    <span :class="{'hidden': !(!validate && require && (loginAttempt || forgotAttempt))}">Invalid email address</span>
    <span :class="{'hidden': !($route.path === '/create' && confirmAttempt && createFail)}">{{createFail}}</span>
    <span :class="{'hidden': !($route.path === '/forgot' && forgotAttempt && forgotFail && !forgotEmail)}">{{forgotFail}}</span>
    <span :class="{'hidden': !($route.path === '/forgot' && forgotAttempt && forgotEmail && !forgotFail)}">Check your email for instructions on how to reset your password.</span>
  </div>
  <div id="user-line" class="prompt-line">
    <input id="user" class="prompt" type="text" name="username" placeholder="Email" :value="user.username" @input="setUsername($event.target.value)" :class="{'invalid': (loginAttempt || forgotAttempt) && (!require || !validate || forgotFail)}"></input>
    <button id="forgot-button" class="submit" type="submit" v-if="$route.path ==='/forgot'" @click="setForgotAttempt(true)">
      <i class="fa fa-arrow-right"></i>
    </button>
  </div>
</template>

<script>

import store from '../../../store/store'

export default {
  computed: {
    user () {
      return store.state.user
    },
    create () {
      return store.state.create
    },
    confirmAttempt () {
      return store.state.confirmAttempt
    },
    createFail () {
      return store.state.createFail
    },
    forgot () {
      return store.state.forgot
    },
    forgotAttempt () {
      return store.state.forgotAttempt
    },
    forgotEmail () {
      return store.state.forgotEmail
    },
    forgotFail () {
      return store.state.forgotFail
    },
    loginAttempt () {
      return store.state.loginAttempt
    }
  },
  props: {
    validate: Boolean,
    require: Boolean
  },
  methods: {
    setUsername: store.actions.setUsername,
    setForgotAttempt: store.actions.setForgotAttempt
  }
}

</script>