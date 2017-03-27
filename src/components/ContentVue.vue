<template>
  <div class="content">
    <menu-widget></menu-widget>
    <warning-banner></warning-banner>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="postcss" scoped>
  @import "../stylesheets/variables";

  .content {
    @apply --fill;

    height: 100%;
    transition: margin-left 200ms ease-out;

    &.menued {
      @media (--medLarge) {
        margin-left: 250px;
      }
    }
  }
</style>

<script>
import { mapState } from 'vuex'
import Tasks from './tasks/Tasks.vue'
import MenuWidget from './menu/Menu.vue'
import WarningBanner from './misc/WarningBanner.vue'

export default {
  computed: mapState({
    auth: (state) => state.auth
  }),
  components: {
    MenuWidget,
    Tasks,
    WarningBanner
  }
}
</script>
