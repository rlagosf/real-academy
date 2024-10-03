<template>
  <section class="about-us" id="about" ref="aboutSection">
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
        <img src="/assets/logos/logo-en-blanco.png" alt="Logo Real Academy FC" class="responsive-img" />
      </div>

      <!-- Tercera sección: Otra imagen o logo adicional -->
      <div class="grid-item image">
        <img src="assets/others/rc-cup.jpeg" alt="Equipo Real Academy FC" class="responsive-img" />
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
  name: 'AboutUs',
  mounted() {
    // Usa nextTick para asegurar que el DOM esté completamente cargado
    this.$nextTick(() => {
      const aboutSection = this.$refs.aboutSection;
      
      if (aboutSection) {
        // @ts-ignore
        const gridItems = aboutSection.querySelectorAll('.grid-item');

        // Configuración del IntersectionObserver para activar las animaciones
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible'); // Añade clase visible cuando está en pantalla
            } else {
              entry.target.classList.remove('visible'); // Elimina clase cuando sale de pantalla
            }
          });
        });

        // Observar cada elemento grid-item
        gridItems.forEach((item) => {
          observer.observe(item);
        });
      }
    });
  },
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
  font-size: 2.5em;
}

/* Grid general */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: center;
  justify-items: center;
}

.grid-item {
  padding: 20px;
  opacity: 0; /* Oculto inicialmente */
  transform: translateY(20px); /* Desplazado inicialmente hacia abajo */
  transition: opacity 0.6s ease-out, transform 0.6s ease-out; /* Transición para opacidad y movimiento */
}

/* Clase visible para aplicar la animación */
.grid-item.visible {
  opacity: 1; /* Aparece */
  transform: translateY(0); /* Posición original */
}

/* Estilos para el contenido de texto */
.grid-item.text p {
  margin: 0;
  line-height: 1.8;
  font-size: 1.2em;
}

/* Imágenes responsivas */
.responsive-img {
  max-width: 60%;
  height: auto;
  border-radius: 8px;
  min-width: 350px;
}

/* Reordenar elementos en pantallas pequeñas */
@media (max-width: 768px) {
  .grid-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Centrar el contenido de texto */
  .grid-item.text {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  /* Reordenar texto e imagen */
  .grid-item.text:nth-of-type(odd) {
    order: calc(var(--i, 1) * 2 - 1);
  }

  .grid-item.image:nth-of-type(even) {
    order: calc(var(--i, 1) * 2);
  }

  .grid-item {
    display: flex;
    justify-content: center;
    order: var(--i, 1);
    width: 100%;
  }

  /* Aumentar el tamaño del texto en dispositivos pequeños */
  h2 {
    font-size: 2em;
  }

  .grid-item.text p {
    font-size: 1.1em;
  }
}
</style>
