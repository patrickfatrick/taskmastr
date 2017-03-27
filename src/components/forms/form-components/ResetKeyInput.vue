<template>
  <div>
    <div class="error-text">
      <span
        class="error-text__message"
        v-show="resetAttempt && !required"
      >
        Password required
      </span>
      <span
        class="error-text__message"
        v-show="resetAttempt && required && !match"
      >
        Passwords don't match
      </span>
      <span
        class="error-text__message"
        v-show="resetAttempt && resetFail"
      >
        {{resetFail}}
      </span>
      <span
        class="error-text__message"
        v-show="!token"
      >
        This doesn't appear to be a valid reset link. Please try again.
      </span>
    </div>
    <div class="prompt-line--reset-key-line">
      <input
        class="prompt-line__prompt"
        type="password"
        name="resetKey"
        placeholder="Password"
        :value="user.resetKey"
        @input="setResetKey($event.target.value)"
        :class="{'prompt-line__prompt--invalid': resetAttempt && (!required || resetFail)}"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.error-text {
  @apply --modalSmallText;
}

.prompt-line--reset-key-line {
  @apply --promptLine;
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
    required: Boolean,
    match: Boolean,
    token: Boolean
  },
  methods: mapActions([
    'setResetKey'
  ])
}
</script>