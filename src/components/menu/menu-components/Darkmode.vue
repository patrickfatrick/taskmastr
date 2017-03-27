<template>
  <div>
    <input
      type="checkbox"
      title="Toggle Darkmode"
      :value="darkmode"
    />
    <button
      class="dark-mode"
      title="Toggle Night Mode"
      @click.prevent="setDarkmode(!darkmode)"
    >
      <i
        class="fa"
        :class="{'fa-sun-o': darkmode, 'fa-moon-o': !darkmode}"
      />
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