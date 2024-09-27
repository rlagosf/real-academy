import { createRouter, createWebHistory } from 'vue-router';


// Define las rutas
const routes = [
  {
    // path: '/success',
    // name: 'SuccessPage',
    // component: SucessfullAcademy,
  }
];

// Crea la instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Exporta el router
export default router;
