<template>
  <footer class="real-foot">
    <div class="social-icons">
      <a :href="whatsappLink" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-whatsapp"></i>
      </a>
      <a :href="instagramLink" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-instagram"></i>
      </a>
      <a @click="showFacebookAlert" href="javascript:void(0)" rel="noopener noreferrer">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a :href="linkedinLink" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-linkedin"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'RealFoot',
  data() {
    return {
      whatsappNumber: '+56989920340',
      instagramLink: 'https://www.instagram.com/realacademyf.c',
      whatsappLink: 'https://wa.me/56989920340',
      linkedinLink: 'https://www.linkedin.com/in/rodrigo-lagos-fernandez-403a33173/'
    };
  },
  methods: {
    showFacebookAlert() {
      alert('Red social en creación');
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
  gap: 20px; /* Espacio entre los íconos */
}

.social-icons a {
  color: white;
  font-size: 2.8em; /* Tamaño de los íconos */
}

.social-icons a:hover {
  color: #FF007F;
}

.contact-info {
  margin-top: 10px; /* Espacio adicional para la información de contacto */
}

.contact-info a {
  color: #FF007F; /* Color para el número de WhatsApp */
}
</style>
