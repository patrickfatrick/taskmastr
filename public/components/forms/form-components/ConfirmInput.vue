<template>
  <div class="error-text">
    <span v-show="loginAttempt && !user.confirm && !confirmAttempt">No user found. Please confirm your password.</span>
    <span v-show="confirmAttempt && !user.confirm">Password confirmation required.</span>
    <span v-show="!match && loginAttempt && user.confirm">Passwords don't match.</span>
  </div>
  <div id="confirm-line" class="prompt-line">
    <input id="confirm" class="prompt" type="password" name="password" placeholder="Password" :value="user.confirm" @change="setConfirm($event.target.value)" :class="{'invalid': confirmAttempt && !match}"></input>
    <button id="confirm-button" class="submit" type="submit" @click="setConfirmAttempt(true)">
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
    loginAttempt () {
      return store.state.loginAttempt
    },
    confirmAttempt () {
      return store.state.confirmAttempt
    }
  },
  props: {
    match: Boolean
  },
  methods: {
    setConfirm: store.actions.setConfirm,
    setConfirmAttempt: store.actions.setConfirmAttempt
  }
}

</script>