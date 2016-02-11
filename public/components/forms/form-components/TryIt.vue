<template>
  <button id="try-it-button" class="button" title="Try it" @click="loginTestUser(testUser, testKey, false)">Try it</button>
</template>

<script>

import store from '../../../store/store'

export default {
  computed: {
    wiki () {
      return store.state.wiki
    },
    auth () {
      return store.state.auth
    },
    testUser () {
      return store.state.testUser
    },
    testKey () {
      return store.state.testKey
    }
  },
  methods: {
    loginUser: store.actions.loginUser,
    loginTestUser (username, key, rememberMe) {
      this.loginUser(username, key, rememberMe)
      .then(() => {
        if (this.auth) {
          setTimeout(() => {
            this.$route.router.go('/app')
          }, 250)
        }
      })
    }
  }
}

</script>