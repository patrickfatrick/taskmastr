import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import LoginVue from './components/LoginVue.vue'
import ContentVue from './components/ContentVue.vue'
import ResetVue from './components/ResetVue.vue'
import CreateVue from './components/CreateVue.vue'
import ForgotVue from './components/ForgotVue.vue'
import Tasks from './components/tasks/Tasks.vue'
import store from './store'
require('./stylesheets/styles.scss')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/app',
      name: 'Content',
      component: ContentVue,
      auth: true,
      children: [
        {
          path: 'list/:listid/newuser/:newuser',
          component: Tasks
        },
        {
          path: 'list/:listid',
          component: Tasks
        },
        {
          path: '',
          component: Tasks
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginVue
    },
    {
      path: '/reset',
      name: 'Reset',
      component: ResetVue
    },
    {
      path: '/create',
      name: 'Create',
      component: CreateVue
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: ForgotVue
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (!to.auth && store.state.auth) return next({ path: '/app' })
//   if (to.auth && !store.state.auth) return next({ path: '/login' })
//   next()
// })

const app = new Vue(Vue.util.extend({
  store,
  router
}, App))

app.$mount('app')
