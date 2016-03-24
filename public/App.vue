<template>
  <div id="app-container" v-bind:class="{'darkmode': darkmode}">
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>

import store from './store/store'

export default {
  computed: {
    darkmode () {
      return store.state.user.darkmode
    },
    auth () {
      return store.state.auth
    },
    user () {
      return store.state.user
    },
    current () {
      return store.state.current
    }
  },
  ready () {
    store.actions.getSession()
    .then(() => {
      if (this.auth) this.$route.router.go('/app/list/' + this.current.id)
    })
  }
}

</script>