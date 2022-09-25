import { USER_DATA } from '@v/config/definitions'

export default {
  namespaced: true,
  state: {
    localPathToPhoto: './images/default.png',
    userInfo: JSON.parse(localStorage.getItem(USER_DATA)),
  },
  getters: {
    getPathToPhoto: (state) => {
      if (state.userInfo !== null && state.userInfo.photo !== null) {
        return state.userInfo.photo
      } else {
        return state.localPathToPhoto
      }
    },
    getAccess: (state) => {
      return state.userInfo.access
    },
    hasVerifiedEmail: (state) => {
      return state.userInfo !== null ? state.userInfo.email_verified != null : false
    }
  },
  mutations: {
    setAccountVerified(state) {
      let data = JSON.parse(localStorage.getItem(USER_DATA))
      state.is_verified = data.is_verified = true
      localStorage.setItem(USER_DATA, JSON.stringify(data))
    }
  }
}
