import { createWebHistory, createRouter } from 'vue-router'

import Home from '@v/pages/Home.vue'
import Register from '@v/pages/Register.vue'
import Login from '@v/pages/Login.vue'
import Dashboard from '@v/pages/Dashboard.vue'

export const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
