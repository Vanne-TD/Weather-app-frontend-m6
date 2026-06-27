🌤️ Weather App – SPA en Vue 3

Aplicación del clima desarrollada como proyecto de portafolio, evolucionada desde una versión inicial en JavaScript hacia una SPA moderna construida con Vue 3, consumo de API en tiempo real y una arquitectura SCSS escalable (7‑1).

📋 Descripción

Este proyecto nació como una app simple del clima hecha con JavaScript puro (Módulo 5), y evolucionó hacia una Single Page Application completamente modular, mantenible y profesional utilizando:

- Vue 3 + Composition API
- Vue Router
- SCSS con arquitectura 7‑1
- Componentes reutilizables
- Consumo de API OpenWeather en tiempo real

La aplicación permite buscar cualquier ciudad del mundo, visualizar su clima actual, acceder a detalles extendidos y revisar estadísticas semanales generadas dinámicamente.

🎯 Objetivo del Proyecto

Construir una aplicación moderna, responsiva y escalable que demuestre dominio de:

- Vue 3 y su ecosistema
- Arquitectura de componentes
- Manejo de rutas
- Integración con APIs externas
- Buenas prácticas de estilos (SCSS 7‑1 + BEM)
- Diseño limpio y profesional

⚙️ Funcionalidades

- 🔍 Búsqueda global de ciudades
- 🌡️ Clima actual (temperatura, sensación térmica, humedad, viento)
- 📅 Pronóstico extendido
- 📊 Estadísticas semanales (mín, máx, promedio)
- 🧭 Navegación SPA con Vue Router
- 🖼️ Vistas Home, Details y About
- 🎨 Diseño responsivo + SCSS 7‑1
- ✨ Animaciones suaves y UI moderna


🧠 Arquitectura del Proyecto
 
 📁 1. Vue (toda la lógica, vistas y componentes)
src/
├── components/
│   ├── ButtonComponent.vue
│   ├── NavbarComponent.vue
│   ├── WeatherCardComponent.vue
│   ├── WeatherDetailsCardComponent.vue
│   └── WeatherWeeklyComponent.vue
│
├── layout/
│   ├── HeaderLayout.vue
│   ├── FooterLayout.vue
│   └── MainLayout.vue
│
├── router/
│   └── index.js
│
├── views/
│   ├── HomeView.vue
│   ├── DetailsView.vue
│   ├── AboutView.vue
│   └── ContactView.vue   ← placeholder para M7
│
├── App.vue
└── main.js

 📁 2. API (tu lógica de OpenWeather)

 src/api/weatherApi.js

 📁 3. Variables de entorno
  
 .env

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
- SCSS (7‑1)
- JavaScript ES6+
- Bootstrap 5 (solo utilidades)
- OpenWeather API
- Vite

📚 Aprendizajes

- Migración de JS vanilla a Vue 3
- Componentización y reutilización
- Manejo de estado local con composables
- Buenas prácticas de arquitectura front-end
- Diseño escalable con SCSS 7‑1
- Integración de API en tiempo real
- Deploy profesional en GitHub Pages

👩‍💻 Autora
Vanessa Torres Drake  
Bootcamp Front End Trainee – Talento Digital para Chile
Junio 2026

🔗 Repositorio