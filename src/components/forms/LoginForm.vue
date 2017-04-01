<template>
  <form
    class="login-form"
    name="loginForm"
    action="/users/login"
    novalidate
    @submit.prevent="login(user.username.trim(), user.key, rememberMe)"
  >
    <username-input
      :validate="validate.usernameEmail"
      :required="validate.usernameRequired"
    />
    <key-input :required="validate.passwordRequired" />
    <remember-me />
    <forgot-password />
    <div class="login-form__button-container">
      <button
        class="login-form__button-container__submit submit button"
        type="submit"
        title="Submit"
        @click="setLoginAttempt(true)"
      >
        Go
      </button>
      <try-it></try-it>
    </div>
  </form>
</template>

<style lang="postcss" scoped>
@import "../../stylesheets/variables";

.login-form__button-container {
  lost-column: 12/12;
  position: relative;
}

.login-form__button-container__submit {
  @apply --buttonGo;
}
</style>

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
      authenticated: (state) => state.authenticated,
      currentList: (state) => state.currentList,
      reset: (state) => state.reset,
      forgot: (state) => state.forgot,
      create: (state) => state.create,
      rememberMe: (state) => state.rememberMe,
      jumpto: (state) => state.jumpto
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
        if (this.authenticated) {
          setTimeout(() => {
            this.$router.push(this.jumpto || '/app/list/' + this.currentList)
          }, 250)
        }
        if (this.create && !this.authenticated) {
          this.$router.push('/create')
        }
      })
    }
  }
}
</script>
