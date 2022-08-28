import store from '@v/store/index'

let access = store.getters['userinfo/getAccess']

let routes = [
  {
    component: 'CNavItem',
    name: 'Домашняя',
    to: '/secret_place/home',
    icon: 'cil-cursor',
    access: ['guest'],
  },
  {
    component: 'CNavItem',
    name: 'Мои смены',
    to: '/secret_place/sessions',
    icon: 'cil-star',
    access: ['pooo'],
  },
]

export default routes.filter((row) => {
  if (row['access'] === undefined) {
    return true
  } else {
    return row.access === access || row.access.includes(access)
  }
})
