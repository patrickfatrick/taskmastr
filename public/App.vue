<template>
  <div id="app-container" :class="{'darkmode': darkmode}">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import _ from 'lodash'
import socket from './socket'
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    user: (state) => state.user,
    auth: (state) => state.auth,
    darkmode: (state) => state.user.darkmode,
    current: (state) => state.current
  }),
  methods: {
    ...mapActions([
      'getUserSession',
      'setDarkmode',
      'setTasks',
      'deleteList',
      'unmountList',
      'setDisconnect',
      'setUsers'
    ]),
    navigateToList (id, newuser) {
      if (this.current.id !== id) this.unmountList(this.current.id)
      this.$router.push(`/app/list/${id}${(newuser) ? '/newuser/' + newuser : ''}`)
    }
  },
  mounted () {
    this.$nextTick(() => {
      // Socket events
      socket.on('updated', (data) => {
        const currentID = _.find(data.tasks, { current: true }).id
        this.setTasks(data.tasks)
        if (this.user.darkmode !== data.darkmode) this.setDarkmode(data.darkmode)
        if (this.current.id !== currentID) this.navigateToList(currentID)
      })
      socket.on('list-deleted', (data) => {
        const listIndex = _.findIndex(this.user.tasks, { id: data.listid })
        if ((data.username.trim() === this.user.username.trim() && listIndex !== -1) || data.permanent) {
          this.deleteList(listIndex, 0, false, (id) => {
            this.navigateToList(id)
          })
        }
      })
      socket.on('disconnect', () => {
        this.setDisconnect(true)
      })
      socket.on('users-change', (data) => {
        const listIndex = _.findIndex(this.user.tasks, { id: data.list.id })
        const userIndex = data.list.users.indexOf(this.user.username)
        if (userIndex === -1 && data.list.owner.trim() !== this.user.username.trim() && listIndex !== -1 && data.removed) {
          this.deleteList(listIndex, 0, false, (id) => {
            this.navigateToList(id)
          })
        }
        if (listIndex !== -1) this.setUsers(listIndex, data.list.users)
      })

      // Get session and reroute
      const listID = this.$route.params.listid
      const newUser = this.$route.params.newuser
      this.getUserSession()
      .then(() => {
        // Opt to route to the listid if provided
        if (this.auth && listID && newUser) return this.navigateToList(listID, newUser)
        if (this.auth && listID) return this.navigateToList(listID)
        if (this.auth) this.navigateToList(this.current.id)
      })
    })
  }
}
</script>