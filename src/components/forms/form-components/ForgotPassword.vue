<template>
  <div class="forgot-password">
    <input
      class="forgot-password__checkbox"
      name="forgot"
      type="checkbox"
      tabindex="-1"
      :value="forgot"
      @change.prevent="toggleForgot(!forgot)"
    />
    <button
      class="forgot-password__button"
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

<style lang="postcss" scoped>
  @import "../../../stylesheets/variables";
  
  .forgot-password {
    @apply --modalSmallText;

    margin-top: 1rem;

    @media (--medium) {
      margin-top: 0.5rem;
    }

    & .forgot-password__button {
      margin-right: 1rem;

      &:focus {
        color: var(--deepBlue);
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