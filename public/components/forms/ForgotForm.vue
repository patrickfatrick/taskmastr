<template>
  <form id="forgot-form" name="forgotForm" action="/users/forgot" novalidate v-if="$route.name === 'Forgot'" @submit.prevent="forgot(user.username)">
    <username-input :validate="validate.usernameEmail" :require="validate.usernameRequired"></username-input>
    <forgot-password></forgot-password>
  </form>
</template>

<script>

import { forgotPassword } from '../../store/user-store/user-actions'
import UsernameInput from './form-components/UsernameInput.vue'
import ForgotPassword from './form-components/ForgotPassword.vue'

const emailRE = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  vuex: {
    getters: {
      user: (state) => state.user.user
    },
    actions: {
      forgotPassword
    }
  },
  components: {
    UsernameInput,
    ForgotPassword
  },
  computed: {
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
    forgot (username) {
      if (!this.isValid) return
      this.forgotPassword(username)
    }
  }
}

</script>