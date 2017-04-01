<template>
  <div>
    <transition name="mask">
      <div
        class="mask"
        v-if="!authenticated && initialized"
      />
    </transition>
    <transition name="modal">
      <div
        class="modal"
        v-if="!user.tasks.length && initialized"
      >
        <div class="modal__header">
          <h1 class="modal__header__headline">Taskmastr</h1>
        </div>
        <div class="modal__body">
          <div
            class="modal__body__greeting"
            v-if="!reset"
          >
            <p>Forgot your password?</p>
            <p>Fill in your email address and we'll send you a reset link.</p>
          </div>
          <forgot-form></forgot-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="postcss" scoped>
  @import "../stylesheets/variables";

  .modal {
    @apply --modal;
  }

  .mask {
    @apply --mask;
  }
</style>

<script>
import { mapState, mapActions } from 'vuex'
import ForgotForm from './forms/ForgotForm.vue'

export default {
  computed: mapState({
    user: (state) => state.user,
    initialized: (state) => state.initialized,
    authenticated: (state) => state.authenticated,
    reset: (state) => state.reset,
    forgot: (state) => state.forgot
  }),
  components: {
    ForgotForm
  },
  methods: mapActions([
    'setForgot'
  ]),
  mounted () {
    if (this.$route.path === '/forgot' && !this.forgot) return this.setForgot(true)
  }
}
</script>
