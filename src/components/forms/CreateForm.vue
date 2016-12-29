<template>
  <form id="create-form" name="createForm" action="/users/create" novalidate @submit.prevent="create(user.username.trim(), user.confirm, rememberMe)">
    <username-input :validate="validate.usernameEmail" :required="validate.usernameRequired"></username-input>
    <key-input :required="validate.passwordRequired"></key-input>
    <confirm-input :match="validate.confirmMatch"></confirm-input>
    <remember-me></remember-me>
    <forgot-password></forgot-password>
    <div class="button-container">
      <button id="confirm-button" class="submit button" type="submit" title="Submit" @click="setConfirmAttempt(true)">
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
      auth: (state) => state.auth,
      current: (state) => state.current,
      forgot: (state) => state.forgot,
      rememberMe: (state) => state.rememberMe
    }),
    validate () {
      return {
        usernameEmail: emailRE.test(this.user.username.trim()),
        usernameRequired: !!this.user.username.trim(),
        passwordRequired: !!this.user.key.trim(),
        confirmMatch: this.user.confirm.trim() === this.user.key.trim()
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
      this.createUser({ username, key, rememberMe })
      .then(() => {
        if (this.auth) {
          this.addList({...defaultList, owner: this.user.username, users: []})
          this.setCurrentList(defaultList)
          setTimeout(() => {
            this.$router.push('/app/list/' + defaultList.id)
          }, 250)
        }
      })
    }
  }
}
</script>