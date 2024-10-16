import { createRouter, createWebHistory } from 'vue-router';
import LoginReal from './components/LoginReal.vue';
import HomeComponent from './components/HomeComponent.vue';
import DashboardComponent from './components/DashboardComponent.vue';
import ContactPetitions from './components/ContactPetitions.vue';
import StaffAcademy from './components/StaffAcademy.vue';
import SubscribedKids from './components/SubscribedKids.vue';

const routes = [
  {
    path: '/login',
    name: 'LoginReal',
    component: LoginReal,
  },
  {
    path: '/',  // Ruta raíz
    name: 'Home',  // Nombre para la ruta
    component: HomeComponent,  // El componente Home que muestra todos los demás
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    meta: { requiresAuth: true },  // Requiere autenticación
  },
  {
    path: '/contact-petitions',
    name: 'ContactPetitions',
    component: ContactPetitions,
    meta: { requiresAuth: true },  // Requiere autenticación
  },
  {
    path: '/staff-academy',
    name: 'StaffAcademy',
    component: StaffAcademy,
    meta: { requiresAuth: true },  // Requiere autenticación
  },
  {
    path: '/subscribed-kids',
    name: 'SubscribedKids',
    component: SubscribedKids,
    meta: { requiresAuth: true },  // Requiere autenticación
  }
  // Otras rutas pueden ir aquí
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard: Verificar autenticación antes de acceder a rutas protegidas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user_rol');  // Verificar si el usuario está autenticado

  // Si la ruta requiere autenticación y no está autenticado
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'LoginReal' });  // Redirigir al login si no está autenticado
    } else {
      next();  // Continuar si está autenticado
    }
  } else {
    next();  // Continuar si la ruta no requiere autenticación
  }
});

export default router;
