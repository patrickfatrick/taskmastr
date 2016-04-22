<template>
  <div class="error-text">
    <span v-show="loginAttempt && !user.confirm && !confirmAttempt">No user found. Please confirm your password.</span>
    <span v-show="confirmAttempt && !user.confirm">Password confirmation required.</span>
    <span v-show="!match && loginAttempt && user.confirm">Passwords don't match.</span>
  </div>
  <div id="confirm-line" class="prompt-line">
    <input id="confirm" class="prompt" type="password" name="password" placeholder="Password" :value="user.confirm" @input="setConfirm($event.target.value)" :class="{'invalid': confirmAttempt && !match}"></input>
  </div>
</template>

<script>

import { setConfirm } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      loginAttempt: (state) => state.loginAttempt,
      confirmAttempt: (state) => state.confirmAttempt
    },
    actions: {
      setConfirm
    }
  },
  props: {
    match: Boolean
  }
}

</script>