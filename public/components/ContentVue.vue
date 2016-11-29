<template>
  <div>
    <menu-widget></menu-widget>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tasks from './tasks/Tasks.vue'
import MenuWidget from './menu/Menu.vue'

export default {
  computed: mapState({
    auth: (state) => state.auth
  }),
  components: {
    MenuWidget,
    Tasks
  }
}
</script>
