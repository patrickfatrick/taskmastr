import Vue from 'vue'
import Vuex from 'vuex'
import state from '../public/store/state'
import mutations from '../public/store/mutations'
import actions from '../public/store/actions'
import getters from '../public/store/getters'
import router from '../public/router'

export default function (component, changes, propsData, data) {
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
