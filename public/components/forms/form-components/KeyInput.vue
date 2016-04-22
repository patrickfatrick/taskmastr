<template>
  <div class="error-text">
    <span :class="{'hidden': require || !loginAttempt}">Password required</span>
    <span :class="{'hidden': !invalidKey || !loginAttempt}">{{invalidKey}}</span>
  </div>
  <div id="key-line" class="prompt-line">
    <input id="key" class="prompt" type="password" name="password" placeholder="Password" :value="user.key" @input="setKey($event.target.value)" :class="{'invalid': loginAttempt && (!require || invalidKey)}"></input>
  </div>
</template>

<script>

import { setKey } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      user: (state) => state.user,
      create: (state) => state.create,
      invalidKey: (state) => state.invalidKey,
      loginAttempt: (state) => state.loginAttempt
    },
    actions: {
      setKey
    }
  },
  computed: {},
  props: {
    require: Boolean
  }
}

</script>