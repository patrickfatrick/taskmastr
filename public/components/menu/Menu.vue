<template>
  <div id="menu" v-bind:class="{'toggled': menuToggled}">
    <div id="menu-tools">
      <div id="wiki-container">
        <a :href="wiki" target="_blank">
          <i class="fa fa-map-o"></i>
        </a>
      </div>
      <div id="repo-container">
        <a :href="repo" target="_blank">
          <i class="fa fa-github-alt"></i>
        </a>
      </div>
      <div id="darkmode-container">
        <darkmode></darkmode>
      </div>
    </div>
    <div id="list-headline">Lists</div>
    <list-input></list-input>
    <lists></lists>
    <logout></logout>
  </div>
</template>

<script>

import Darkmode from './menu-components/Darkmode.vue'
import ListInput from './menu-components/ListInput.vue'
import Lists from './menu-components/Lists.vue'
import Logout from '../misc/Logout.vue'

export default {
  vuex: {
    getters: {
      menuToggled: (state) => state.menuToggled,
      wiki: (state) => state.wiki,
      repo: (state) => state.repo
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