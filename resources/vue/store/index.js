import { createStore, createLogger } from 'vuex'
import auth from './modules/auth'

const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
  modules: {
    auth,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {},
  computed: {},
  mutations: {},
  actions: {},
})

export default store
