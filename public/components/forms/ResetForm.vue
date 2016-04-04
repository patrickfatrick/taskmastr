<template>
  <form id="reset-form" name="resetForm" action="/users/reset" novalidate @submit.prevent="reset(resetToken, user.resetKey)">
    <reset-key-input :require="validate.passwordRequired" :match="validate.confirmMatch" :token="validate.tokenRequired"></reset-key-input>
    <reset-confirm-input :match="validate.confirmMatch"></reset-confirm-input>
  </form>
</template>

<script>

import { loginPassword, resetPassword } from '../../store/user-store/user-actions'
import ResetKeyInput from './form-components/ResetKeyInput.vue'
import ResetConfirmInput from './form-components/ResetConfirmInput.vue'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      auth: (state) => state.auth,
      current: (state) => state.current,
      resetToken: (state) => state.resetToken
    },
    actions: {
      loginPassword,
      resetPassword
    }
  },
  components: {
    ResetKeyInput,
    ResetConfirmInput
  },
  computed: {
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
    reset (resetToken, resetKey) {
      if (!this.isValid) return
      this.resetPassword(resetToken, resetKey)
      .then(() => {
        if (!this.user.username) return false
        return this.loginUser(this.user.username, resetKey, false)
      })
      .then(() => {
        if (this.auth) {
          setTimeout(() => {
            this.$route.router.go('/app/list/' + this.current.id)
          }, 250)
        }
      })
    }
  }
}

</script>