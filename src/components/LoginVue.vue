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
          <div class="greeting">
            <p>Do you have an account?</p>
            <p>If so, log in now, or create one below!</p>
          </div>
          <login-form></login-form>
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
import { mapState } from 'vuex'
import LoginForm from './forms/LoginForm.vue'

export default {
  computed: mapState({
    user: (state) => state.user,
    init: (state) => state.init,
    auth: (state) => state.auth
  }),
  components: {
    LoginForm
  }
}
</script>
