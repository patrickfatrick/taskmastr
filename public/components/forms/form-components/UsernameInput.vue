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

import { setUsername, setForgotAttempt } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      create: (state) => state.create,
      confirmAttempt: (state) => state.confirmAttempt,
      createFail: (state) => state.createFail,
      forgot: (state) => state.forgot,
      forgotAttempt: (state) => state.forgotAttempt,
      forgotEmail: (state) => state.forgotEmail,
      forgotFail: (state) => state.forgotFail,
      loginAttempt: (state) => state.loginAttempt
    },
    actions: {
      setUsername,
      setForgotAttempt
    }
  },
  props: {
    validate: Boolean,
    require: Boolean
  }
}

</script>