<template>
  <input class="check" type="checkbox" title="Toggle Darkmode" v-model="darkmode"></input>
  <button id="dark-mode" title="Toggle Night Mode" v-on:click.prevent="setDarkmode(!darkmode)">
    <i class="fa" v-bind:class="{'fa-sun-o': darkmode, 'fa-moon-o': !darkmode}"></i>
  </button>
</template>

<script>

import Mousetrap from 'mousetrap'
import store from '../../../store/store'

export default {
  computed: {
    darkmode () {
      return store.state.user.darkmode
    }
  },
  methods: {
    setDarkmode: store.actions.setDarkmode
  },
  compiled () {
    Mousetrap.bind('command+m', (e) => {
      if (e.preventDefault) e.preventDefault()
      this.setDarkmode(!this.darkmode)
    })
  }
}

</script>