import { createWebHistory, createRouter } from 'vue-router'

export const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    name: 'base',
    component: () => import('../components/welcome/BasicComponent.vue'),
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('../pages/welcome/Home.vue'),
      },
      {
        name: 'register',
        path: '/register',
        component: () => import('../pages/welcome/Register.vue'),
        meta: {
          withoutAuth: true,
        },
      },
      {
        name: 'login',
        path: '/login',
        component: () => import('../pages/welcome/Login.vue'),
        meta: {
          withoutAuth: true,
        },
      },
      {
        name: 'verify-email-resend',
        path: '/verify_email',
        component: () => import('../pages/welcome/ResendEmailVerification'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'verify-email',
        path: '/verify_email/:token',
        props: true,
        component: () => import('../pages/welcome/EmailVerification'),
        meta: {
          requiresAuth: true
        }
      }
    ],
  },
  {
    path: '/cabinet',
    name: 'admin',
    component: () => import('../layouts/AdminPageLayout'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'home',
        name: 'homeadmin',
        component: () => import('../pages/admin/MainPage.vue'),
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../pages/admin/Dashboard.vue'),
      },
      {
        path: 'employees/list',
        name: 'listuser',
        component: () => import('../pages/admin/Employees/List.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page404',
    component: () => import('../pages/errors/Page404'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkExactActiveClass: 'active',
})

export default router
