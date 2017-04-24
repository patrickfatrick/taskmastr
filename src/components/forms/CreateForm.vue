<template>
  <form
    class="create-form"
    name="createForm"
    action="/users/create"
    novalidate
    @submit.prevent="create(user.username.trim(), user.confirmKey, rememberMe)"
  >
    <username-input
      :validate="validate.usernameEmail"
      :required="validate.usernameRequired"
    />
    <key-input :required="validate.passwordRequired" />
    <confirm-input :match="validate.confirmMatch" />
    <remember-me />
    <forgot-password />
    <div class="create-form__button-container">
      <button
        class="create-form__button-container__submit submit button"
        type="submit"
        title="Submit"
        @click="setConfirmAttempt(true)"
      >
        Go
      </button>
      <try-it />
    </div>
  </form>
</template>

<style lang="postcss" scoped>
@import "../../stylesheets/variables";

.create-form__button-container {
  lost-column: 12/12;
  position: relative;
}

.create-form__button-container__submit {
  @apply --buttonGo;
}
</style>

<script>
import { mapState, mapActions } from 'vuex'
import UsernameInput from './form-components/UsernameInput.vue'
import KeyInput from './form-components/KeyInput.vue'
import ConfirmInput from './form-components/ConfirmInput.vue'
import RememberMe from './form-components/RememberMe.vue'
import ForgotPassword from './form-components/ForgotPassword.vue'
import TryIt from './form-components/TryIt.vue'
import defaultList from '../../helper-utilities/default-list'

const emailRE = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  components: {
    UsernameInput,
    KeyInput,
    ConfirmInput,
    RememberMe,
    ForgotPassword,
    TryIt
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      authenticated: (state) => state.authenticated,
      current: (state) => state.current,
      forgot: (state) => state.forgot,
      rememberMe: (state) => state.rememberMe,
      jumpto: (state) => state.jumpto
    }),
    validate () {
      return {
        usernameEmail: emailRE.test(this.user.username.trim()),
        usernameRequired: !!this.user.username.trim(),
        passwordRequired: !!this.user.key.trim(),
        confirmMatch: this.user.confirmKey.trim() === this.user.key.trim()
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
      'addList',
      'setCurrentList',
      'createUser',
      'setConfirmAttempt'
    ]),
    create (username, key, rememberMe) {
      if (!this.isValid) return
      const list = defaultList(this.user.username)
      this.createUser({ username, key, rememberMe })
      .then(() => {
        if (this.authenticated) {
          this.addList(list)
          this.setCurrentList(list)
          setTimeout(() => {
            this.$router.push(this.jumpto || '/app/list/' + list._id)
          }, 250)
        }
      })
    }
  }
}
</script>