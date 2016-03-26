<template>
  <div>
    <div class="mask" v-if="!auth && init" transition="mask"></div>
    <div id="key-modal" class="modal" v-if="!user.tasks.length && init" transition="modal">
      <div class="modal-header">
        <h1 id="headline">Taskmastr</h1>
      </div>
      <div id="key-ask" class="modal-body">
        <div class="greeting">
          <p>Do you have an account?</p>
          <p>If so, log in now, or create one below!</p>
        </div>
        <login-form></login-form>
        <try-it></try-it>
      </div>
    </div>
  </div>
</template>

<script>

import LoginForm from './forms/LoginForm.vue'
import TryIt from './forms/form-components/TryIt.vue'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      init: (state) => state.init,
      auth: (state) => state.auth
    }
  },
  components: {
    LoginForm,
    TryIt
  }
}

</script>