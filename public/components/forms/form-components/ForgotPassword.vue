<template>
  <div id="forgot-password">
    <input id="forgot" class="check" name="forgot" type="checkbox" v-model="forgot"></input>
    <i class="fa" v-bind:class="{'fa-check-square-o': forgot, 'fa-square-o': !forgot}" v-on:click="toggleCheckbox('forgot')"></i>
    <label for="forgot">Forgot your password?</label>
  </div>
</template>

<script>

import store from '../../../store/store'

export default {
  computed: {
    forgot () {
      return store.state.forgot
    },
    create () {
      return store.state.create
    }
  },
  methods: {
    toggleCheckbox (forgot) {
      store.actions.toggleCheckbox(forgot)
      if (!this.forgot && this.create) return this.$route.router.go('/create')
      if (!this.forgot) return this.$route.router.go('/login')
      return this.$route.router.go('/forgot')
    }
  }
}

</script>