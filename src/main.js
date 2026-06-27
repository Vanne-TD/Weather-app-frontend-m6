import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Tus estilos SASS
import './assets/styles/main.scss'

createApp(App).use(router).mount('#app')

