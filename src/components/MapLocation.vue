<template>
  <section class="map-location" id="location">
    <h2>Ubicación</h2>
    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.756302083739!2d-70.768836!3d-33.4953664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c2d9bd629429%3A0x88739a9c1794b7cf!2sDe%20La%20Victoria%20%26%20San%20El%C3%ADas%2C%20Maip%C3%BA%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1696453717753!5m2!1ses!2scl"
        width="100%"
        height="400"
        style="border:0;"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MapLocation'
};
</script>

<style scoped>
.map-location {
  padding: 60px 30px;
  background-color: #fff;
  color: black;
  text-align: center;
}

h2 {
  color: #FF007F;
  margin-bottom: 30px;
}

.map-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
