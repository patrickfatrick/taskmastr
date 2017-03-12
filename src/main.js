import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
require('./stylesheets/styles.scss')

Vue.config.productionTip = false

const app = new Vue(Vue.util.extend({
  store,
  router
}, App))

app.$mount('app')
