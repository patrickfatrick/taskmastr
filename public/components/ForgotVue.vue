<template>
  <div>
    <transition name="mask">
      <div class="mask" v-if="!auth && init"></div>
    </transition>
    <transition name="modal">
      <div id="key-modal" class="modal" v-if="!user.tasks.length && init">
        <div class="modal-header">
          <h1 id="headline">Taskmastr</h1>
        </div>
        <div id="key-ask" class="modal-body">
          <div class="greeting" v-if="!reset">
            <p>Forgot your password?</p>
            <p>Fill in your email address and we'll send you a reset link.</p>
          </div>
          <forgot-form></forgot-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import { setForgot } from '../store/user-store/user-actions'
import ForgotForm from './forms/ForgotForm.vue'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      init: (state) => state.init,
      auth: (state) => state.auth,
      reset: (state) => state.reset,
      forgot: (state) => state.forgot
    },
    actions: {
      setForgot
    }
  },
  computed: {}, // Explicitly create computed property for test mocking
  components: {
    ForgotForm
  },
  mounted () {
    if (this.$route.path === '/forgot' && !this.forgot) return this.setForgot(true)
  }
}

</script>