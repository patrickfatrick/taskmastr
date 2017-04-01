import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authenticate)) {
    if (!store.state.authenticated) next({ path: '/login' })
  }

  if (!to.params.listid && store.state.authenticated) next({ path: '/app' })

  next()
})

export default router
