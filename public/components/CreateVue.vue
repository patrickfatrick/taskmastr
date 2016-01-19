<template>
  <div>
    <div class="mask" v-if="!auth && init" transition="mask"></div>
    <div id="key-modal" class="modal" v-if="!user.tasks.length && init" transition="modal">
      <div class="modal-header">
        <h1 id="headline">Taskmastr</h1>
      </div>
      <div id="key-ask" class="modal-body">
        <div class="greeting">
          <p>Confirm your password to create a new account.</p>
        </div>
        <create-form></create-form>
        <try-it></try-it>
      </div>
    </div>
  </div>
</template>

<script>

import store from '../store/store'
import CreateForm from './forms/CreateForm.vue'
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
    CreateForm,
    TryIt
  }
}

</script>