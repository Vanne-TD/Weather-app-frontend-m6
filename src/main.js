//main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// ⭐ PINIA
import { createPinia } from 'pinia'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Estilos SASS (scss)
import './assets/styles/main.scss'

// ⭐ CREAR APP
const app = createApp(App)

// ⭐ CREAR PINIA
const pinia = createPinia()

// ⭐ ACTIVAR PINIA Y ROUTER
app.use(router)
app.use(pinia)

// ⭐ MONTAR APP
app.mount('#app')
