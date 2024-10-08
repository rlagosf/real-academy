<template>
  <div class="container" id="gallery">
    <div class="slider">
      <div class="slide-track" :class="{ paused: modalVisible }">
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
            class="imagen" 
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
    const imageUrls = ref([]);
    const modalVisible = ref(false);
    const modalImage = ref(null);

    const fetchImageUrls = async () => {
      const totalImages = 41;
      const urls = Array.from({ length: totalImages }, (_, i) =>
        `/assets/images/foto-real-facup-${i + 1}.webp`
      );
      return urls;
    };

    const openModal = (imageUrl) => {
      modalImage.value = imageUrl;
      modalVisible.value = true;
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modalVisible.value = false;
      modalImage.value = null;
      document.body.style.overflow = '';
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
  animation: scroll 160s linear infinite; /* Carrusel más lento */
}

.slide-track.paused {
  animation-play-state: paused; /* Pausar el carrusel */
}

.slide img {
  height: 350px;
  width: 350px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease; /* Manteniendo la transición */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin: 20px;
  border-radius: 45px;
  object-fit: cover;
  position: relative;
  top: 100px;
}

.imagen:hover {
  border-radius: 50%;
  -webkit-border-radius: 50%;
  box-shadow: 0px 0px 15px 15px #FF007F;
  -webkit-box-shadow: 0px 0px 15px 15px #FF007F;
  /* transform: rotate(90deg);
  -webkit-transform: rotate(360deg); */
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
