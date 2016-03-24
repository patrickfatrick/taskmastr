<template>
  <form id="reset-form" name="resetForm" action="/users/reset" novalidate v-if="$route.name === 'Reset'" @submit.prevent="reset(resetToken, user.resetKey)">
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
    current () {
      return store.state.current
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
    resetPassword: store.actions.resetPassword,
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