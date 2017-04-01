<template>
  <div class="prompt-line--reset-confirm-line">
    <input
      class="prompt-line__prompt"
      type="password"
      name="resetConfirm"
      placeholder="Confirm Password"
      :value="user.resetConfirmKey"
      @input="setResetConfirmKey($event.target.value)"
      :class="{'prompt-line__prompt--invalid': resetAttempt && (!match || resetFail)}"
    />
  </div>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.prompt-line {
  @apply --promptLine;
}

.prompt-line--reset-confirm-line {
  @apply --promptLine;

  @media (--medium) {
    lost-column: 8/12;
    lost-offset: 2/12;
  }
}
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    user: (state) => state.user,
    resetAttempt: (state) => state.resetAttempt,
    resetFail: (state) => state.resetFail
  }),
  props: {
    match: Boolean
  },
  methods: mapActions([
    'setResetConfirmKey'
  ])
}
</script>