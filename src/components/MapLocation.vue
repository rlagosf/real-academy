<template>
  <section class="map-location" id="location">
    <h2 ref="mapTitle">Ubicación</h2>
    <div class="map-container" ref="mapContainer">
      <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.756302083739!2d-70.768836!3d-33.4953664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c2d9bd629429%3A0x88739a9c1794b7cf!2sDe%20La%20Victoria%20%26%20San%20El%C3%ADas%2C%20Maip%C3%BA%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1696453717753!5m2!1ses!2scl"
  width="100%" height="400" style="border:0;"
  allowfullscreen loading="lazy"
  sandbox="allow-scripts allow-same-origin"></iframe>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MapLocation',
  mounted() {
    const mapTitle = this.$refs.mapTitle;
    const mapContainer = this.$refs.mapContainer;

    // IntersectionObserver para animar el título y el mapa cuando entren en vista
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    });

    // Observar tanto el título como el contenedor del mapa
    // @ts-ignore
    observer.observe(mapTitle);
    // @ts-ignore
    observer.observe(mapContainer);
  }
};
</script>

<style scoped>
.map-location {
  padding: 60px 30px;
  background-color: black;
  color: black;
  text-align: center;
}

/* Efecto de transición para el título */
h2 {
  color: #FF007F;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

h2.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Efecto de transición para el contenedor del mapa */
.map-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.map-container.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
