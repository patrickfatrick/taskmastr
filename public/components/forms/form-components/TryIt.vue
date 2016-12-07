<template>
  <span id="try-it">
    Or <button id="try-it-button" title="Try it" type="button" @click="loginTestUser(testUser, testKey, false)">Try it out</button>
  </span>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    wiki: (state) => state.wiki,
    auth: (state) => state.auth,
    testUser: (state) => state.testUser,
    testKey: (state) => state.testKey,
    current: (state) => state.current
  }),
  methods: {
    ...mapActions([
      'loginUser'
    ]),
    loginTestUser (username, key, rememberMe) {
      this.loginUser({ username, key, rememberMe })
      .then(() => {
        if (this.auth) {
          setTimeout(() => {
            this.$router.push('/app/list/' + this.current.id)
          }, 250)
        }
      })
    }
  }
}
</script>