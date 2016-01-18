<template>
  <button id="save-button" class="button" title="Save" v-if="saveButton" transition="save" v-on:click.prevent="save">Save</button>
</template>

<script>

import Mousetrap from 'mousetrap'
import store from '../../store/store'

export default {
  computed: {
    saveButton () {
      return store.state.saveButton
    }
  },
  methods: {
    save: store.actions.save
  },
  ready () {
    Mousetrap.bind('command+s', (e) => {
      e.preventDefault()
      if (!this.saveButton) return
      return this.save()
    })
  }
}

</script>