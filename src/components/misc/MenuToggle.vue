<template>
  <div
    class="icon-menu"
    :class="{'icon-menu--toggled': menuToggled}"
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

<style lang="postcss" scoped>
@import "../../stylesheets/variables";

.icon-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 2.2rem;
  padding: 10px 0 12px;
  border-radius: 0 0 10px;
  height: auto;
  background: var(--orchid);
  z-index: 4;
  color: var(--white);
  transition: all 200ms ease-out;

  @media (--medium) {
    padding: 20px 0 22px;
    width: 3rem;
    border-radius: 0 0 20px;
  }

  &.icon-menu--toggled {
    margin-left: 250px;

    @media (--medLarge) {
      left: 0;
    }
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