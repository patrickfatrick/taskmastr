<template>
  <div
    class="warning-banner"
    v-if="username === 'do-not-reply@taskmastr.org' || disconnect"
  >
    <div
      class="warning-banner__message warning-banner__message--try-it"
      v-if="username === 'do-not-reply@taskmastr.org'"
    >
      FYI: You're currently logged into the Try It account, and changes will not be saved.
    </div>
    <div
      class="warning-banner__message warning-banner__message--disconnect"
      v-if="disconnect && (username !== 'do-not-reply@taskmastr.org')"
    >
      Socket connection broken.&nbsp;
      <button
        class="warning-banner__refresh"
        @click="refresh()"
      >
        Refresh now
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../stylesheets/variables";

.warning-banner {
  width: 100%;
  min-height: 3rem;
  padding: 1rem;
  position: fixed;
  font-size: 1rem;
  background-color: var(--sunsetOrange);
  color: var(--white);
  z-index: 3;

  @media (--medium) {
    top: 0;
    bottom: auto;
  }

  & .warning-banner__refresh {
    text-transform: lowercase;
    background-color: color(var(--sunsetOrange) shade(20%));
    padding: 0.3rem;
    border-radius: 4px;
    border: 1px solid color(var(--sunsetOrange) shade(40%));

    &:active {
      background-color: color(var(--sunsetOrange) shade(40%));
      color: color(var(--white) shade(20%));
    }
  }
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    username: (state) => state.user.username,
    disconnect: (state) => state.disconnect
  }),
  methods: {
    refresh () {
      window.location.assign('/')
    }
  }
}
</script>