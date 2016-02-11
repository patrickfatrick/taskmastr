<template>
  <form id="user-form" name="userForm" action="/users/login" novalidate v-if="$route.path === '/login'" @submit.prevent="login(user.username, user.key, rememberMe, isValid)">
    <username-input :validate="validate.usernameEmail" :require="validate.usernameRequired"></username-input>
    <key-input :require="validate.passwordRequired"></key-input>
    <remember-me></remember-me>
    <forgot-password></forgot-password>
  </form>
</template>

<script>

import store from '../../store/store'
import UsernameInput from './form-components/UsernameInput.vue'
import KeyInput from './form-components/KeyInput.vue'
import RememberMe from './form-components/RememberMe.vue'
import ForgotPassword from './form-components/ForgotPassword.vue'

const emailRE = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  components: {
    UsernameInput,
    KeyInput,
    RememberMe,
    ForgotPassword
  },
  computed: {
    auth () {
      return store.state.auth
    },
    user () {
      return store.state.user
    },
    reset () {
      return store.state.reset
    },
    forgot () {
      return store.state.forgot
    },
    create () {
      return store.state.create
    },
    rememberMe () {
      return store.state.rememberMe
    },
    validate () {
      return {
        usernameEmail: emailRE.test(this.user.username),
        usernameRequired: !!this.user.username.trim(),
        passwordRequired: !!this.user.key.trim()
      }
    },
    isValid () {
      const validation = this.validate
      return Object.keys(validation).every(key => {
        return validation[key]
      })
    }
  },
  methods: {
    loginUser: store.actions.loginUser,
    login (username, key, rememberMe) {
      if (!this.isValid) return
      this.loginUser(username, key, rememberMe)
      .then(() => {
        if (this.auth) {
          setTimeout(() => {
            this.$route.router.go('/app')
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