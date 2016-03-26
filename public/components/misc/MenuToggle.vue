<template>
  <div id="icon-menu" :class="{'toggled': menuToggled}">
    <button title="Toggle menu" @click.prevent="setMenuToggled(!menuToggled)">
      <i class="fa" :class="{'fa-bars': !menuToggled, 'fa-times': menuToggled}"></i>
    </button>
  </div>
</template>

<script>

import Mousetrap from 'mousetrap'
import { setMenuToggled } from '../../store/list-store/list-actions'

export default {
  vuex: {
    getters: {
      menuToggled: (state) => state.menuToggled
    },
    actions: {
      setMenuToggled
    }
  },
  compiled () {
    Mousetrap.bind('alt+right', () => {
      this.setMenuToggled(true)
    })
    Mousetrap.bind('alt+left', () => {
      this.setMenuToggled(false)
    })
  }
}

</script>