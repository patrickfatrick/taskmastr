import LoginVue from '../components/LoginVue.vue'
import ContentVue from '../components/ContentVue.vue'
import ResetVue from '../components/ResetVue.vue'
import CreateVue from '../components/CreateVue.vue'
import ForgotVue from '../components/ForgotVue.vue'
import Tasks from '../components/tasks/Tasks.vue'

export default [
  {
    path: '/app',
    name: 'Content',
    component: ContentVue,
    meta: { requiresAuth: true },
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
