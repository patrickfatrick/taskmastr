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
          <div class="reset-greeting">
            <p>Go ahead and create your new password below</p>
          </div>
          <reset-form></reset-form>
        </div>
      </div>
    </transition>
  </div>
</template>

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
