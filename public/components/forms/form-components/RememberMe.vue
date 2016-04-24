<template>
  <div id="remember">
    <input id="remember-me" class="check" name="remember-me" type="checkbox" tabindex="-1" :value="rememberMe"></input>
    <button title="Remember Me" type="button" @click.prevent="setRememberMe(!rememberMe)">
      <i class="fa" :class="{'fa-check-square-o': rememberMe, 'fa-square-o':!rememberMe}"></i>
    </button>
    <label for="remember-me">Remember me</label>
  </div>
</template>

<script>

import { setRememberMe } from '../../../store/user-store/user-actions'

export default {
  vuex: {
    getters: {
      rememberMe: (state) => state.rememberMe
    },
    actions: {
      setRememberMe
    }
  }
}

</script>