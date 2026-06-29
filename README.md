🌤️ Weather App – SPA en Vue 3

Aplicación del clima desarrollada como proyecto de portafolio, evolucionada desde una versión inicial en JavaScript hacia una SPA moderna construida con Vue 3, consumo de API en tiempo real, arquitectura SCSS escalable (7‑1) y, desde el Módulo 7, sistema de usuarios con autenticación, rutas protegidas y estado global con Vuex.


📋 Descripción

Este proyecto comenzó como una app simple del clima hecha con JavaScript puro (Módulo 5).
En el Módulo 6 evolucionó hacia una Single Page Application completamente modular utilizando:

- Vue 3 + Composition API
- Vue Router
- SCSS con arquitectura 7‑1
- Componentes reutilizables
- Consumo de API OpenWeather en tiempo real

La aplicación permite buscar cualquier ciudad del mundo, visualizar su clima actual, acceder a detalles extendidos y revisar estadísticas semanales generadas dinámicamente.

En el Módulo 7 se incorporó un sistema de autenticación, manejo de estado global con Vuex, rutas protegidas y personalización según el usuario conectado, cumpliendo los requisitos funcionales y técnicos de la pauta oficial.


🎯 Objetivo del Proyecto

Construir una aplicación moderna SPA, responsiva y escalable que demuestre dominio de:

- Vue 3 y su ecosistema
- Arquitectura de componentes
- Manejo de rutas y vistas con Vue Router.
- Integración con APIs externa  (OpenWeather).
- Buenas prácticas de estilos (SCSS 7‑1 + BEM)
- Diseño limpio y profesional
- Implementar autenticación básica con Vuex (M7).
- Proteger rutas y personalizar la interfaz según el usuario.
- Mantener versionado en Git con commits descriptivos.


⚙️ Funcionalidades

- 🔍 Búsqueda global de ciudades
- 🌡️ Clima actual (temperatura, sensación térmica, humedad, viento)
- 📅 Pronóstico extendido
- 📊 Estadísticas semanales (mín, máx, promedio)
- 🧭 Navegación SPA con Vue Router
- 🖼️ Vistas Home, Details, About y Contact (éste útimo solo con su esqueleto)
- 🎨 Diseño responsivo + SCSS 7‑1
- ✨ Animaciones suaves y UI moderna

En esta versión agregamos:

🧑‍💻  Login con validación.
🚫 Mensajes de error en credenciales incorrectas.
🔒 Rutas protegidas (ej: favoritos, perfil).
👤 Estado global del usuario en Vuex.
🎛️ Preferencias del usuario (ej: °C/°F, favoritos).
🚪 Logout que limpia el estado y redirige.
🧭 Navbar dinámico según sesión activa.
📄 Vista Contact integrada como parte del flujo SPA.


🧠 Arquitectura del Proyecto
 
 📁 1. Vue (toda la lógica, vistas y componentes)
src/
├── components/
│   ├── ButtonComponent.vue (modelo)
    ├── ContactFormComponent.vue
│   ├── NavbarComponent.vue
    ├── UnitsButtomcomponent.vue
│   ├── WeatherCardComponent.vue
│   ├── WeatherDetailsCardComponent.vue
│   └── WeatherWeeklyComponent.vue
│
├── layout/
│   ├── HeaderLayout.vue
│   ├── FooterLayout.vue
│   └── MainLayout.vue (Para layout alternativo)
│
├── router/
│    └── index.js
│   
├── store/
│   └── index.js
│
├── views/
│   ├── HomeView.vue
│   ├── DetailsView.vue
│   ├── AboutView.vue
│   ├── ContactView.vue 
│   ├── FavoritesView.vue
│   ├── LoginView.vue
│   ├── RegistroView.vue
│   └── PreferencesView.vue   
│
├── App.vue
└── main.js


 📁 2. API (lógica de OpenWeather)

 src/api/weatherApi.js
  - /weather → clima actual
  - /forecast → pronóstico cada 3 horas
  - Manejo con fetch + async/await

 📁 3. Variables de entorno
  
 .env
(VITE_WEATHER_API_KEY=tu_api_key)

📁 4. Estilos SCSS (Arquitectura 7‑1)

src/assets/styles/
├── abstracts/
│   ├── _variables.scss
│   └── _mixins.scss
├── base/
│   ├── _reset.scss
│   ├── _general.scss
│   └── _typography.scss
├── components/
│   ├── _navbar.scss
│   ├── _buttons.scss
│   ├── _weather-card.scss
│   ├── _weather-details-card.scss
│   └── _weather-weekly.scss
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│   └── _main.scss
└── main.scss


🧩 Vistas principales

🏠 HomeView
- Input de búsqueda
- Cards dinámicas de ciudades
- Integración con API en tiempo real

📄 DetailsView
- Información ampliada
- Pronóstico extendido
- Estadísticas semanales
- Botón para cambiar unidades (°C / °F)

ℹ️ AboutView
- Historia del proyecto
- Evolución JS → Vue
- Tecnologías utilizadas

📬 ContactView
- Formulario de contacto
- Validaciones
- Estilos integrados al layout

🔐 LoginView (M7)
- Formulario de autenticación
- Validación de credenciales
- Mensajes de error

👤 ProfileView / Favoritos (M7)
- Preferencias del usuario (en otra view se generan)
- Datos leídos desde Vuex

🔒 Autenticación (Módulo 7)

✔ Vuex — Estado global
- state: usuario, isAuthenticated, preferencias
- mutations: login, logout, updatePreferences
- actions: login/logout async
- getters: usuario actual, estado de sesión

✔ Rutas protegidas
- Implementadas en router/index.js mediante guards:
- Middleware en router
- Si el usuario no está autenticado → redirige a /login
- Si está autenticado → accede a rutas privada

✔ Navbar dinámico
- Muestra nombre del usuario
- Botón de cerrar sesión
- Cambios reactivos según Vuex


🌐 API utilizada

OpenWeather API
- /weather → clima actual
- /forecast → pronóstico en bloques de 3 horas

Manejo con fetch + async/await dentro de un composable (weatherApi.js).


🎨 Estilos

- SCSS con arquitectura 7‑1
- Metodología BEM
- Variables, mixins y layout profesional
- Animaciones suaves (fade, hover, glow)
- Diseño limpio y moderno


🚀 Instalación y ejecución

1️⃣ Instalar dependencias
npm install

2️⃣ Ejecutar en modo desarrollo
npm run dev

3️⃣ Compilar para producción
npm run build


🛠️ Tecnologías utilizadas

- Vue 3 + Composition API
- Vue Router
- Vuex (M7)
- SCSS (7‑1)
- JavaScript ES6+
- Bootstrap 5 (utilidades)
- OpenWeather API
- Vite


📚 Aprendizajes

- Migración de JS vanilla a Vue 3
- Componentización y reutilización
- Manejo de estado local con composables
- Buenas prácticas de arquitectura front-end
- Rutas protegidas
- Arquitectura SCSS 7‑1
- Integración de API en tiempo real
- Diseño profesional
- Deploy profesional en GitHub Pages

👩‍💻 Autora
Vanessa Torres Drake  
Bootcamp Front End Trainee – Talento Digital para Chile
Junio 2026

🔗 Repositorio
https://github.com/Vanne-TD/Weather-app-frontend.git
