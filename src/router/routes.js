import LoginVue from '../components/LoginVue.vue'
import ContentVue from '../components/ContentVue.vue'
import ResetVue from '../components/ResetVue.vue'
import CreateVue from '../components/CreateVue.vue'
import ForgotVue from '../components/ForgotVue.vue'
import Tasks from '../components/tasks/Tasks.vue'

export default [
  {
    path: '/app',
    component: ContentVue,
    meta: { authenticate: true },
    children: [
      {
        path: 'list/:listid',
        component: Tasks
      },
      {
        path: '',
        name: 'Tasks',
        component: Tasks
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginVue,
    meta: { authenticate: false }
  },
  {
    path: '/reset',
    name: 'Reset',
    component: ResetVue,
    meta: { authenticate: false }
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateVue,
    meta: { authenticate: false }
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: ForgotVue,
    meta: { authenticate: false }
  },
  {
    path: '*',
    redirect: '/login'
  }
]
