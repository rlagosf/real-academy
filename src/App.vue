<template>
  <div id="app">
    <MainNavigator />
    <VideoBackground />
    <PhotoGallery />
    <AboutUs />
    <MapLocation />
    <ContactForm />
    <RealFoot />
    <SucessfullAcademy />
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
import SucessfullAcademy from './components/SucessfullAcademy.vue';

export default {
  components: {
    MainNavigator,
    VideoBackground,
    AboutUs,
    PhotoGallery,
    MapLocation,
    ContactForm,
    RealFoot,
    SucessfullAcademy
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');


body {
  margin: 0;
  font-family: 'Bebas Neue', sans-serif; /* Aplica Bebas Neue como la fuente global */
  color: #333;
  background-color: #FFF;
}

#app {
  width: 100%;
  overflow-x: hidden;
}
</style>
