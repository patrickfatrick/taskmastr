<template>
  <div id="icon-menu" :class="{'toggled': menuToggled}">
    <button title="Toggle menu" @click.prevent="setMenuToggled(!menuToggled)">
      <i class="fa" :class="{'fa-bars': !menuToggled, 'fa-times': menuToggled}"></i>
    </button>
  </div>
</template>

<script>
import Mousetrap from 'mousetrap'
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    menuToggled: (state) => state.menuToggled
  }),
  methods: mapActions([
    'setMenuToggled'
  ]),
  mounted () {
    Mousetrap.bind('alt+right', () => {
      this.setMenuToggled(true)
    })
    Mousetrap.bind('alt+left', () => {
      this.setMenuToggled(false)
    })
  }
}
</script>