export default {
  namespaced: true,
  state: {
    systemErrorMessage: null,
  },
  getters: {
    systemErrorMessage(context) {
      return context.systemErrorMessage
    },
  },
  mutations: {
    setSystemErrorMessage(state, message) {
      state.systemErrorMessage = message
    },
  },
  actions: {
    updateSystemMessage(context, data) {
      context.commit('setSystemErrorMessage', data)
    },
  },
}
