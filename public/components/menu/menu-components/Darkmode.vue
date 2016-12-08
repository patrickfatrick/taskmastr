<template>
  <div>
    <input class="check" type="checkbox" title="Toggle Darkmode" v-model="darkmode"></input>
    <button id="dark-mode" title="Toggle Night Mode" v-on:click.prevent="setDarkmode(!darkmode)">
      <i class="fa" v-bind:class="{'fa-sun-o': darkmode, 'fa-moon-o': !darkmode}"></i>
    </button>
  </div>
</template>

<script>
import Mousetrap from 'mousetrap'
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    darkmode: (state) => state.user.darkmode
  }),
  methods: mapActions([
    'setDarkmode'
  ]),
  mounted () {
    Mousetrap.bind('command+m', (e) => {
      if (e.preventDefault) e.preventDefault()
      this.setDarkmode(!this.darkmode)
    })
  }
}
</script>