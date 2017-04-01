<template>
  <form
    class="forgot-form"
    name="forgotForm"
    action="/users/forgot"
    novalidate
    @submit.prevent="forgot(user.username.trim())"
  >
    <username-input
      :validate="validate.usernameEmail"
      :required="validate.usernameRequired"
    />
    <forgot-password />
    <div class="forgot-form__button-container">
      <button
        class="forgot-form__button-container__submit submit button"
        type="submit"
        title="Submit"
        @click="setForgotAttempt(true)"
      >
        Go
      </button>
      <try-it />
    </div>
  </form>
</template>

<style lang="postcss" scoped>
@import "../../stylesheets/variables";

.forgot-form__button-container {
  lost-column: 12/12;
  position: relative;
}

.forgot-form__button-container__submit {
  @apply --buttonGo;
}
</style>

<script>
import { mapState, mapActions } from 'vuex'
import UsernameInput from './form-components/UsernameInput.vue'
import ForgotPassword from './form-components/ForgotPassword.vue'
import TryIt from './form-components/TryIt.vue'

const emailRE = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  components: {
    UsernameInput,
    ForgotPassword,
    TryIt
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    }),
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
    ...mapActions([
      'forgotPassword',
      'setForgotAttempt'
    ]),
    forgot (username) {
      if (!this.isValid) return
      this.forgotPassword(username)
    }
  }
}
</script>