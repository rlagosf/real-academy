<template>
  <div class="container">
    <div class="slider">
      <div class="slide-track">
        <!-- Duplicar las imágenes para evitar el lapso en blanco -->
        <div class="slide" v-for="(image, index) in imageUrls.concat(imageUrls)" :key="'first-' + index">
          <img :src="image" @click="openModal(image)" alt="" />
        </div>
      </div>
    </div>
    <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <img :src="modalImage" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoGallery',
  data() {
    return {
      imageUrls: [], // Aquí se almacenarán las URLs de las imágenes
      modalVisible: false,
      modalImage: null
    }
  },
  async created() {
    // Aquí debes obtener las URLs de las imágenes, por ejemplo, desde una API
    this.imageUrls = await this.fetchImageUrls();
  },
  methods: {
    async fetchImageUrls() {
      // Implementa la lógica para obtener las URLs de las imágenes, por ejemplo, desde una API
      // Aquí se usa una lista estática de ejemplo
      const totalImages = 30; // Cambia este número según el total de imágenes que tengas
      return Array.from({ length: totalImages }, (_, i) => `/real-academy-fc/fotos-real/foto-real-facup-${i + 1}.jpeg`);
    },
    openModal(imageUrl) {
      this.modalImage = imageUrl;
      this.modalVisible = true;
      document.body.style.overflow = 'hidden'; // Desactiva el scroll del sitio web
    },
    closeModal() {
      this.modalVisible = false;
      document.body.style.overflow = ''; // Reactiva el scroll del sitio web
    }
  }
}
</script>

<style scoped>
body {
  margin: 0; /* Elimina el margen del body para que el carrusel pueda ocupar todo el ancho */
}

.container {
  position: relative;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-400px * 30)) } /* Ajusta el cálculo según el total de imágenes */
}

.slider {
  background: white;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, .125);
  height: 600px; /* Ajusta la altura del carrusel según el tamaño de las imágenes */
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 100vw; /* Abarca todo el ancho del viewport */
}

.slider::before,
.slider::after {
  background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  content: "";
  height: 600px; /* Ajusta la altura según la nueva altura del carrusel */
  position: absolute;
  width: 200px;
  z-index: 2;
}

.slider::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}

.slider::before {
  left: 0;
  top: 0;
}

.slide-track {
  animation: scroll 80s linear infinite; /* Ajusta la duración según la velocidad deseada */
  display: flex;
  width: calc(400px * 60); /* Ajusta el cálculo según el total de imágenes duplicadas */
}

.slide img {
  height: 600px; /* Ajusta la altura de las imágenes */
  width: 400px; /* Ajusta el ancho de las imágenes */
  cursor: pointer; /* Cambia el cursor para indicar que es clicable */
  transition: transform 0.3s ease; /* Transición suave para el zoom */
}

.slide img:hover {
  transform: scale(1.1); /* Aumenta el tamaño de la imagen al pasar el puntero */
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Asegura que el modal esté sobre todo el contenido */
}

.modal-content img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 20px; /* Ajusta el border-radius según sea necesario */
}
</style>
