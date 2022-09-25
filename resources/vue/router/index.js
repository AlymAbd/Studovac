import { createRouter, createWebHashHistory } from 'vue-router'
import AdminPageLayout from '../layouts/AdminPageLayout'

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
    component: AdminPageLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/home',
        name: 'homeadmin',
        component: () => import('../pages/admin/MainPage.vue'),
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../pages/admin/Dashboard.vue'),
      },
      {
        path: '/manage',
        name: 'Cabinet Manage',
        children: [
          {
            path: '/categories',
            name: 'Manage categories',
            component: () => import('../pages/admin/Users/List.vue')
          }
        ]
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page404',
    component: () => import('../pages/errors/Page404'),
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.MIX_BASE_URL),
  routes: routes,
  linkExactActiveClass: 'active',
})

export default router
