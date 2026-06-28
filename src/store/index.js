import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },

  mutations: {
    login(state, userData) {
      state.user = userData
      state.isAuthenticated = true
    },

    logout(state) {
      state.user = null
      state.isAuthenticated = false
    },

    updatePreferences(state, prefs) {
      state.user.preferences = { ...state.user.preferences, ...prefs }
    }
  },

  actions: {
    login({ commit }, credentials) {
      const users = [
        {
          email: 'vanne@mail.com',
          password: '1234',
          name: 'Vanne',
          preferences: { units: 'metric', theme: 'light' },
          favorites: ['Tomé', 'Concepción']
        }
      ]

      const user = users.find(
        u => u.email === credentials.email && u.password === credentials.password
      )

      if (user) {
        commit('login', user)
        return true
      }

      return false
    },

    logout({ commit }) {
      commit('logout')
    }
  }
})
