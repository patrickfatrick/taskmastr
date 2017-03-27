<template>
  <div
    class="logout-container"
    :class="{'logout-container--menu-toggled': menuToggled}"
  >
    <button
      class="logout-container__logout"
      title="Log out"
      @click.prevent="logout"
    >
      <i
        class="logout-container__logout__power-off fa fa-power-off"
      />
      <label for="power-off">Log out</label>
    </button>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../stylesheets/variables";

.logout-container {
  position: fixed;
  bottom: 0;
  width: 250px;
  height: 5rem;
  padding: 1rem;
  background: var(--orchid);
  left: -250px;
  transition: all 200ms ease-out;

  &.logout-container--menu-toggled {
    left: 0;
  }

  & .logout-container__logout {
    margin-left: auto;
    margin-right: auto;
    font-size: 1rem;
    font-family: var(--josefin);
    padding: 2px 4px 2px 8px;
    width: 100px;
    cursor: pointer;
    text-transform: lowercase;
    height: 2.5rem;
    border-radius: 20px;
    background-color: var(--sunsetOrange);
    color: $white;
    border: 1px solid #bdbdbd;

    &:hover {
      background: linear-gradient(color(var(--sunsetOrange) shade(10%)), var(--sunsetOrange));
    }

    &:active {
      background: color(var(--sunsetOrange) shade(10%));
    }

    & .logout-container__logout__power-off {
      margin-right: 1rem;
    }

    & label {
      cursor: pointer;
    }
  }
}
</style>

<script>
import Mousetrap from 'mousetrap'
import { mapActions } from 'vuex'

export default {
  props: {
    menuToggled: Boolean
  },
  methods: {
    ...mapActions([
      'logoutUser'
    ]),
    logout () {
      this.logoutUser()
    }
  },
  mounted () {
    Mousetrap.bind('command+esc', (e) => {
      if (e.preventDefault) e.preventDefault()
      return this.logout()
    })
  }
}
</script>