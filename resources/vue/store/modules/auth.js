import { destroyToken } from '@v/api/auth/token'
import { register, login } from '@v/api/auth/user'
import { ACCESS_TOKEN, USER_DATA, EXPIR_DATE } from '@v/config/definitions'

export default {
  namespaced: true,
  state: {
    accessToken: localStorage.getItem(ACCESS_TOKEN) || null,
    userInfo: JSON.parse(localStorage.getItem(USER_DATA)) || null,
    expireToken: localStorage.getItem(EXPIR_DATE) || null,
  },
  getters: {
    isAuthenticated: (state) => {
      if (Number(localStorage.getItem(EXPIR_DATE)) > new Date().getTime()) {
        return state.accessToken != null
      } else {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(EXPIR_DATE)
        state.accessToken = null
        state.expireToken = null
        return false
      }
    },
    userInformation: (state) => {
      return state.userInfo
    },
  },
  mutations: {
    updateLocalStorage(state, { access }) {
      localStorage.setItem(ACCESS_TOKEN, access)
      localStorage.setItem(EXPIR_DATE, new Date().getTime() + 70000000)
      state.accessToken = access
    },
    updateAccess(state, access) {
      state.accessToken = access
    },
    removeToken(state) {
      localStorage.removeItem(ACCESS_TOKEN)
      localStorage.removeItem(EXPIR_DATE)
      state.accessToken = null
      state.expireToken = null
    },
    updateUserInfo(state, data) {
      localStorage.setItem(USER_DATA, JSON.stringify(data))
      state.userInfo = data
    },
  },
  actions: {
    login(context, data) {
      context.commit('removeToken')
      return new Promise((resolve, reject) => {
        obtainToken(data.email, data.personal_uid)
          .then((response) => {
            if (response.status == 200) {
              context.commit('updateLocalStorage', {
                access: response.data.token,
              })
              context.commit('updateUserInfo', {
                id: response.data.id,
                name: response.data.name,
                surname: response.data.surname,
                email: response.data.email,
                is_admin: response.data.is_administrator,
              })
              resolve(response.data)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    createUser(context, data) {
      return new Promise((resolve, reject) => {
        register(
          data.email,
          data.name,
          data.surname,
          data.personal_uid,
          data.personal_uid_confirmation,
        )
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout(context) {
      destroyToken()
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      context.commit('removeToken')
    },
  },
}
