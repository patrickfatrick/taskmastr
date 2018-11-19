<template>
  <div
    id="app-container"
    :class="{'app-container--darkmode': darkmode}"
  >
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<style lang="postcss" scoped>
@import "./stylesheets/variables";

#app-container {
  width: 100%;
  height: 100%;
  color: var(--black);
  transition: all 2s ease-out;
  background: linear-gradient(var(--nightDark), var(--nightLight), var(--orchid), var(--sunglow), var(--brightDark), var(--brightLight));
  background-position: bottom;
  background-size: auto 500%;
  text-align: center;
  font-family: var(--cardo);
  font-size: 1rem;

  &.app-container--darkmode {
    background-position: top;
    color: var(--white);
  }

  @media (--small) {
    font-size: 1.4rem;
  }
}
</style>

<script>
import _ from 'lodash'
import socket from './socket'
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    user: (state) => state.user,
    authenticated: (state) => state.authenticated,
    darkmode: (state) => state.user.darkmode,
    current: (state) => state.current,
    currentList: (state) => state.currentList
  }),
  methods: {
    ...mapActions([
      'getUserSession',
      'setDarkmode',
      'setTasks',
      'deleteList',
      'mountList',
      'unmountList',
      'setDisconnect',
      'setUsers',
      'confirmListUser'
    ]),
    navigateToList (id, newuser) {
      if (this.current._id !== id) this.unmountList(this.current._id)
      this.$router.push(`/app/list/${id}${(newuser) ? '?newuser=' + newuser : ''}`)
    },
    routeWatcher () {
      if (this.$route.query.newuser) {
        this.confirmListUser({
          listid: this.$route.params.listid,
          username: this.$route.query.newuser.toLowerCase()
        })
        this.$router.push('/app/list/' + this.$route.params.listid)
      }
      if (this.$route.params.listid) this.mountList(this.$route.params.listid)
    }
  },
  watch: {
    '$route': 'routeWatcher'
  },
  mounted () {
    this.$nextTick(() => {
      // Socket events
      socket.on('updated', (data) => {
        const currentID = _.find(data.tasks, { current: true })._id
        this.setTasks(data.tasks)
        if (this.user.darkmode !== data.darkmode) this.setDarkmode(data.darkmode)
        if (this.current._id !== currentID) this.navigateToList(currentID)
      })
      socket.on('list-deleted', (data) => {
        const listIndex = _.findIndex(this.user.tasks, { _id: data.listid })
        if ((data.username.trim() === this.user.username.trim() && listIndex !== -1) || data.permanent) {
          this.deleteList({
            index: listIndex,
            delay: 0,
            perm: false,
            cb: (id) => {
              this.navigateToList(id)
            }
          })
        }
      })
      socket.on('disconnect', () => {
        this.setDisconnect(true)
      })
      socket.on('users-change', (data) => {
        const listIndex = _.findIndex(this.user.tasks, { _id: data.list._id })
        const userIndex = data.list.users.indexOf(this.user.username)
        if (userIndex === -1 && data.list.owner.trim() !== this.user.username.trim() && listIndex !== -1 && data.removed) {
          this.deleteList({
            index: listIndex,
            delay: 0,
            perm: false,
            cb: (id) => {
              this.navigateToList(id)
            }
          })
        }

        if (listIndex !== -1) this.setUsers({ index: listIndex, users: data.list.users })
      })

      // Get session and reroute
      const listID = this.$route.params.listid
      const newUser = this.$route.query.newuser
      this.getUserSession()
        .then(() => {
          // Set up the route watcher
          this.routeWatcher()

          // Opt to route to the listid if provided
          if (this.authenticated && listID && newUser) return this.navigateToList(listID, newUser)
          if (this.authenticated && listID) return this.navigateToList(listID)

          // Go to user's current list if no listid is provided in url
          if (this.authenticated) return this.navigateToList(this.current._id)

          // If no session found, route to login
          // this.$router.push('/login')
        })
    })
  }
}
</script>