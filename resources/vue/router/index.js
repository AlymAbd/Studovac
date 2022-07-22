import { createWebHistory, createRouter } from 'vue-router'

export const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    name: 'base',
    component: () => import('../components/welcome/BasicComponent.vue'),
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('../pages/welcome/Home.vue')
      },
      {
        name: 'register',
        path: '/register',
        component: () => import('../pages/welcome/Register.vue')
      },
      {
        name: 'login',
        path: '/login',
        component: () => import('../pages/welcome/Login.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkExactActiveClass: 'active',
})

export default router
