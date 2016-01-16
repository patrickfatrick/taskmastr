<template>
  <div id="menu" v-bind:class="{'toggled': menuToggled}">
    <a href="{{wiki}}" target="_blank">
    <i id="wiki" class="fa fa-map-o"></i>
    </a>
    <darkmode></darkmode>
    <div id="list-headline">Lists</div>
    <list-input></list-input>
    <lists></lists>
    <logout></logout>
  </div>
</template>

<script>

import store from '../../store/store'
import Darkmode from './menu-components/Darkmode.vue'
import ListInput from './menu-components/ListInput.vue'
import Lists from './menu-components/Lists.vue'
import Logout from '../misc/Logout.vue'

export default {
  computed: {
    menuToggled () {
      return store.state.menuToggled
    },
    wiki () {
      return store.state.wiki
    }
  },
  components: {
    Darkmode,
    ListInput,
    Lists,
    Logout
  }
}

</script>