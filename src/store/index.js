import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },

  getters: {
    // ⭐ Para navbar dinámico
    isLogged: state => state.isAuthenticated,

    // ⭐ Para obtener favoritos sin romper si user es null
    favorites: state => state.user?.favorites || [],

    // ⭐ Para obtener preferencias sin romper
    preferences: state => state.user?.preferences || { units: 'metric', theme: 'light' }
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
      if (!state.user) return
      state.user.preferences = { ...state.user.preferences, ...prefs }
    },

    // ⭐ AGREGADO: manejar favoritos
    addFavorite(state, city) {
      if (!state.user) return
      if (!state.user.favorites.includes(city)) {
        state.user.favorites.push(city)
      }
    },

    removeFavorite(state, city) {
      if (!state.user) return
      state.user.favorites = state.user.favorites.filter(c => c !== city)
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
    },

    // ⭐ AGREGADO: registro fake
    register({ commit }, newUser) {
      // En un backend real guardarías el usuario
      commit('login', {
        ...newUser,
        preferences: { units: 'metric', theme: 'light' },
        favorites: []
      })
      return true
    }
  }
})



// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//     user: null,
//     isAuthenticated: false,
//   },

//   mutations: {
//     login(state, userData) {
//       state.user = userData
//       state.isAuthenticated = true
//     },

//     logout(state) {
//       state.user = null
//       state.isAuthenticated = false
//     },

//     updatePreferences(state, prefs) {
//       state.user.preferences = { ...state.user.preferences, ...prefs }
//     }
//   },

//   actions: {
//     login({ commit }, credentials) {
//       const users = [
//         {
//           email: 'vanne@mail.com',
//           password: '1234',
//           name: 'Vanne',
//           preferences: { units: 'metric', theme: 'light' },
//           favorites: ['Tomé', 'Concepción']
//         }
//       ]

//       const user = users.find(
//         u => u.email === credentials.email && u.password === credentials.password
//       )

//       if (user) {
//         commit('login', user)
//         return true
//       }

//       return false
//     },

//     logout({ commit }) {
//       commit('logout')
//     }
//   }
// })
