<template>
  <section class="map-location" id="location">
    <h2>Ubicación</h2>
    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.022291198312!2d-70.74940898480114!3d-33.486239180768336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c33dd78591a7%3A0xd3e2a2279104fda!2sComplejo%20Deportivo%20Don%20Oscar!5e0!3m2!1ses!2scl!4v1692078412721!5m2!1ses!2scl"
        width="100%"
        height="450"
        style="border:0;"
        allowfullscreen=""
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
