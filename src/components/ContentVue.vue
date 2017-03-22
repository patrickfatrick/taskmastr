<template>
  <div
    id="content-vue"
    :class="$style.contentVue"
  >
    <menu-widget></menu-widget>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss" module>
  .contentVue {
    width: 100%;
    height: 100%;
  }
</style>

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
