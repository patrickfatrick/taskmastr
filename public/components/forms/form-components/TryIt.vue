<template>
  <button id="try-it-button" class="button" title="Try it" @click="loginTestUser(testUser, testKey, false)">Try it</button>
</template>

<script>

import { loginUser } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      wiki: (state) => state.wiki,
      auth: (state) => state.auth,
      testUser: (state) => state.testUser,
      testKey: (state) => state.testKey,
      current: (state) => state.current
    },
    actions: {
      loginUser
    }
  },
  computed: {},
  methods: {
    loginTestUser (username, key, rememberMe) {
      this.loginUser(username, key, rememberMe)
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