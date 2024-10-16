<template>
  <div id="home">
    <BackgroundMusic />
    <MainNavigator />
    <VideoBackground />
    <PhotoGallery />
    <AboutUs />
    <MapLocation />
    <ContactForm />
    <RealFoot />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'HomeComponent',
  components: {
    BackgroundMusic: defineAsyncComponent(() => import('./BackgroundMusic.vue')),
    MainNavigator: defineAsyncComponent(() => import('./MainNavigator.vue')),
    VideoBackground: defineAsyncComponent(() => import('./VideoBackground.vue')),
    AboutUs: defineAsyncComponent(() => import('./AboutUs.vue')),
    PhotoGallery: defineAsyncComponent(() => import('./PhotoGallery.vue')),
    MapLocation: defineAsyncComponent(() => import('./MapLocation.vue')),
    ContactForm: defineAsyncComponent(() => import('./ContactForm.vue')),
    RealFoot: defineAsyncComponent(() => import('./RealFoot.vue')),
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

body {
  margin: 0;
  font-family: 'Bebas Neue', sans-serif;
  color: #333;
  background-color: #FFF;
}

#home {
  width: 100%;
  overflow-x: hidden;
}

/* Estilos globales adicionales */
* {
  box-sizing: border-box; /* Evita problemas con márgenes y padding */
  margin: 0;
  padding: 0;
  border: none; /* Eliminar bordes por defecto */
  outline: none; /* Desactivar contornos automáticos */
}

a {
  text-decoration: none; /* Evitar enlaces no deseados */
  color: inherit; /* Mantener el color heredado */
}
</style>
