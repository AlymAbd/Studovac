import { createStore, createLogger } from 'vuex'
import auth from './modules/auth'
import axiosMessages from './modules/axiosMessages'
import userinfo from './modules/userinfo'

const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
  modules: {
    auth,
    axiosMessages,
    userinfo,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    // admin
    sidebarVisible: '',
    sidebarUnfoldable: false,
    // endadmin
  },
  computed: {},
  mutations: {
    // admin
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    // endadmin
  },
  actions: {},
})

export default store
