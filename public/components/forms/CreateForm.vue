<template>
  <form id="create-form" name="createForm" v-if="!forgot && ($route.name === 'Create')" action="/users/create" novalidate @submit.prevent="create(user.username.trim(), user.confirm, rememberMe)">
    <username-input :validate="validate.usernameEmail" :require="validate.usernameRequired"></username-input>
    <key-input :require="validate.passwordRequired"></key-input>
    <confirm-input :match="validate.confirmMatch"></confirm-input>
    <remember-me></remember-me>
    <forgot-password></forgot-password>
  </form>
</template>

<script>

import { saveUser, addList, setCurrentList, loginUser, createUser } from '../../store/user-store/user-actions'
import UsernameInput from './form-components/UsernameInput.vue'
import KeyInput from './form-components/KeyInput.vue'
import ConfirmInput from './form-components/ConfirmInput.vue'
import RememberMe from './form-components/RememberMe.vue'
import ForgotPassword from './form-components/ForgotPassword.vue'
import defaultList from '../../helper-utilities/default-list'

const emailRE = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  vuex: {
    getters: {
      user: (state) => state.user.user,
      auth: (state) => state.user.auth,
      current: (state) => state.task.current,
      forgot: (state) => state.user.forgot,
      rememberMe: (state) => state.user.rememberMe
    },
    actions: {
      saveUser,
      addList,
      setCurrentList,
      loginUser,
      createUser
    }
  },
  components: {
    UsernameInput,
    KeyInput,
    ConfirmInput,
    RememberMe,
    ForgotPassword
  },
  computed: {
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
    create (username, key, rememberMe) {
      if (!this.isValid) return
      this.createUser(username, key, rememberMe)
      .then(() => {
        if (this.auth) {
          this.addList({...defaultList, owner: this.user.username, users: []})
          this.setCurrentList(defaultList)
          setTimeout(() => {
            this.$route.router.go('/app/list/' + defaultList.id)
          }, 250)
        }
      })
    }
  }
}

</script>