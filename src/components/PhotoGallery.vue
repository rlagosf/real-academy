<template>
  <div class="container" id="gallery">
    <div class="slider">
      <div class="slide-track">
        <div
          class="slide"
          v-for="(image, index) in imageUrls.concat(imageUrls)"
          :key="'first-' + index"
        >
          <img :src="image" @click="openModal(image)" alt="" />
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
export default {
  name: 'PhotoGallery',
  data() {
    return {
      imageUrls: [], // Aquí se almacenarán las URLs de las imágenes
      modalVisible: false, // Controla la visibilidad del modal
      modalImage: null // Almacena la URL de la imagen que se muestra en el modal
    };
  },
  async created() {
    // Aquí debes obtener las URLs de las imágenes, por ejemplo, desde una API
    this.imageUrls = await this.fetchImageUrls(); // Llama a la función para obtener las URLs
  },
  methods: {
    async fetchImageUrls() {
      // Implementa la lógica para obtener las URLs de las imágenes
      const totalImages = 50; // Cambia este número según el total de imágenes que tengas
      return Array.from({ length: totalImages }, (_, i) =>
        `/real-academy-fc/fotos-real/foto-real-facup-${i + 1}.jpeg` // Asegúrate de que la URL sea correcta para todas las imágenes
      );
    },
    openModal(imageUrl) {
      this.modalImage = imageUrl; // Asigna la URL de la imagen al modal
      this.modalVisible = true; // Muestra el modal
      document.body.style.overflow = 'hidden'; // Desactiva el scroll del sitio web
    },
    closeModal() {
      this.modalVisible = false; // Oculta el modal
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
  position: relative; /* Establece un contexto para los elementos hijos */
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-400px * 50)); } /* Ajusta según la cantidad de imágenes */
}

.slider {
  background: black; /* Cambia el fondo del carrusel a negro para un efecto flotante */
  height: 500px; /* Ajusta la altura del carrusel según el tamaño de las imágenes */
  margin: auto; /* Centra el carrusel */
  overflow: hidden; /* Oculta el contenido que desborda el contenedor */
  position: relative; /* Permite la posición absoluta de los hijos */
  width: 100vw; /* Abarca todo el ancho del viewport */
}

.slide-track {
  animation: scroll 80s linear infinite; /* Animación que hace que el carrusel se desplace de forma continua */
  display: flex; /* Utiliza flexbox para alinear las imágenes en fila */
  width: calc(300px * 100); /* Ajusta el ancho total de la pista del carrusel */
}

.slide img {
  height: 350px; /* Ajusta la altura de las imágenes */
  width: 350px; /* Ajusta el ancho de las imágenes para que sean cuadradas */
  cursor: pointer; /* Cambia el cursor para indicar que es clicable */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave para el zoom y el borde */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Borde difuminado entre las imágenes */
  margin: 20px; /* Separación horizontal entre las imágenes */
  border-radius: 50%; /* Hace que las imágenes sean completamente redondas */
  object-fit: cover; /* Ajusta la imagen dentro del contenedor circular sin perder proporción */
  position: relative; /* Posicionamiento relativo para ajustar el vertical */
  top: 100px; /* Baja las imágenes un poco más para centrar visualmente */
}

.slide img:hover {
  transform: scale(1.1); /* Aumenta el tamaño de la imagen al pasar el puntero */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); /* Aumenta el efecto de sombra al hacer hover */
}

/* Estilos del modal */
.modal-overlay {
  position: fixed; /* Fija el modal a la ventana */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8); /* Fondo oscuro con opacidad para el modal */
  display: flex; /* Utiliza flexbox para centrar el contenido del modal */
  align-items: center; /* Alinea verticalmente al centro */
  justify-content: center; /* Alinea horizontalmente al centro */
  z-index: 1000; /* Asegura que el modal esté sobre todo el contenido */
  opacity: 0; /* Inicialmente oculto */
  animation: fadeIn 0.5s forwards; /* Añadir animación de entrada */
}

@keyframes fadeIn {
  to {
    opacity: 1; /* Se vuelve completamente visible */
  }
}

.modal-content {
  position: relative; /* Necesario para el botón de cerrar */
}

.close {
  position: absolute; /* Colocar el botón en la esquina superior derecha */
  top: 10px;
  right: 20px;
  font-size: 24px; /* Tamaño del icono de cerrar */
  color: white; /* Color del icono de cerrar */
  cursor: pointer; /* Cambiar cursor al pasar por encima */
  transition: transform 0.3s ease; /* Transición suave para el efecto de zoom */
}

.close:hover {
  transform: scale(1.2); /* Aumenta el tamaño del icono al pasar el puntero */
}

.modal-content img {
  max-width: 90vw; /* Limita el tamaño máximo de la imagen en el modal */
  max-height: 90vh; /* Limita la altura máxima de la imagen en el modal */
  border-radius: 20px; /* Agrega un borde redondeado a la imagen del modal */
}
</style>
