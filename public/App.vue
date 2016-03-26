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

import { getUserSession } from './store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      auth: (state) => state.auth,
      darkmode: (state) => state.user.darkmode,
      current: (state) => state.current
    },
    actions: {
      getUserSession
    }
  },
  ready () {
    const listID = this.$route.params.listid
    this.getUserSession()
    .then(() => {
      // Opt to route to the listid if provided
      if (this.auth && listID) return this.$route.router.go('/app/list/' + listID)
      if (this.auth) this.$route.router.go('/app/list/' + this.current.id)
    })
  }
}

</script>