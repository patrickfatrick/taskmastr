import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import LoginVue from './components/LoginVue.vue'
import ContentVue from './components/ContentVue.vue'
import ResetVue from './components/ResetVue.vue'
import CreateVue from './components/CreateVue.vue'
import ForgotVue from './components/ForgotVue.vue'
import store from './store/store'

// Debug mode. Turned off in production builds
Vue.config.debug = process.env.NODE_ENV !== 'production'

Vue.use(Router)

var app = Vue.extend({
  // el: 'body',
  components: {
    app: App
  }
})

var router = new Router()

router.map({
  '/login': {
    name: 'Login',
    component: LoginVue
  },
  '/app': {
    name: 'Content',
    component: ContentVue,
    auth: true
  },
  '/reset': {
    name: 'Reset',
    component: ResetVue
  },
  '/create': {
    name: 'Create',
    component: CreateVue
  },
  '/forgot': {
    name: 'Forgot',
    component: ForgotVue
  }
})

router.redirect({
  '*': '/login'
})

router.beforeEach(transition => {
  if (!transition.to.auth && store.state.auth) return router.go('/app')
  if (transition.to.auth && !store.state.auth) return router.go('/login')
  transition.next()
})

router.start(app, 'body')
