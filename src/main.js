import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'   // ⭐ IMPORTAR VUEX

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Tus estilos SASS
import './assets/styles/main.scss'

// ⭐ ACTIVAR VUEX EN LA APP
createApp(App)
  .use(router)
  .use(store)
  .mount('#app')

