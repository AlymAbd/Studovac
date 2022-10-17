import { destroyToken, obtainToken  } from '@v/api/auth/token'
import { register, login, resendVerification, verifyEmail } from '@v/api/auth/user'
import { ACCESS_TOKEN, USER_DATA, EXPIR_DATE } from '@v/config/definitions'

export default {
  namespaced: true,
  state: {
    accessToken: localStorage.getItem(ACCESS_TOKEN) || null,
    expireToken: localStorage.getItem(EXPIR_DATE) || null,
    userInfo: JSON.parse(localStorage.getItem(USER_DATA)) || null,
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
    isVerified: (state) => {
      return state.userInfo !== null ? state.userInfo.is_verified : null
    },
    userInformation: (state) => {
      return state.userInfo
    },
  },
  mutations: {
    updateAccess(state, access) {
      state.accessToken = access
      localStorage.setItem(ACCESS_TOKEN, access)
      localStorage.setItem(EXPIR_DATE, new Date().getTime() + 70000000)
    },
    removeToken(state) {
      localStorage.removeItem(ACCESS_TOKEN)
      localStorage.removeItem(EXPIR_DATE)
      localStorage.removeItem(USER_DATA)
      state.accessToken = null
      state.expireToken = null
      state.userInfo = null
    },
    updateUserInfo(state, data) {
      localStorage.setItem(USER_DATA, JSON.stringify(data))
      state.userInfo = data
    },
  },
  actions: {
    authorizeUser(context, data) {
      context.commit('removeToken')
      return new Promise((resolve, reject) => {
        login(data.email, data.phone, data.password)
          .then((response) => {
            if (response.status == 200) {
              context.commit('updateAccess', response.data.token)
              context.commit('updateUserInfo', {
                id: response.data.id,
                name: response.data.title,
                email: response.data.email,
                phone: response.data.phone,
                access: response.data.access_type,
                photo: response.data.path_to_photo,
                is_verified: response.data.account_verified,
                email_verified: response.data.email_verified_at,
                phone_verified: response.data.phone_verified_at
              })
              resolve(response)
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
          data.title,
          data.password,
          data.password_confirmation,
          data.phone,
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
      context.commit('removeToken')
    },
    removeUserInfo(context) {
      context.commit('removeToken')
    },
    resendVerificationCode(context, data) {
      return new Promise((resolve, reject) => {
        resendVerification(data.email, data.phone)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    verifyEmailToken(context, data) {
      return new Promise((resolve, reject) => {
        verifyEmail(data).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    updateToken(context) {
      obtainToken().then(response=> {
        context.commit('updateAccess', response.data.token)
      }).catch(error => {
        context.commit('removeToken')
        this.$router.push({name: 'home'})
      })
    }
  },
}
