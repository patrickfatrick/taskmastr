<template>
  <div id="reset-confirm-line" class="prompt-line">
    <input id="reset-confirm" class="prompt" type="password" name="resetConfirm" placeholder="Password" :value="user.resetConfirmKey" @input="setResetConfirmKey($event.target.value)" :class="{'invalid': resetAttempt && (!match || resetFail)}"></input>
    <button id="reset-button" class="submit" type="submit" @click="setResetAttempt(true)">
      <i class="fa fa-arrow-right"></i>
    </button>
  </div>
</template>

<script>

import { setResetConfirmKey, setResetAttempt } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      resetAttempt: (state) => state.resetAttempt,
      resetFail: (state) => state.resetFail
    },
    actions: {
      setResetConfirmKey,
      setResetAttempt
    }
  },
  props: {
    match: Boolean
  }
}

</script>