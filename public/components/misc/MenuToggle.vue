<template>
  <div id="icon-menu" v-bind:class="{'toggled': menuToggled}">
    <button title="Toggle menu" v-on:click.prevent="setMenuToggled(!menuToggled)">
      <i class="fa" v-bind:class="{'fa-bars': !menuToggled, 'fa-times': menuToggled}"></i>
    </button>
  </div>
</template>

<script>

import Mousetrap from 'mousetrap'
import store from '../../store/store'

export default {
  computed: {
    menuToggled () {
      return store.state.menuToggled
    }
  },
  methods: {
    setMenuToggled: store.actions.setMenuToggled
  },
  ready () {
    Mousetrap.bind('alt+right', () => {
      return this.setMenuToggled(true)
    })
    Mousetrap.bind('alt+left', () => {
      return this.setMenuToggled(false)
    })
  }
}

</script>