<template>
  <div
    id="icon-menu"
    :class="{'toggled': menuToggled}"
  >
    <button 
      title="Toggle menu"
      @click.prevent="setMenuToggled(!menuToggled)"
    >
      <i
        class="fa"
        :class="{'fa-bars': !menuToggled, 'fa-times': menuToggled}"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../stylesheets/variables";

  #icon-menu {
    position: fixed;
    left: 0;
    top: 5rem;
    width: 2.2rem;
    padding: 10px 0 12px 0;
    border-radius: 0 10px 10px 0;
    height: auto;
    background: $orchid;
    z-index: 10000;
    color: $white;
    transition: all 200ms ease-out;
    @media screen and (min-width: $medium) {
      padding: 20px 0 22px 0;
      width: 3rem;
      border-radius: 0 20px 20px 0;
    }
    @media screen and (min-width: $medlarge) {
      top: 6.2rem;
    }
  }

  #icon-menu.toggled {
    margin-left: 250px;
    @media screen and (min-width: $medlarge) {
      left: 0;
    }
  }
</style>

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