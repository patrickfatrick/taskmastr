<template>
  <div id="forgot-password">
    <input id="forgot" class="check" name="forgot" type="checkbox" tabindex="-1" :value="forgot"></input>
    <button title="Forgot Password" type="button" @click.prevent="toggleForgot(!forgot)">
      <i class="fa" :class="{'fa-check-square-o': forgot, 'fa-square-o': !forgot}"></i>
    </button>
    <label for="forgot">Forgot your password?</label>
  </div>
</template>

<script>

import { setForgot } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      forgot: (state) => state.forgot,
      create: (state) => state.create
    },
    actions: {
      setForgot
    }
  },
  computed: {},
  methods: {
    toggleForgot (bool) {
      this.setForgot(bool)
      if (!this.forgot && this.create) return this.$route.router.go('/create')
      if (!this.forgot) return this.$route.router.go('/login')
      this.$route.router.go('/forgot')
    }
  }
}

</script>