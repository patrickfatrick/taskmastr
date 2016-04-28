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

import _ from 'lodash'
import socket from './socket'
import { getUserSession, setDarkmode, setTasks, setDisconnect } from './store/user-store/user-actions'
import { unmountList } from './store/list-store/list-actions'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      auth: (state) => state.auth,
      darkmode: (state) => state.user.darkmode,
      current: (state) => state.current
    },
    actions: {
      getUserSession,
      setDarkmode,
      setTasks,
      unmountList,
      setDisconnect
    }
  },
  methods: {
    navigateToList (id) {
      if (this.current.id !== id) this.unmountList(this.current.id)
      this.$route.router.go('/app/list/' + id)
    }
  },
  ready () {
    socket.on('updated', (data) => {
      const currentID = _.find(data.tasks, { current: true }).id
      this.setTasks(data.tasks)
      if (this.user.darkmode !== data.darkmode) this.setDarkmode(data.darkmode)
      if (this.current.id !== currentID) this.navigateToList(currentID)
    })
    socket.on('deleted', (data) => {
      const currentID = _.find(data.tasks, { current: true }).id
      if (this.current.id !== currentID) this.navigateToList(currentID)
    })
    socket.on('disconnect', () => {
      this.setDisconnect(true)
    })
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