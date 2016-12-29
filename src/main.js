import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
require('./stylesheets/styles.scss')

const app = new Vue(Vue.util.extend({
  store,
  router
}, App))

app.$mount('app')
