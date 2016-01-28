<template>
  <div class="error-text">
    <span v-bind:class="{'hidden': !(!require && (loginAttempt || forgotAttempt))}">Email address required</span>
    <span v-bind:class="{'hidden': !(!validate && require && (loginAttempt || forgotAttempt))}">Invalid email address</span>
    <span v-bind:class="{'hidden': !($route.path === '/forgot' && forgotAttempt && forgotFail && !forgotEmail)}">{{forgotFail}}</span>
    <span v-bind:class="{'hidden': !($route.path === '/forgot' && forgotAttempt && forgotEmail && !forgotFail)}">Check your email for instructions on how to reset your password.</span>
  </div>
  <div id="user-line" class="prompt-line">
    <input id="user" class="prompt" type="text" name="username" placeholder="Email" v-model="user.username" v-bind:class="{'invalid': (loginAttempt || forgotAttempt) && (!require || !validate || forgotFail)}"></input>
    <button id="forgot-button" class="fa fa-arrow-right submit" type="submit" v-if="$route.path ==='/forgot'" v-on:click="setForgotAttempt(true)">
  </div>
</template>

<script>

import store from '../../../store/store'

export default {
  computed: {
    user () {
      return store.state.user
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
    setForgotAttempt: store.actions.setForgotAttempt
  }
}

</script>