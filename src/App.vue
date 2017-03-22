<template>
  <div id="app-container" :class="{'darkmode': darkmode}">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @import "./stylesheets/variables";

  #app-container {
    width: 100%;
    height: 100%;
    color: $black;
    transition: all 2s ease-out; 
    background: linear-gradient($nightDark, $nightLight, $orchid, $sunglow, $brightDark, $brightLight);
    background-position: bottom;
    background-size: auto 500%;
    text-align: center;
    font-family: $cardo;
    font-size: 1rem;
    @media screen and (min-width: $small) {
      font-size: 1.4rem;
    }
    #todo-line #create-todo {
      &:focus {
        border-color: $sunray;
      }
    }
    .table .table-row {
      &.active {
        background-color: $sunray;
      }
      &.active.complete {
        background-color: $rust;
      }
    }
    &.darkmode {
      background-position: top;
      color: $white;
      #todo-line #create-todo {
        &:focus {
          border-color: $astroTurf;
        }
      }
      .table .table-row {
        &.active {
          background-color: $astroTurf;
        }
        &.active.complete {
          background-color: $grassStain;
        }
      }
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
      if (this.current._id !== id) this.unmountList(this.current._id)
      this.$router.push(`/app/list/${id}${(newuser) ? '?newuser=' + newuser : ''}`)
    }
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
        // Opt to route to the listid if provided
        if (this.auth && listID && newUser) return this.navigateToList(listID, newUser)
        if (this.auth && listID) return this.navigateToList(listID)
        // Go to user's current list if no listid is provided in url
        if (this.auth) return this.navigateToList(this.current._id)
        // If no session found, route to login
        this.$router.push('/login')
      })
    })
  }
}
</script>