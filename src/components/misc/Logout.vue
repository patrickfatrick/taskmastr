<template>
  <div id="logout-container">
    <button id="logout" title="Log out" @click.prevent="logout">
      <i id="power-off" class="fa fa-power-off"></i>
      <label for="power-off">Log out</label>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../stylesheets/variables";

  #logout-container {
    position: fixed;
    bottom: 0;
    width: 250px;
    height: 5rem;
    padding: 1rem;
    background: $orchid;
    left: -250px;
    transition: all 200ms ease-out;
  }
  #logout {
    margin-left: auto;
    margin-right: auto;
    font-size: 1rem;
    font-family: $josefin;
    padding: 2px 4px 2px 8px;
    width: 100px;
    cursor: pointer;
    text-transform: lowercase;
    height: 2.5rem;
    border-radius: 20px;
    background-color: $sunsetOrange;
    color: $white;
    border: 1px solid #bdbdbd;
    &:hover {
      background: linear-gradient(($sunsetOrange * 0.9), $sunsetOrange);
    }
    &:active {
      background: $sunsetOrange * 0.9;
    }
    i {
      margin-right: 1rem;
    }
    label {
      cursor: pointer;
    }
  }
</style>

<script>
import Mousetrap from 'mousetrap'
import { mapActions } from 'vuex'

export default {
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