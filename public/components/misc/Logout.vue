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