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
  },
  {
    path: '/contact-petitions',
    name: 'ContactPetitions',
    component: ContactPetitions,
  },
  {
    path: '/staff-academy',
    name: 'StaffAcademy',
    component: StaffAcademy,
  },
  {
    path: '/subscribed-kids',
    name: 'SubscribedKids',
    component: SubscribedKids,
  }
  // Otras rutas pueden ir aquí
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
