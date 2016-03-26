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
      user: ({ user }) => user.user,
      auth: ({ user }) => user.auth,
      darkmode: ({ user }) => user.user.darkmode,
      current: ({ task }) => task.current
    },
    actions: {
      getUserSession
    }
  },
  ready () {
    const listID = this.$route.params.listid
    this.getUserSession()
    .then(() => {
      console.log(listID)
      // Opt to route to the listid if provided
      if (this.auth && listID) return this.$route.router.go('/app/list/' + listID)
      if (this.auth) this.$route.router.go('/app/list/' + this.current.id)
    })
  }
}

</script>