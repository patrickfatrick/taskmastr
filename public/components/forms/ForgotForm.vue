<template>
  <form id="forgot-form" name="forgotForm" action="/users/forgot" novalidate v-if="$route.path === '/forgot'" v-on:submit.prevent="forgotPassword(user.username, isValid)">
    <username-input :validate="validate.usernameEmail" :require="validate.usernameRequired"></username-input>
    <forgot-password></forgot-password>
  </form>
</template>

<script>

import store from '../../store/store'
import UsernameInput from './form-components/UsernameInput.vue'
import ForgotPassword from './form-components/ForgotPassword.vue'

const emailRE = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  components: {
    UsernameInput,
    ForgotPassword
  },
  computed: {
    user () {
      return store.state.user
    },
    forgot () {
      return store.state.forgot
    },
    validate () {
      return {
        usernameEmail: emailRE.test(this.user.username),
        usernameRequired: !!this.user.username.trim()
      }
    },
    isValid () {
      var validation = this.validate
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    forgotPassword: store.actions.forgotPassword
  }
}

</script>