import Vue from 'vue'
import Vuex from 'vuex'
import state from '../src/store/state'
import mutations from '../src/store/mutations'
import actions from '../src/store/actions'
import getters from '../src/store/getters'
import router from '../src/router'

export default function (component, changes, propsData, data) {
  console.log(Promise)
  return new Vue(Vue.util.extend({
    router,
    propsData,
    data,
    store: new Vuex.Store({
      state: {
        ...state,
        ...changes
      },
      mutations,
      actions,
      getters
    })
  }, component)).$mount()
}
