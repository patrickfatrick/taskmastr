<template>
  <button id="save-button" class="button" title="Save" v-if="saveButton" transition="save" @click.prevent="save">Save</button>
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
    saveUser: store.actions.saveUser,
    save () {
      this.saveUser()
    }
  },
  compiled () {
    Mousetrap.bind('command+s', (e) => {
      if (e.preventDefault) e.preventDefault()
      if (!this.saveButton) return
      return this.save()
    })
  }
}

</script>