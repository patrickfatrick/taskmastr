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
        <div class="modal__header">
          <h1 class="modal__header__headline">Taskmastr</h1>
        </div>
        <div class="modal__body">
          <div class="modal__body__greeting">
            <p>Go ahead and create your new password below</p>
          </div>
          <reset-form></reset-form>
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
import { mapState, mapActions } from 'vuex'
import ResetForm from './forms/ResetForm.vue'

export default {
  computed: mapState({
    user: (state) => state.user,
    init: (state) => state.init,
    auth: (state) => state.auth
  }),
  components: {
    ResetForm
  },
  methods: mapActions([
    'setReset',
    'setResetToken'
  ]),
  mounted () {
    if (this.$route.query.token) this.setResetToken(this.$route.query.token)
    if (this.$route.name === 'Reset') return this.setReset(true)
  }
}
</script>
