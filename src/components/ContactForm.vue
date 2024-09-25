<template>
  <section class="contact-form" id="contact">
    <h2>Contáctanos</h2>
    <form v-if="!formSuccess" @submit.prevent="submitForm">
      <input 
        type="text" 
        v-model="form.name" 
        placeholder="Nombre" 
        required 
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

    <!-- Mostrar mensaje de éxito si el formulario se envió correctamente -->
    <div v-if="formSuccess" class="success-message">
      <img src="/real-academy-fc/logo-en-blanco.png" alt="Logo de la Academia" />
      <h2>¡Formulario Enviado!</h2>
      <p>Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
      <button @click="resetForm">Volver al formulario</button>
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
      formSuccess: false, // Estado para saber si el formulario fue enviado con éxito
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/api/contact', this.form);
        console.log('Respuesta del servidor:', response);

        // Si el servidor responde con éxito, mostrar el componente de éxito
        if (response.status === 201) {
          this.formSuccess = true;
        } else {
          alert('Hubo un problema al enviar el formulario, intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario. Por favor, revisa los datos e intenta de nuevo.');
      }
    },
    validatePhone() {
      // Asegúrate de que solo se ingresen números y que no exceda 9 dígitos
      this.form.phone = this.form.phone.replace(/[^0-9]/g, '').slice(0, 9);
    },
    resetForm() {
      // Restablecer el formulario después del éxito
      this.form.name = '';
      this.form.phone = '';
      this.form.address = '';
      this.form.email = '';
      this.form.source = '';
      this.formSuccess = false;
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
