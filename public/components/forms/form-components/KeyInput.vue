<template>
  <div class="error-text">
    <span :class="{'hidden': require || !loginAttempt}">Password required</span>
    <span :class="{'hidden': !invalidKey || !loginAttempt}">{{invalidKey}}</span>
  </div>
  <div id="key-line" class="prompt-line">
    <input id="key" class="prompt" type="password" name="password" placeholder="Password" :value="user.key" @input="setKey($event.target.value)" :class="{'invalid': loginAttempt && (!require || invalidKey)}"></input>
    <button id="key-button" class="submit" type="submit" v-if="$route.path !== '/create'" @click="setLoginAttempt(true)">
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
    create () {
      return store.state.create
    },
    invalidKey () {
      return store.state.invalidKey
    },
    loginAttempt () {
      return store.state.loginAttempt
    }
  },
  methods: {
    setKey: store.actions.setKey,
    setLoginAttempt: store.actions.setLoginAttempt
  },
  props: {
    require: Boolean
  }
}

</script>