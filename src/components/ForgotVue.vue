<template>
  <div>
    <transition name="mask">
      <div
        class="mask"
        v-if="!auth && init"
      />
    </transition>
    <transition name="modal">
      <div
        class="modal"
        v-if="!user.tasks.length && init"
      >
        <div class="modal-header">
          <h1 id="headline">Taskmastr</h1>
        </div>
        <div
          id="key-ask"
          class="modal-body"
        >
          <div
            class="greeting"
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

<style lang="scss" scoped>
  @import "../stylesheets/mixins";

  .modal {
    @include modal;
  }

  .mask {
    @include mask;
  }
</style>

<script>
import { mapState, mapActions } from 'vuex'
import ForgotForm from './forms/ForgotForm.vue'

export default {
  computed: mapState({
    user: (state) => state.user,
    init: (state) => state.init,
    auth: (state) => state.auth,
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
