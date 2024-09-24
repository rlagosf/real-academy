<template>
  <section class="contact-form" id="contact">
    <h2>Contáctanos</h2>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="form.name" placeholder="Nombre" required />
      <input 
        type="tel" 
        v-model="form.phone" 
        placeholder="Teléfono" 
        required 
        pattern="[0-9]*" 
        maxlength="9" 
        @input="validatePhone"
      />
      <input type="text" v-model="form.address" placeholder="Dirección" required />
      <input type="email" v-model="form.email" placeholder="Correo Electrónico" required />
      <select v-model="form.source" required>
        <option disabled value="">¿Cómo conociste la academia?</option>
        <option value="social">Redes Sociales</option>
        <option value="recommendation">Recomendación</option>
        <option value="other">Otros</option>
      </select>
      <button type="submit">Enviar</button>
    </form>
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
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/api/contact', this.form);
        console.log('Respuesta del servidor:', response);
        alert('Formulario enviado con éxito');
        this.resetForm();
        // Redirigir a la página de éxito después de enviar
        this.$router.push({ name: 'SuccessPage' }); // Cambia 'SuccessPage' por el nombre de tu componente
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario');
      }
    },
    validatePhone() {
      // Asegúrate de que solo se ingresen números y que no exceda 9 dígitos
      this.form.phone = this.form.phone.replace(/[^0-9]/g, '').slice(0, 9);
    },
    resetForm() {
      this.form.name = '';
      this.form.phone = '';
      this.form.address = '';
      this.form.email = '';
      this.form.source = '';
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
  font-family: 'Bebas Neue', sans-serif; /* Aplica Bebas Neue como la fuente global */
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #FF007F;
  border-radius: 5px;
  background: black;
  color: white;
  background-color: black;
}

button {
  padding: 10px;
  font-family: 'Bebas Neue', sans-serif; /* Aplica Bebas Neue como la fuente global */
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
</style>
