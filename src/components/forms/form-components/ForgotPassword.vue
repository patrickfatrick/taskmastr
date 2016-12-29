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
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    forgot: (state) => state.forgot,
    create: (state) => state.create
  }),
  methods: {
    ...mapActions([
      'setForgot'
    ]),
    toggleForgot (bool) {
      this.setForgot(bool)
      if (!this.forgot && this.create) return this.$router.push('/create')
      if (!this.forgot) return this.$router.push('/login')
      this.$router.push('/forgot')
    }
  }
}
</script>