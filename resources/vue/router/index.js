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
  {
    path: '/cabinet',
    name: 'Admin',
    component: () => import('../layouts/AdminPageLayout'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'home',
        name: 'HomeAdmin',
        component: () => import('../pages/admin/MainPage.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../pages/admin/Dashboard.vue'),
      },
      {
        path: 'employees/list',
        name: 'ListUser',
        component: () => import('../pages/admin/Employees/List.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    component: () => import('../pages/errors/Page404'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkExactActiveClass: 'active',
})

export default router
