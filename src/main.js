import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Esto debería ser correcto
import VueGoogleMaps from '@fawmi/vue-google-maps';

// Crear la aplicación
const app = createApp(App);

// Configurar y usar Vue Router
app.use(router);

// Configurar y usar VueGoogleMaps
app.use(VueGoogleMaps, {
  load: {
    key: '.-p3nt4k1lL',  // Asegúrate de usar la clave correcta
  },
});

// Montar la aplicación en el DOM
app.mount('#app');
