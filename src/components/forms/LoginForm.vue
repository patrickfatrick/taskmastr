<template>
  <form id="user-form" name="userForm" action="/users/login" novalidate @submit.prevent="login(user.username.trim(), user.key, rememberMe)">
    <username-input :validate="validate.usernameEmail" :required="validate.usernameRequired"></username-input>
    <key-input :required="validate.passwordRequired"></key-input>
    <remember-me></remember-me>
    <forgot-password></forgot-password>
    <div class="button-container">
      <button id="key-button" class="submit button" type="submit" title="Submit" @click="setLoginAttempt(true)">
        Go
      </button>
      <try-it></try-it>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UsernameInput from './form-components/UsernameInput.vue'
import KeyInput from './form-components/KeyInput.vue'
import RememberMe from './form-components/RememberMe.vue'
import ForgotPassword from './form-components/ForgotPassword.vue'
import TryIt from './form-components/TryIt.vue'

const emailRE = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  components: {
    UsernameInput,
    KeyInput,
    RememberMe,
    ForgotPassword,
    TryIt
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      auth: (state) => state.auth,
      current: (state) => state.current,
      reset: (state) => state.reset,
      forgot: (state) => state.forgot,
      create: (state) => state.create,
      rememberMe: (state) => state.rememberMe
    }),
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
    ...mapActions([
      'loginUser',
      'setLoginAttempt'
    ]),
    login (username, key, rememberMe) {
      if (!this.isValid) return
      this.loginUser({ username, key, rememberMe })
      .then(() => {
        if (this.auth) {
          setTimeout(() => {
            this.$router.push('/app/list/' + this.current._id)
          }, 250)
        }
        if (this.create && !this.auth) {
          this.$router.push('/create')
        }
      })
    }
  }
}
</script>
