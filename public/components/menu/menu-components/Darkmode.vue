<template>
  <input class="check" type="checkbox" title="Toggle Darkmode" v-model="darkmode"></input>
  <button id="dark-mode" title="Toggle Night Mode" v-on:click.prevent="setDarkmode(!darkmode)">
    <i class="fa" v-bind:class="{'fa-sun-o': darkmode, 'fa-moon-o': !darkmode}"></i>
  </button>
</template>

<script>

import Mousetrap from 'mousetrap'
import { setDarkmode } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      darkmode: (state) => state.user.darkmode
    },
    actions: {
      setDarkmode
    }
  },
  compiled () {
    Mousetrap.bind('command+m', (e) => {
      if (e.preventDefault) e.preventDefault()
      this.setDarkmode(!this.darkmode)
    })
  }
}

</script>