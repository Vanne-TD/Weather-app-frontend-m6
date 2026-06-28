// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Detalle from '../views/DetailsView.vue'
import About from '../views/AboutView.vue'
import Contact from '../views/ContactView.vue'
import Login from '../views/LoginView.vue'
import Favoritos from '../views/FavoritesView.vue'
import store from '../store'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/detalle/:city', name: 'Detalle', component: Detalle, props: true },
  { path: '/favoritos', name: 'Favoritos', component: Favoritos, meta: { requiresAuth: true } },
  { path: '/about', name: 'About', component: About },
  { path: '/contacto', name: 'Contacto', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ⭐ GUARD DE AUTENTICACIÓN
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
