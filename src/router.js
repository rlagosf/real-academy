import { createRouter, createWebHistory } from 'vue-router';
import SucessfullAcademy from './components/SucessfullAcademy.vue'; // Asegúrate de que esta ruta sea correcta

// Define las rutas
const routes = [
  {
    path: '/success',
    name: 'SuccessPage',
    component: SucessfullAcademy,
  }
];

// Crea la instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Exporta el router
export default router;
