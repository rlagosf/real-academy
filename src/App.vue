<template>
  <div id="app">
    <BackgroundMusic />  <!-- Llamada al nuevo componente -->
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
import MainNavigator from './components/MainNavigator.vue';
import VideoBackground from './components/VideoBackground.vue';
import AboutUs from './components/AboutUs.vue';
import PhotoGallery from './components/PhotoGallery.vue';
import MapLocation from './components/MapLocation.vue';
import ContactForm from './components/ContactForm.vue';
import RealFoot from './components/RealFoot.vue';
import BackgroundMusic from './components/BackgroundMusic.vue';  // Importación del nuevo componente

export default {
  components: {
    MainNavigator,
    VideoBackground,
    AboutUs,
    PhotoGallery,
    MapLocation,
    ContactForm,
    RealFoot,
    BackgroundMusic,  // Registro del nuevo componente
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

body {
  margin: 0;
  font-family: 'Bebas Neue', sans-serif;
  color: #333;
  background-color: #FFF;
}

#app {
  width: 100%;
  overflow-x: hidden;
}
</style>
