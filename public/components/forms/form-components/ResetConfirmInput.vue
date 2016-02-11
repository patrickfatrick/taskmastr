<template>
  <div id="reset-confirm-line" class="prompt-line">
    <input id="reset-confirm" class="prompt" type="password" name="resetConfirm" placeholder="Password" :value="user.resetConfirmKey" @input="setResetConfirmKey($event.target.value)" :class="{'invalid': resetAttempt && (!match || resetFail)}"></input>
    <button id="reset-button" class="submit" type="submit" @click="setResetAttempt(true)">
      <i class="fa fa-arrow-right"></i>
    </button>
  </div>
</template>

<script>

import store from '../../../store/store'

export default {
  computed: {
    user () {
      return store.state.user
    },
    resetAttempt () {
      return store.state.resetAttempt
    },
    resetFail () {
      return store.state.resetFail
    }
  },
  methods: {
    setResetConfirmKey: store.actions.setResetConfirmKey,
    setResetAttempt: store.actions.setResetAttempt
  },
  props: {
    match: Boolean
  }
}

</script>