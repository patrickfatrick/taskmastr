<template>
  <div>
    <div class="error-text">
      <span v-show="loginAttempt && !user.confirm && !confirmAttempt">No user found. Please confirm your password.</span>
      <span v-show="confirmAttempt && !user.confirm">Password confirmation required.</span>
      <span v-show="!match && loginAttempt && user.confirm">Passwords don't match.</span>
    </div>
    <div id="confirm-line" class="prompt-line">
      <input id="confirm" class="prompt" type="password" name="password" placeholder="Password" :value="user.confirm" @input="setConfirm($event.target.value)" :class="{'invalid': confirmAttempt && !match}"></input>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    user: (state) => state.user,
    loginAttempt: (state) => state.loginAttempt,
    confirmAttempt: (state) => state.confirmAttempt
  }),
  props: {
    match: Boolean
  },
  methods: mapActions([
    'setConfirm'
  ])
}
</script>