<template>
  <div
    id="warning-banner"
    v-if="username === 'mrormrstestperson@taskmastr.co' || disconnect"
  >
    <div
      v-if="username === 'mrormrstestperson@taskmastr.co'">
      FYI: You're currently logged into the Try It account, and changes will not be saved.
    </div>
    <div
      v-if="disconnect && (username !== 'mrormrstestperson@taskmastr.co')"
    >
      Socket connection broken.&nbsp;
      <button @click="refresh()">Refresh now</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../stylesheets/variables";

  #warning-banner {
    width: 100%;
    min-height: 3rem;
    padding: 1rem;
    position: fixed;
    font-size: 1rem;
    background-color: $sunsetOrange;
    color: $white;
    z-index: 3;
    @media screen and (max-width: $medium) {
      bottom: 0;
    }
    @media screen and (min-width: $medium) {
      top: 0;
    }
    button {
      text-transform: lowercase;
      background-color: $sunsetOrange * 0.8;
      padding: 0.3rem;
      border-radius: 4px;
      border: 1px solid $sunsetOrange * 0.6;
      &:active {
        background-color: $sunsetOrange * 0.6;
        color: $white * 0.8;
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