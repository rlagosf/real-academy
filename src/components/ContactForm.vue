<template>
  <section class="contact-form" id="contact">
    <h2>Contáctanos</h2>
    
    <!-- Mostrar formulario si no está cargando ni enviado con éxito -->
    <form v-if="!isLoading && !formSuccess" @submit.prevent="submitForm">
      <input 
        type="text" 
        v-model="form.name" 
        placeholder="Nombre" 
        required 
        @input="validateName" 
      />
      <input 
        type="tel" 
        v-model="form.phone" 
        placeholder="Teléfono" 
        required 
        pattern="[0-9]*" 
        maxlength="9" 
        @input="validatePhone" 
      />
      <input 
        type="text" 
        v-model="form.address" 
        placeholder="Dirección" 
        required 
      />
      <input 
        type="email" 
        v-model="form.email" 
        placeholder="Correo Electrónico" 
        required 
      />
      <select v-model="form.source" required>
        <option disabled value="">¿Cómo conociste la academia?</option>
        <option value="social">Redes Sociales</option>
        <option value="recommendation">Recomendación</option>
        <option value="other">Otros</option>
      </select>
      <button type="submit">Enviar</button>
    </form>

    <!-- Componente de loading mientras se envía el formulario -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-logo">
        <img src="/real-academy-fc/logo-en-blanco.png" alt="Logo de la Academia" class="loading-blink"/>
      </div>
      <p>Estamos cargando tu solicitud...</p>
      <div class="loading-bar">
        <div class="loading-progress"></div>
      </div>
    </div>

    <!-- Mostrar mensaje de éxito si el formulario se envió correctamente -->
    <div v-if="formSuccess" class="success-message">
      <img src="/real-academy-fc/logo-en-blanco.png" alt="Logo de la Academia" />
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
      isLoading: false,  // Estado de loading
      formSuccess: false, // Estado para saber si el formulario fue enviado con éxito
    };
  },
  methods: {
    async submitForm() {
      try {
        this.isLoading = true;  // Mostrar el componente de loading

        // Convertir los datos del formulario a mayúsculas
        const upperCaseForm = {
          name: this.form.name.toUpperCase(),
          phone: this.form.phone,
          address: this.form.address.toUpperCase(),
          email: this.form.email.toUpperCase(),
          source: this.form.source.toUpperCase(),
        };

        const response = await axios.post('http://localhost:3000/api/contact', upperCaseForm);

        // Si el servidor responde con éxito, mostrar el mensaje de éxito
        if (response.status === 201) {
          setTimeout(() => {
            this.isLoading = false;
            this.formSuccess = true;
            // Redirigir a la página de inicio después de unos segundos
            setTimeout(() => {
              location.reload(); // Recargar la misma página
            }, 3000);  // Esperar 3 segundos
          }, 2000);  // Tiempo de simulación del loading
        } else {
          alert('Hubo un problema al enviar el formulario, intenta nuevamente.');
          this.isLoading = false;
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario. Por favor, revisa los datos e intenta de nuevo.');
        this.isLoading = false;
      }
    },
    validatePhone() {
      // Asegúrate de que solo se ingresen números y que no exceda 9 dígitos
      this.form.phone = this.form.phone.replace(/[^0-9]/g, '').slice(0, 9);
    },
    validateName() {
      // Validar que el nombre no contenga solo caracteres repetidos o inapropiados
      const pattern = /^(?!.*(.)\1{2,})[a-zA-Z\s]*$/; // No más de dos caracteres repetidos
      if (!pattern.test(this.form.name)) {
        alert('Por favor, ingresa un nombre válido. Evita usar caracteres repetidos o inapropiados.');
        this.form.name = ''; // Limpia el campo
      }
    },
    resetForm() {
      // Restablecer el formulario después del éxito
      this.form.name = '';
      this.form.phone = '';
      this.form.address = '';
      this.form.email = '';
      this.form.source = '';
      this.formSuccess = false;
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
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

form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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
  width: 100px;
  margin-bottom: 20px;
}

.loading-blink {
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
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
  0% { width: 0; }
  100% { width: 100%; }
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
</style>
