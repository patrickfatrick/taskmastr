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