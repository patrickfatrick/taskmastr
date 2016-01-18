<template>
  <button id="try-it-button" class="button" title="Try it" v-on:click="loginUser(testUser, testKey, false, true)">Try it</button>
</template>

<script>

import store from '../../../store/store'

export default {
  data () {
    return {
      testUser: 'mrormrstestperson@taskmastr.co',
      testKey: 'S41iVAtINGREsIdUE-278'
    }
  },
  computed: {
    wiki () {
      return store.state.wiki
    },
    auth () {
      return store.state.auth
    }
  },
  methods: {
    loginUser (username, key, rememberMe, isValid) {
      store.actions.loginUser(username, key, rememberMe, isValid)
      .then(() => {
        if (this.auth) {
          setTimeout(() => {
            this.$route.router.go('/app')
          }, 750)
        }
      })
    }
  }
}

</script>