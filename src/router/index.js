import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Detalle from '../views/DetailsView.vue'
import About from '../views/AboutView.vue'
import Contact from '../views/ContactView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/detalle/:city', name: 'Detalle', component: Detalle, props: true },
  { path: '/about', name: 'About', component: About },
  { path: '/contacto', name: 'Contacto', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
