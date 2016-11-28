<template>
  <div id="reset-confirm-line" class="prompt-line">
    <input id="reset-confirm" class="prompt" type="password" name="resetConfirm" placeholder="Password" :value="user.resetConfirmKey" @input="setResetConfirmKey($event.target.value)" :class="{'invalid': resetAttempt && (!match || resetFail)}"></input>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    user: (state) => state.user,
    resetAttempt: (state) => state.resetAttempt,
    resetFail: (state) => state.resetFail
  }),
  props: {
    match: Boolean
  },
  methods: mapActions([
    'setResetConfirmKey'
  ])
}
</script>