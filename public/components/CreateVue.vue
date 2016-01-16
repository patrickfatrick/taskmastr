<template>
  <div>
    <div id="mask" v-if="!auth && init" transition="mask"></div>
    <div id="key-modal" class="modal" v-if="!user.tasks.length && init" transition="modal">
      <div class="modal-header">
        <h1 id="headline">Taskmastr</h1>
      </div>
      <div id="key-ask" class="modal-body">
        <div class="greeting">
          <p>Confirm your password to create a new account.</p>
        </div>
        <create-form></create-form>
        <tips></tips>
      </div>
    </div>
  </div>
</template>

<script>

import store from '../store/store'
import CreateForm from './forms/CreateForm.vue'
import Tips from './forms/form-components/Tips.vue'

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
    Tips
  }
}

</script>