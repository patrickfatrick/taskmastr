<template>
  <div id="forgot-password">
    <input id="forgot" class="check" name="forgot" type="checkbox" :value="forgot"></input>
    <i class="fa" :class="{'fa-check-square-o': forgot, 'fa-square-o': !forgot}" @click="toggleForgot(!forgot)"></i>
    <label for="forgot">Forgot your password?</label>
  </div>
</template>

<script>

import { setForgot } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      forgot: (state) => state.user.forgot,
      create: (state) => state.user.create
    },
    actions: {
      setForgot
    }
  },
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