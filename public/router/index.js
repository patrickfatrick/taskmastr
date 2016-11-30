import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.params.listid && store.state.auth) return next({ path: '/app' })
  if (to.meta.requiresAuth && !store.state.auth) return next({ path: '/login' })
  next()
})

export default router
