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
          <div class="greeting">
            <p>Confirm your password to create a new account.</p>
          </div>
          <create-form></create-form>
      </div>
    </transition>
    </div>
  </div>
</template>

<script>

import CreateForm from './forms/CreateForm.vue'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      init: (state) => state.init,
      auth: (state) => state.auth
    }
  },
  components: {
    CreateForm
  }
}

</script>