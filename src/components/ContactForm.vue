<template>
    <section class="contact-form" id="contact">
      <h2>Contactanos</h2>
      <form @submit.prevent="submitForm">
        <input type="text" v-model="form.name" placeholder="Nombre" required />
        <input type="tel" v-model="form.phone" placeholder="Teléfono" required />
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
      submitForm() {
        // Aquí puedes manejar el envío del formulario
        alert('Formulario enviado');
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
  