<template>
  <div id="content">
    <div id="warning-banner" v-if="user.username === 'mrormrstestperson@taskmastr.co' || disconnect">
      <div v-if="user.username === 'mrormrstestperson@taskmastr.co'">FYI: You're currently logged into the Try It account, and changes will not be saved.</div>
      <div v-if="disconnect && (user.username !== 'mrormrstestperson@taskmastr.co')">
        Socket connection broken. <button @click="refresh()">Refresh now</button>
      </div>
    </div>
    <div class="container">
      <div class="prompt-container">
        <div id="todo-prompt">What needs doing?</div>
        <task-input></task-input>
      </div>
      <menu-toggle></menu-toggle>
      <items></items>
      <div id="no-list" v-if="user.key || !current.items">
        <i id="loading" class="fa fa-cog fa-spin"></i>
        <div id="invalid-list" v-if="invalidList">{{ invalidList }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MenuToggle from '../misc/MenuToggle.vue'
import TaskInput from './task-components/TaskInput.vue'
import Items from './task-components/ItemsAlt.vue'

export default {
  computed: mapState({
    user: (state) => state.user,
    current: (state) => state.current,
    invalidList: (state) => state.invalidList,
    disconnect: (state) => state.disconnect
  }),
  components: {
    MenuToggle,
    TaskInput,
    Items
  },
  methods: {
    ...mapActions([
      'mountList',
      'confirmListUser'
    ]),
    refresh () {
      window.location.assign('/')
    },
    routeWatcher () {
      if (this.$route.params.newuser) {
        this.confirmListUser({ listid: this.$route.params.listid, username: this.$route.params.newuser.toLowerCase() })
        this.$router.push('/app/list/' + this.$route.params.listid)
      }
      this.mountList(this.$route.params.listid)
    }
  },
  watch: {
    '$route': 'routeWatcher'
  },
  mounted () {
    // Wait until we actually have access to the username, otherwise this will throw an error in user-service
    this.$nextTick(() => {
      this.routeWatcher()
    })
  }
}
</script>
