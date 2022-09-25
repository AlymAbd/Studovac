import store from '@v/store'
import i18n from '@v/i18n'
import router from '@v/router'
console.log(router)

let $t = i18n.global.t
let access = store.getters['userinfo/getAccess']

let routes = [
  {
    component: 'CNavItem',
    name: $t('cabinet.home'),
    to: 'cabinet/home',
    icon: 'cil-cursor',
  },
  {
    component: 'CNavItem',
    name: $t('cabinet.my-orders'),
    to: 'cabinet/orders',
    icon: 'cil-cursor',
  },
]

export default routes.filter((row) => {
  if (row['access'] === undefined) {
    return true
  } else {
    return row.access === access || row.access.includes(access)
  }
})
