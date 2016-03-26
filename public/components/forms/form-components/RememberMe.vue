<template>
  <div id="remember">
    <input id="remember-me" class="check" name="remember-me" type="checkbox" :value="rememberMe"></input>
    <i class="fa" :class="{'fa-check-square-o': rememberMe, 'fa-square-o':!rememberMe}" @click="setRememberMe(!rememberMe)"></i>
    <label for="remember-me">Remember me</label>
  </div>
</template>

<script>

import { setRememberMe } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      rememberMe: (state) => state.user.rememberMe
    },
    actions: {
      setRememberMe
    }
  }
}

</script>