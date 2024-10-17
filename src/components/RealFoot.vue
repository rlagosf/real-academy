<template>
  <footer class="real-foot" ref="footer">
    <div class="social-icons">
      <!-- Enlace a WhatsApp -->
      <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="social-icon">
        <i class="fab fa-whatsapp"></i>
      </a>
      <!-- Enlace a Instagram -->
      <a :href="instagramLink" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon">
        <i class="fab fa-instagram"></i>
      </a>
      <!-- Alerta de Facebook (en construcción) -->
      <a @click="showFacebookAlert" href="javascript:void(0)" rel="noopener noreferrer" aria-label="Facebook en construcción" class="social-icon">
        <i class="fab fa-facebook-f"></i>
      </a>
      <!-- Enlace a LinkedIn -->
      <a :href="linkedinLink" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon">
        <i class="fab fa-linkedin"></i>
      </a>
    </div>
    <!-- Texto de derechos reservados -->
    <p class="rights-text" ref="rightsText">Todos los derechos reservados por Real Academy F.C</p>
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
  mounted() {
    // Seleccionamos el pie de página y el texto de derechos reservados para el IntersectionObserver
    const footer = this.$refs.footer.querySelector('.social-icons');
    const rightsText = this.$refs.rightsText; // Seleccionamos el texto de derechos reservados

    // IntersectionObserver para aplicar animaciones al scrollear
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    });

    // Observar los iconos sociales y el texto de derechos reservados
    observer.observe(footer);
    observer.observe(rightsText);
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
  padding: 20px;
  background-color: #000;
  color: white;
  text-align: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.social-icons.visible {
  opacity: 1;
  transform: translateY(0);
}

.social-icons a {
  color: white;
  font-size: 2.8em;
}

.social-icons a:hover {
  color: #FF007F;
}

/* Estilos para el texto de derechos reservados */
.rights-text {
  margin-top: 10px;
  font-size: 1em;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.rights-text.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
