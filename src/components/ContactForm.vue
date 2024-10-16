<template>
  <section class="contact-form" id="contact" ref="contactSection">
    <h2>Contáctanos</h2>

    <!-- Mensaje de error -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Mostrar formulario si no está cargando ni enviado con éxito -->
    <form v-if="!isLoading && !formSuccess" @submit.prevent="submitForm">
      <input type="text" v-model="form.name" placeholder="Nombre" required @input="validateName" ref="formInputs" />
      <input type="tel" v-model="form.phone" placeholder="Teléfono" required pattern="[0-9]*" maxlength="9"
        @input="validatePhone" ref="formInputs" />
      <input type="text" v-model="form.address" placeholder="Dirección" required ref="formInputs" />
      <input type="email" v-model="form.email" placeholder="Correo Electrónico" required ref="formInputs" />
      <select v-model="form.source" required ref="formInputs">
        <option disabled value="">¿Cómo conociste la academia?</option>
        <!-- Llenar dinámicamente las opciones -->
        <option v-for="source in sources" :key="source.id" :value="source.id">
          {{ source.name }}
        </option>
      </select>
      <button type="submit" ref="formButton" class="form-button">Enviar</button>
    </form>

    <!-- Componente de loading mientras se envía el formulario -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-logo">
        <img src="/assets/logos/logo-sin-fondo.png" alt="Logo de la Academia" class="loading-blink" />
      </div>
      <p>Estamos cargando tu solicitud...</p>
      <div class="loading-bar">
        <div class="loading-progress"></div>
      </div>
    </div>

    <!-- Mostrar mensaje de éxito si el formulario se envió correctamente -->
    <div v-if="formSuccess" class="success-message visible">
      <img src="/assets/logos/logo-sin-fondo.png" alt="Logo de la Academia" />
      <h2>¡Formulario Enviado!</h2>
      <p>Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
      <p>A continuación, serás redirigido a la página de inicio.</p>
      <p>Redireccionando...</p>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactForm',
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        email: '',
        source: ''
      },
      isLoading: false,  
      formSuccess: false, 
      sources: [], 
      errorMessage: '',  // Agregado para mostrar errores
    };
  },
  methods: {
    async submitForm() {
      try {
        this.isLoading = true;
        this.errorMessage = ''; // Limpiar errores previos

        // Convertir datos del formulario a mayúsculas
        const upperCaseForm = {
          name: this.form.name.toUpperCase(),
          phone: this.form.phone,
          address: this.form.address.toUpperCase(),
          email: this.form.email,
          source: this.form.source,  // No convertir el ID a mayúsculas
        };

        const response = await axios.post('http://localhost:3000/api/contact', upperCaseForm);

        if (response.status === 201) {
          setTimeout(() => {
            this.isLoading = false;
            this.formSuccess = true;
            setTimeout(() => {
              window.scrollTo(0, 0);
              location.reload();
            }, 3000);
          }, 2000);
        } else {
          this.errorMessage = 'Hubo un problema al enviar el formulario. Inténtalo nuevamente.';
          this.isLoading = false;
        }
      } catch (error) {
        this.errorMessage = 'Error al enviar el formulario. Por favor, revisa los datos e intenta de nuevo.';
        this.isLoading = false;
      }
    },
    async getSources() {
      try {
        const response = await axios.get('http://localhost:3000/api/data/sources');
        this.sources = response.data;
      } catch (error) {
        this.errorMessage = 'Hubo un error al obtener las fuentes. Intenta nuevamente más tarde.';
      }
    },
    validatePhone() {
      this.form.phone = this.form.phone.replace(/[^0-9]/g, '').slice(0, 9);
    },
    validateName() {
      const pattern = /^(?!.*(.)\1{2,})[a-zA-Z\s]*$/;
      if (!pattern.test(this.form.name)) {
        this.errorMessage = 'Por favor, ingresa un nombre válido. Evita caracteres repetidos.';
        this.form.name = ''; 
      } else {
        this.errorMessage = ''; // Limpiar mensaje de error
      }
    },
  },
  mounted() {
    this.getSources();

    const contactElements = this.$refs.contactSection.querySelectorAll('input, select, button, .success-message');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    });

    contactElements.forEach((item) => {
      observer.observe(item);
    });
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
}
.contact-form {
  padding: 60px 30px;
  background-color: #000;
  color: white;
  text-align: center;
}

h2 {
  color: #FF007F;
  margin-bottom: 30px;
}

/* Animación para elementos visibles */
input,
select,
button,
/* Añadido el botón aquí */
.success-message {
  opacity: 0;
  /* Oculto inicialmente */
  transform: translateY(20px);
  /* Desplazado inicialmente hacia abajo */
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  /* Transición para opacidad y movimiento */
}

/* Clase visible para aplicar la animación */
input.visible,
select.visible,
button.visible,
/* Clase visible para el botón */
.success-message.visible {
  opacity: 1;
  /* Aparece */
  transform: translateY(0);
  /* Posición original */
}

form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.form-button {
  opacity: 0;
  /* Oculto inicialmente */
  transform: translateY(20px);
  /* Desplazado inicialmente hacia abajo */
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  /* Transición para opacidad y movimiento */
}

.form-button.visible {
  opacity: 1;
  /* Aparece */
  transform: translateY(0);
  /* Posición original */
}

input,
select {
  font-family: 'Bebas Neue', sans-serif;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #FF007F;
  border-radius: 5px;
  background-color: black;
  color: white;
}

button {
  padding: 10px;
  font-family: 'Bebas Neue', sans-serif;
  border: none;
  border-radius: 5px;
  background-color: #FF007F;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e6006f;
}

/* Estilos para el loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.loading-logo img {
  width: 200px;
  margin-bottom: 20px;
}

.loading-blink {
  animation: blink 1.5s infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.loading-bar {
  width: 80%;
  background-color: black;
  border-radius: 5px;
  border: 1px solid white;
  margin-top: 20px;
}

.loading-progress {
  width: 0;
  height: 15px;
  background-color: white;
  border-radius: 5px;
  animation: loadBar 2s forwards;
}

@keyframes loadBar {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}

.success-message {
  text-align: center;
}

.success-message img {
  max-width: 200px;
}

.success-message h2 {
  margin-top: 20px;
  color: #FF007F;
}

.success-message p {
  margin: 20px 0;
  color: #fff;
}

.success-message {
  opacity: 0;
  /* Oculto inicialmente */
  transform: translateY(20px);
  /* Desplazado inicialmente hacia abajo */
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  /* Transición para opacidad y movimiento */
}

.success-message.visible {
  opacity: 1;
  /* Aparece */
  transform: translateY(0);
  /* Posición original */
}
</style>
