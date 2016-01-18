<template>
  <div id="logout-container">
    <button id="logout" title="Log out" v-on:click.prevent="logout">
      <i id="power-off" class="fa fa-power-off"></i>
      <label for="power-off">Log out</label>
    </button>
  </div>
</template>

<script>

import Mousetrap from 'mousetrap'
import store from '../../store/store'

export default {
  methods: {
    logout: store.actions.logout
  },
  ready () {
    Mousetrap.bind('command+esc', (e) => {
      e.preventDefault()
      return this.logout()
    })
  }
}

</script>