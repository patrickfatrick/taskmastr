<template>
  <div id="forgot-password">
    <input
      id="forgot"
      class="check"
      name="forgot"
      type="checkbox"
      tabindex="-1"
      :value="forgot"
      @change.prevent="toggleForgot(!forgot)"
    />
    <button
      title="Forgot Password"
      type="button"
      @click.prevent="toggleForgot(!forgot)"
    >
      <i
        class="fa"
        :class="{'fa-check-square-o': forgot, 'fa-square-o': !forgot}"
      />
    </button>
    <label for="forgot">Forgot your password?</label>
  </div>
</template>

<style lang="scss" scoped>
  @import "bourbon";
  @import "neat";
  @import "../../../stylesheets/variables";
  @import "../../../stylesheets/mixins";
  
  #forgot-password {
    @include modal-small-text;
    margin-top: 1rem;
    @media screen and (min-width: $medium) {
      margin-top: 0.5rem;
    }
    button {
      margin-right: 1rem;
      &:focus {
        color: $deepBlue;
      }
    }
  }
</style>

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