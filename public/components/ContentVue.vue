<template>
  <div>
    <menu></menu>
    <router-view></router-view>
  </div>
</template>

<script>

import store from '../store/store'
import Tasks from './tasks/Tasks.vue'
import Menu from './menu/Menu.vue'

export default {
  computed: {
    auth () {
      return store.state.auth
    }
  },
  components: {
    Menu,
    Tasks
  }
}

</script>