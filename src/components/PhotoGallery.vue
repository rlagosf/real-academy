<template>
  <div class="container" id="gallery">
    <div class="slider">
      <div class="slide-track">
        <div
          class="slide"
          v-for="(image, index) in imageUrls.concat(imageUrls)"
          :key="'first-' + index"
        >
          <img 
            :src="image" 
            @click="openModal(image)" 
            alt="" 
            loading="lazy" 
          />
        </div>
      </div>
    </div>
    <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content fade-in" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <img :src="modalImage" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'PhotoGallery',
  setup() {
    const imageUrls = ref([]); // Aquí se almacenarán las URLs de las imágenes
    const modalVisible = ref(false); // Controla la visibilidad del modal
    const modalImage = ref(null); // Almacena la URL de la imagen que se muestra en el modal

    const fetchImageUrls = async () => {
      const totalImages = 42; // Cambia este número según el total de imágenes que tengas
      const urls = Array.from({ length: totalImages }, (_, i) =>
        `/assets/images/foto-real-facup-${i + 1}.webp`
      );
      return urls; // Retorna el array de URLs
    };

    const openModal = (imageUrl) => {
      modalImage.value = imageUrl; // Asigna la URL de la imagen al modal
      modalVisible.value = true; // Muestra el modal
      document.body.style.overflow = 'hidden'; // Desactiva el scroll del sitio web
    };

    const closeModal = () => {
      modalVisible.value = false; // Oculta el modal
      modalImage.value = null; // Limpia la imagen del modal
      document.body.style.overflow = ''; // Reactiva el scroll del sitio web
    };

    onMounted(async () => {
      try {
        imageUrls.value = await fetchImageUrls();
        if (!imageUrls.value.length) {
          throw new Error("No se encontraron imágenes.");
        }
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      }
    });

    return {
      imageUrls,
      modalVisible,
      modalImage,
      openModal,
      closeModal,
    };
  }
}
</script>

<style scoped>
body {
  margin: 0;
}

.container {
  position: relative;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-400px * 50)); }
}

.slider {
  background: black;
  height: 500px;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 100vw;
}

.slide-track {
  display: flex;
  width: calc(300px * 100);
  animation: scroll 80s linear infinite;
}

.slide img {
  height: 350px;
  width: 350px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin: 20px;
  border-radius: 45px;
  object-fit: cover;
  position: relative;
  top: 100px;
}

.slide img:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

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
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.modal-content {
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.close:hover {
  transform: scale(1.2);
}

.modal-content img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 20px;
}
</style>
