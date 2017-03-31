<template>
  <form
    class="reset-form"
    name="resetForm"
    action="/users/reset"
    novalidate
    @submit.prevent="reset(resetToken, user.resetKey)"
  >
    <reset-key-input
      :required="validate.passwordRequired"
      :match="validate.confirmMatch"
      :token="validate.tokenRequired"
    />
    <reset-confirm-input :match="validate.confirmMatch" />
    <div class="reset-form__button-container">
      <button
        class="reset-form__button-container__submit submit button"
        type="submit"
        title="Submit"
        @click="setResetAttempt(true)"
      >
        Go
      </button>
      <try-it></try-it>
    </div>
  </form>
</template>

<style lang="postcss" scoped>
@import "../../stylesheets/variables";

.reset-form__button-container {
  lost-column: 12/12;
  position: relative;
}

.reset-form__button-container__submit {
  @apply --buttonGo;

  padding: 3px 3px 4px 5px;
  margin-top: 2rem;
  width: 60px;

  @media (--medium) {
    width: 100px;
  }
}
</style>

<script>
import { mapState, mapActions } from 'vuex'
import ResetKeyInput from './form-components/ResetKeyInput.vue'
import ResetConfirmInput from './form-components/ResetConfirmInput.vue'
import TryIt from './form-components/TryIt.vue'

export default {
  components: {
    ResetKeyInput,
    ResetConfirmInput,
    TryIt
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      auth: (state) => state.auth,
      current: (state) => state.current,
      resetToken: (state) => state.resetToken
    }),
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
    ...mapActions([
      'loginUser',
      'resetPassword',
      'setResetAttempt'
    ]),
    reset (resetToken, resetKey) {
      if (!this.isValid) return
      this.resetPassword({ token: resetToken, key: resetKey })
      .then(() => {
        if (!this.user.username) return false
        return this.loginUser({ username: this.user.username, key: resetKey, rememberMe: false })
      })
      .then(() => {
        if (this.auth) {
          setTimeout(() => {
            this.$router.push('/app/list/' + this.current._id)
          }, 250)
        }
      })
    }
  }
}
</script>