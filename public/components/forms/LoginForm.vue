<template>
  <form id="user-form" name="userForm" action="/users/login" novalidate @submit.prevent="login(user.username.trim(), user.key, rememberMe, isValid)">
    <username-input :validate="validate.usernameEmail" :require="validate.usernameRequired"></username-input>
    <key-input :require="validate.passwordRequired"></key-input>
    <remember-me></remember-me>
    <forgot-password></forgot-password>
    <div class="button-container">
      <button id="key-button" class="submit button" type="submit" @click="setLoginAttempt(true)">
        Go
      </button>
      <try-it></try-it>
    </div>
  </form>
</template>

<script>

import { loginUser, setLoginAttempt } from '../../store/user-store/user-actions'
import UsernameInput from './form-components/UsernameInput.vue'
import KeyInput from './form-components/KeyInput.vue'
import RememberMe from './form-components/RememberMe.vue'
import ForgotPassword from './form-components/ForgotPassword.vue'
import TryIt from './form-components/TryIt.vue'

const emailRE = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      auth: (state) => state.auth,
      current: (state) => state.current,
      reset: (state) => state.reset,
      forgot: (state) => state.forgot,
      create: (state) => state.create,
      rememberMe: (state) => state.rememberMe
    },
    actions: {
      loginUser,
      setLoginAttempt
    }
  },
  components: {
    UsernameInput,
    KeyInput,
    RememberMe,
    ForgotPassword,
    TryIt
  },
  computed: {
    validate () {
      return {
        usernameEmail: emailRE.test(this.user.username.trim()),
        usernameRequired: !!this.user.username.trim(),
        passwordRequired: !!this.user.key.trim()
      }
    },
    isValid () {
      const validation = this.validate
      return Object.keys(validation).every((key) => {
        return validation[key]
      })
    }
  },
  methods: {
    login (username, key, rememberMe) {
      if (!this.isValid) return
      this.loginUser(username, key, rememberMe)
      .then(() => {
        if (this.auth) {
          setTimeout(() => {
            this.$route.router.go('/app/list/' + this.current.id)
          }, 250)
        }
        if (this.create && !this.auth) {
          this.$route.router.go('/create')
        }
      })
    }
  }
}

</script>