<template>
  <section class="photo-gallery">
    <h2>Galería de Fotos</h2>
    <div class="carousel-wrapper">
      <!-- Carrusel de Swiper -->
      <swiper
        :slides-per-view="1"
        :loop="true"
        :centered-slides="true"
        :pagination="{ clickable: true }"
        :navigation="true"
        class="my-swiper"
      >
        <swiper-slide v-for="n in totalImages" :key="n" class="slide">
          <img
            :src="getImagePath(n)"
            alt="Foto de galería"
            class="carousel-image"
            @click="openModal(n)"
          />
        </swiper-slide>

        <!-- Paginación (puntos) -->
        <div class="swiper-pagination"></div>

        <!-- Botones de navegación -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </swiper>
    </div>

    <!-- Modal para la imagen en tamaño completo -->
    <transition name="modal-transition">
      <div v-if="showModal" class="modal" @click="closeModal">
        <span class="close">&times;</span>
        <img class="modal-content" :src="getImagePath(selectedImage)" />
      </div>
    </transition>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  name: 'PhotoGallery',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      showModal: false,
      selectedImage: null,
      totalImages: 10, // Número total de imágenes
    };
  },
  methods: {
    getImagePath(n) {
      return `/real-academy-fc/fotos-real/foto-real-facup-${n}.jpeg`;
    },
    openModal(n) {
      this.selectedImage = n;
      this.showModal = true;
      document.body.style.overflow = 'hidden'; // Desactivar scroll cuando el modal esté abierto
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = 'auto'; // Activar scroll cuando el modal se cierre
    },
  },
};
</script>

<style scoped>
.photo-gallery {
  padding: 60px 30px;
  background-color: #fff;
  text-align: center;
}

h2 {
  color: #FF007F;
  margin-bottom: 30px;
}

/* Contenedor del carrusel */
.carousel-wrapper {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.my-swiper {
  width: 100%;
}

.carousel-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
}

/* Modal */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
  margin: auto;
  display: block;
  border-radius: 0; /* Eliminar border-radius del modal */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #ff007f;
  cursor: pointer;
}

/* Efecto de transición en el modal */
.modal-transition-enter-active, .modal-transition-leave-active {
  transition: opacity 0.5s ease;
}
.modal-transition-enter, .modal-transition-leave-to {
  opacity: 0;
}

/* Paginación de Swiper */
.swiper-pagination {
  bottom: 10px;
}

.swiper-pagination-bullet {
  background-color: #ccc;
}

.swiper-pagination-bullet-active {
  background-color: #FF007F;
}

/* Botones de navegación */
.swiper-button-next,
.swiper-button-prev {
  color: #FF007F;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 20px;
}

/* Responsividad */
@media screen and (max-width: 768px) {
  .carousel-wrapper {
    max-width: 100%;
  }
}
</style>
