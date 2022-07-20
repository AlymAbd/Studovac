import { createWebHistory, createRouter } from 'vue-router'

export const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../pages/Welcome/Home.vue'),
    children: [
      {
        name: 'register',
        path: '/register',
        component: () => import('../pages/Welcome/Register.vue')
      },
      {
        name: 'login',
        path: '/login',
        component: () => import('../pages/Welcome/Login.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
