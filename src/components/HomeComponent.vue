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
import MainNavigator from './MainNavigator.vue';
import VideoBackground from './VideoBackground.vue';
import AboutUs from './AboutUs.vue';
import PhotoGallery from './PhotoGallery.vue';
import MapLocation from './MapLocation.vue';
import ContactForm from './ContactForm.vue';
import RealFoot from './RealFoot.vue';
import BackgroundMusic from './BackgroundMusic.vue';

export default {
  name: 'HomeComponent',  // Asegúrate de que el nombre sea correcto
  components: {
    MainNavigator,
    VideoBackground,
    AboutUs,
    PhotoGallery,
    MapLocation,
    ContactForm,
    RealFoot,
    BackgroundMusic,
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

#home {
  width: 100%;
  overflow-x: hidden;
}
</style>
