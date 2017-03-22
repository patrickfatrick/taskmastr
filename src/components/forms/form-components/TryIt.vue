<template>
  <span id="try-it">
    Or&nbsp;
    <button 
      id="try-it-button"
      title="Try it"
      type="button"
      @click="loginTestUser(testUser, testKey, false)"
    >
      Try it out
    </button>
  </span>
</template>

<style lang="scss" scoped>
  @import "../../../stylesheets/variables";

  #try-it {
    font-family: $raleway;
    font-size: 0.8rem;
    display: block;
    text-align: center;
    margin-top: 0.5rem;
    @media screen and (min-width: $medlarge) {
      display: inline-block;
      position: absolute;
      bottom: 2px;
      margin-left: 1rem;
      margin-top: 0;
    }
  }
  #try-it-button {
    text-transform: lowercase;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 100ms ease-out;
    &:hover,
    &:focus {
      color: $white;
      background-color: $deepBlue;
    }
    &:active {
      color: $white;
      background-color: $deepBlue * 0.8;
      transition: unset;
    }
  }
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    wiki: (state) => state.wiki,
    auth: (state) => state.auth,
    testUser: (state) => state.testUser,
    testKey: (state) => state.testKey,
    current: (state) => state.current
  }),
  methods: {
    ...mapActions([
      'loginUser'
    ]),
    loginTestUser (username, key, rememberMe) {
      this.loginUser({ username, key, rememberMe })
      .then(() => {
        if (this.auth) {
          setTimeout(() => {
            this.$router.push('/app/list/' + this.current._id)
          }, 250)
        }
      })
    }
  }
}
</script>