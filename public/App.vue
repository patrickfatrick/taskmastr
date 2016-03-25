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
    const listID = this.$route.params.listid
    store.actions.getSession()
    .then(() => {
      console.log(listID)
      // Opt to route to the listid if provided
      if (this.auth && listID) return this.$route.router.go('/app/list/' + listID)
      if (this.auth) this.$route.router.go('/app/list/' + this.current.id)
    })
  }
}

</script>