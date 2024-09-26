<template>
  <footer class="real-foot">
    <div class="social-icons">
      <!-- Enlace a WhatsApp -->
      <a :href="whatsappLink" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-whatsapp"></i>
      </a>
      <!-- Enlace a Instagram -->
      <a :href="instagramLink" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-instagram"></i>
      </a>
      <!-- Alerta de Facebook (en construcción) -->
      <a @click="showFacebookAlert" href="javascript:void(0)" rel="noopener noreferrer">
        <i class="fab fa-facebook-f"></i>
      </a>
      <!-- Enlace a LinkedIn -->
      <a :href="linkedinLink" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-linkedin"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'RealFoot', // Nombre del componente
  data() {
    return {
      whatsappNumber: '+56989920340', // Número de WhatsApp para contacto
      instagramLink: 'https://www.instagram.com/realacademyf.c', // Enlace al perfil de Instagram
      whatsappLink: 'https://wa.me/56989920340', // Enlace directo para iniciar chat en WhatsApp
      linkedinLink: 'https://www.linkedin.com/in/rodrigo-lagos-fernandez-403a33173/' // Enlace al perfil de LinkedIn
    };
  },
  methods: {
    // Método para mostrar alerta de Facebook
    showFacebookAlert() {
      alert('Red social en creación'); // Mensaje de alerta al hacer clic en el icono de Facebook
    }
  }
};
</script>

<style scoped>
.real-foot {
  padding: 20px; /* Espaciado interno del footer */
  background-color: #000; /* Color de fondo del footer */
  color: white; /* Color del texto */
  text-align: center; /* Centra el contenido dentro del footer */
}

.social-icons {
  display: flex; /* Utiliza flexbox para alinear los iconos horizontalmente */
  justify-content: center; /* Centra los iconos dentro del footer */
  gap: 60px; /* Aumenta el espacio entre los iconos */
}

.social-icons a {
  color: white; /* Color de los iconos */
  font-size: 2.8em; /* Tamaño de los iconos */
}

.social-icons a:hover {
  color: #FF007F; /* Cambia el color del icono al pasar el mouse */
}

/* Información de contacto adicional (si se requiere en el futuro) */
.contact-info {
  margin-top: 10px; /* Espacio adicional para la información de contacto */
}

.contact-info a {
  color: #FF007F; /* Color para el número de WhatsApp */
}
</style>
