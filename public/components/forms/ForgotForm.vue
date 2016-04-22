<template>
  <form id="forgot-form" name="forgotForm" action="/users/forgot" novalidate @submit.prevent="forgot(user.username.trim())">
    <username-input :validate="validate.usernameEmail" :require="validate.usernameRequired"></username-input>
    <forgot-password></forgot-password>
    <div class="button-container">
      <button id="forgot-button" class="submit button" type="submit" @click="setForgotAttempt(true)">
        Go
      </button>
      <try-it></try-it>
    </div>
  </form>
</template>

<script>

import { forgotPassword, setForgotAttempt } from '../../store/user-store/user-actions'
import UsernameInput from './form-components/UsernameInput.vue'
import ForgotPassword from './form-components/ForgotPassword.vue'
import TryIt from './form-components/TryIt.vue'

const emailRE = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  vuex: {
    getters: {
      user: (state) => state.user
    },
    actions: {
      forgotPassword,
      setForgotAttempt
    }
  },
  components: {
    UsernameInput,
    ForgotPassword,
    TryIt
  },
  computed: {
    validate () {
      return {
        usernameEmail: emailRE.test(this.user.username.trim()),
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