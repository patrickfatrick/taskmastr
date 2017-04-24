<template>
  <div class="remember-me">
    <input
      id="remember-me"
      class="remember-me__checkbox"
      name="remember-me"
      type="checkbox"
      tabindex="-1"
      :value="rememberMe"
      @change.prevent="setRememberMe(!rememberMe)"
    />
    <button
      class="remember-me__button"
      title="Remember Me"
      type="button"
      @click.prevent="setRememberMe(!rememberMe)"
    >
      <i
        class="fa"
        :class="{'fa-check-square-o': rememberMe, 'fa-square-o':!rememberMe}"
      />
    </button>
    <label for="remember-me">Remember me</label>
  </div>
</template>

<style lang="postcss" scoped>
  @import "../../../stylesheets/variables";

  .remember-me {
    @apply --modalSmallText;

    margin-top: 1rem;

    @media (--medium) {
      margin-top: 0.5rem;
    }

    & .remember-me__button {
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
    rememberMe: (state) => state.rememberMe
  }),
  methods: mapActions([
    'setRememberMe'
  ])
}
</script>