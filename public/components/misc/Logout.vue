<template>
  <div id="logout-container">
    <button id="logout" title="Log out" @click.prevent="logout">
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
    logoutUser: store.actions.logoutUser,
    logout () {
      this.logoutUser()
    }
  },
  compiled () {
    Mousetrap.bind('command+esc', (e) => {
      if (e.preventDefault) e.preventDefault()
      return this.logout()
    })
  }
}

</script>