<template>
  <span class="try-it">
    Or&nbsp;
    <button 
      class="try-it__button"
      title="Try it"
      type="button"
      @click="loginTestUser(testUser, testKey, false)"
    >
      Try it out
    </button>
  </span>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.try-it {
  font-family: var(--raleway);
  font-size: 0.8rem;
  display: block;
  text-align: center;
  margin-top: 0.5rem;

  @media (--medLarge) {
    display: inline-block;
    position: absolute;
    bottom: 2px;
    margin-left: 1rem;
    margin-top: 0;
  }

  & .try-it__button {
    text-transform: lowercase;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 100ms ease-out;

    &:hover,
    &:focus {
      color: var(--white);
      background-color: var(--deepBlue);
    }

    &:active {
      color: var(--white);
      background-color: color(var(--deepBlue) shade(20%));
      transition: unset;
    }
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