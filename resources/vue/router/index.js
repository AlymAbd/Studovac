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
        name: 'Home',
        path: '/home',
        component: () => import('../pages/welcome/Home.vue'),
      },
      {
        name: 'Register',
        path: '/register',
        component: () => import('../pages/welcome/Register.vue'),
        meta: {
          withoutAuth: true,
        },
      },
      {
        name: 'Login',
        path: '/login',
        component: () => import('../pages/welcome/Login.vue'),
        meta: {
          withoutAuth: true,
        },
      },
      {
        name: 'Verify Email Resend',
        path: '/verify_email',
        component: () => import('../pages/welcome/ResendEmailVerification'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'Verify Email',
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
    name: 'Admin',
    component: AdminPageLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'Main Page',
        path: 'home',
        component: () => import('../pages/admin/MainPage.vue'),
      },
      {
        name: 'Dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/Dashboard.vue'),
      },
      {
        path: 'manage',
        name: 'Cabinet Manage',
        children: [
          {
            name: 'Manage categories',
            path: 'categories',
            component: () => import('../pages/cabinet/management/Category.vue')
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
