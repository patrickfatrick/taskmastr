<template>
  <div id="remember">
    <input
      id="remember-me"
      class="check"
      name="remember-me"
      type="checkbox"
      tabindex="-1"
      :value="rememberMe"
      @change.prevent="setRememberMe(!rememberMe)"
    />
    <button
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

<style lang="scss" scoped>
  @import "bourbon";
  @import "neat";
  @import "../../../stylesheets/variables";
  @import "../../../stylesheets/mixins";

  #remember {
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
    rememberMe: (state) => state.rememberMe
  }),
  methods: mapActions([
    'setRememberMe'
  ])
}
</script>