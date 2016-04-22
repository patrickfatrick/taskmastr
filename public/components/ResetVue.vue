<template>
  <div>
    <div class="mask" v-if="!auth && init" transition="mask"></div>
    <div id="key-modal" class="modal" v-if="!user.tasks.length && init" transition="modal">
      <div class="modal-header">
        <h1 id="headline">Taskmastr</h1>
      </div>
      <div id="key-ask" class="modal-body">
        <div class="reset-greeting">
          <p>Go ahead and create your new password below</p>
        </div>
        <reset-form></reset-form>
      </div>
    </div>
  </div>
</template>

<script>

import { setReset, setResetToken } from '../store/user-store/user-actions'
import ResetForm from './forms/ResetForm.vue'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      init: (state) => state.init,
      auth: (state) => state.auth
    },
    actions: {
      setReset,
      setResetToken
    }
  },
  computed: {}, // Explicitly create computed property for test mocking
  components: {
    ResetForm
  },
  compiled () {
    if (this.$route.query.token) this.setResetToken(this.$route.query.token)
    if (this.$route.name === 'Reset') return this.setReset(true)
  }
}

</script>