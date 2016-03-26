<template>
  <div>
    <menu></menu>
    <router-view></router-view>
  </div>
</template>

<script>

import Tasks from './tasks/Tasks.vue'
import Menu from './menu/Menu.vue'

export default {
  vuex: {
    getters: {
      auth: (state) => state.user.auth
    }
  },
  components: {
    Menu,
    Tasks
  }
}

</script>