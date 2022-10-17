import store from '@v/store'
import i18n from '@v/i18n'


let $t = i18n.global.t
let access = store.getters['userinfo/getAccess']
let routes = [
  {
    component: 'CNavItem',
    name: $t('Cabinet home'),
    to: '/cabinet/home',
    icon: 'cil-home',
  },
  {
    component: 'CNavItem',
    name: $t('My courses'),
    to: '/cabinet/courses',
    icon: 'cil-education',
  },
  {
    component: 'CNavItem',
    name: $t('My orders'),
    to: '/cabinet/orders',
    icon: 'cil-basket',
  },
  {
    component: 'CNavGroup',
    name: $t('Manage'),
    to: '/manage',
    icon: 'cil-cog',
    items: [
      {
        component: 'CNavItem',
        name: $t('Courses'),
        to: '/manage/courses',
      },
      {
        component: 'CNavItem',
        name: $t('Users'),
        to: '/manage/users',
      },
      {
        component: 'CNavItem',
        name: $t('Orders'),
        to: '/manage/orders',
      },
      {
        component: 'CNavItem',
        name: $t('Categories'),
        to: '/cabinet/manage/categories',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: $t('Courses'),
    to: '/courses',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: $t('Create new course'),
        to: '/courses/new',
      },
      {
        component: 'CNavItem',
        name: $t('Course list'),
        to: '/courses/list',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: $t('Student list'),
    to: '/students/list',
    icon: 'cil-contact'
  },
]

export default routes.filter((row) => {
  if (row['access'] === undefined) {
    return true
  } else {
    return row.access === access || row.access.includes(access)
  }
})
