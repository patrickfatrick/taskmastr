<template>
  <form id="reset-form" name="resetForm" action="/users/reset" novalidate v-on:submit.prevent="resetPassword(resetToken, user.resetKey, isValid)">
    <reset-key-input :require="validate.passwordRequired" :match="validate.confirmMatch" :token="validate.tokenRequired"></reset-key-input>
    <reset-confirm-input :match="validate.confirmMatch"></reset-confirm-input>
  </form>
</template>

<script>

import store from '../../store/store'
import ResetKeyInput from './form-components/ResetKeyInput.vue'
import ResetConfirmInput from './form-components/ResetConfirmInput.vue'

export default {
  components: {
    ResetKeyInput,
    ResetConfirmInput
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
    resetToken () {
      return store.state.resetToken
    },
    validate () {
      return {
        passwordRequired: !!this.user.resetKey.trim(),
        confirmMatch: this.user.resetConfirmKey.trim() === this.user.resetKey.trim(),
        tokenRequired: !!this.resetToken
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
    loginUser: store.actions.loginUser,
    resetPassword (resetToken, resetKey, isValid) {
      store.actions.resetPassword(resetToken, resetKey, isValid)
      .then((response) => {
        if (!response) return false
        return this.loginUser(response, resetKey, false, isValid)
      })
      .then(() => {
        if (this.auth) {
          setTimeout(() => {
            this.$route.router.go('/app')
          }, 750)
        }
      })
    }
  }
}

</script>