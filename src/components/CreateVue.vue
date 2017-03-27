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
        v-if="!user.tasks.length && init">
        <div class="modal__header">
          <h1 class="modal__header__headline">Taskmastr</h1>
        </div>
        <div class="modal__body">
          <div class="modal__body__greeting">
            <p>Confirm your password to create a new account.</p>
          </div>
          <create-form></create-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="postcss" scoped>
  @import "../stylesheets/variables";

  .modal {
    @apply --modal;
  }

  .mask {
    @apply --mask;
  }
</style>

<script>
import { mapState } from 'vuex'
import CreateForm from './forms/CreateForm.vue'

export default {
  computed: mapState({
    user: (state) => state.user,
    init: (state) => state.init,
    auth: (state) => state.auth
  }),
  components: {
    CreateForm
  }
}
</script>
