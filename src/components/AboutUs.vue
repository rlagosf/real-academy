<template>
  <section class="about-us" id="about">
    <div class="grid-container">
      <!-- Primera sección: Título y Contenido -->
      <div class="grid-item text">
        <h2>PRESENTACIÓN</h2>
        <p>
          Fundamos nuestra academia en el año 2023 con la misión de impulsar el desarrollo integral de nuestros jugadores, 
          fortaleciendo habilidades técnicas, tácticas y físicas, así como aspectos emocionales e interpersonales.
        </p>
      </div>
      
      <!-- Segunda sección: Logo o imagen -->
      <div class="grid-item image">
        <img src="/real-academy-fc/logo-en-blanco.png" alt="Logo Real Academy FC" class="responsive-img" />
      </div>

      <!-- Tercera sección: Otra imagen o logo adicional -->
      <div class="grid-item image">
        <img src="/real-academy-fc/RC CUP.jpeg" alt="Equipo Real Academy FC" class="responsive-img" />
      </div>

      <!-- Cuarta sección: Título y Contenido adicional -->
      <div class="grid-item text">
        <h2>SOBRE NOSOTROS</h2>
        <p>
          Ofrecemos un viaje completo de desarrollo futbolístico a través de nuestros cinco segmentos: Junior, Formativo, 
          Competitivo, Proyección y Proyecto USA. En cada uno, desarrollamos una planificación deportiva que fusiona las 
          mejores técnicas de Europa y Sudamérica.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutUs'
};
</script>

<style scoped>
.about-us {
  padding: 60px 30px;
  background-color: #000;
  color: white;
  text-align: center;
}

/* Estilos para los títulos */
h2 {
  color: #FF007F;
  margin-bottom: 30px;
}

/* Grid general */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas */
  grid-template-rows: auto auto;  /* Dos filas automáticas */
  gap: 20px;
  align-items: center;
  justify-items: center;
}

.grid-item {
  padding: 20px;
}

/* Estilos para el contenido de texto */
.grid-item.text p {
  margin: 0;
  line-height: 1.6;
}

/* Imágenes responsivas */
.responsive-img {
  max-width: 80%;
  height: auto;
  border-radius: 8px;
}

/* Diseño responsivo para pantallas más pequeñas */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* Una columna en dispositivos pequeños */
  }

  .grid-item {
    text-align: center;
  }
}
</style>
