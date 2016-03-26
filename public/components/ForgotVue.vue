<template>
  <div>
    <div class="mask" v-if="!auth && init" transition="mask"></div>
    <div id="key-modal" class="modal" v-if="!user.tasks.length && init" transition="modal">
      <div class="modal-header">
        <h1 id="headline">Taskmastr</h1>
      </div>
      <div id="key-ask" class="modal-body">
        <div class="greeting" v-if="!reset">
          <p>Forgot your password?</p>
          <p>Fill in your email address and we'll send you a reset link.</p>
        </div>
        <forgot-form></forgot-form>
        <try-it></try-it>
      </div>
    </div>
  </div>
</template>

<script>

import { setForgot } from '../store/user-store/user-actions'
import ForgotForm from './forms/ForgotForm.vue'
import TryIt from './forms/form-components/TryIt.vue'

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
  components: {
    ForgotForm,
    TryIt
  },
  compiled () {
    if (this.$route.path === '/forgot' && !this.forgot) return this.setForgot(true)
  }
}

</script>