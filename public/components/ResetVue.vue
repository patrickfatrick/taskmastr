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
        <try-it></try-it>
      </div>
    </div>
  </div>
</template>

<script>

import store from '../store/store'
import ResetForm from './forms/ResetForm.vue'
import TryIt from './forms/form-components/TryIt.vue'

export default {
  computed: {
    user () {
      return store.state.user
    },
    init () {
      return store.state.init
    },
    auth () {
      return store.state.auth
    }
  },
  components: {
    ResetForm,
    TryIt
  },
  methods: {
    setReset: store.actions.setReset,
    setResetToken: store.actions.setResetToken
  },
  ready () {
    if (this.$route.query.token) this.setResetToken(this.$route.query.token)
    if (this.$route.path.indexOf('/reset') === 0) return this.setReset(true)
  }
}

</script>