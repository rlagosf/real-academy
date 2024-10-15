<template>
  <section class="contact-form" id="contact" ref="contactSection">
    <h2>Contáctanos</h2>
    
    <!-- Mostrar formulario si no está cargando ni enviado con éxito -->
    <form v-if="!isLoading && !formSuccess" @submit.prevent="submitForm">
      <input 
        type="text" 
        v-model="form.name" 
        placeholder="Nombre" 
        required 
        @input="validateName" 
        ref="formInputs"
      />
      <input 
        type="tel" 
        v-model="form.phone" 
        placeholder="Teléfono" 
        required 
        pattern="[0-9]*" 
        maxlength="9" 
        @input="validatePhone" 
        ref="formInputs"
      />
      <input 
        type="text" 
        v-model="form.address" 
        placeholder="Dirección" 
        required 
        ref="formInputs"
      />
      <input 
        type="email" 
        v-model="form.email" 
        placeholder="Correo Electrónico" 
        required 
        ref="formInputs"
      />
      <select v-model="form.source" required ref="formInputs">
      <option disabled value="">¿Cómo conociste la academia?</option>
      <!-- Aquí llenaremos dinámicamente las opciones -->
      <option v-for="source in sources" :key="source.id" :value="source.id">
        {{ source.name }}
      </option>
    </select>
      <!-- Añadido ref para el botón -->
      <button type="submit" ref="formButton" class="form-button">Enviar</button>
    </form>

    <!-- Componente de loading mientras se envía el formulario -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-logo">
        <img src="/assets/logos/logo-sin-fondo.png" alt="Logo de la Academia" class="loading-blink"/>
      </div>
      <p>Estamos cargando tu solicitud...</p>
      <div class="loading-bar">
        <div class="loading-progress"></div>
      </div>
    </div>

    <!-- Mostrar mensaje de éxito si el formulario se envió correctamente -->
    <div v-if="formSuccess" class="success-message visible"> <!-- Agrega la clase visible -->
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
      isLoading: false,  // Estado de loading
      formSuccess: false, // Estado para saber si el formulario fue enviado con éxito
      sources: [] 
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
      email: this.form.email,
      source: this.form.source.toUpperCase(),
    };

    const response = await axios.post('http://localhost:3000/api/contact', upperCaseForm);

    // Si el servidor responde con éxito, mostrar el mensaje de éxito
    if (response.status === 201) {
      setTimeout(() => {
        this.isLoading = false; // Ocultar el componente de loading
        this.formSuccess = true; // Mostrar mensaje de éxito
        // Redirigir a la página de inicio después de unos segundos
        setTimeout(() => {
          window.scrollTo(0,0);
          location.reload(); // Recargar la misma página
        }, 3000);  // Esperar 3 segundos para mostrar el mensaje de éxito
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
getSources() {
      axios.get('http://localhost:3000/api/data/sources')  // Ajusta la URL según tu configuración
        .then((response) => {
          this.sources = response.data;  // Guardamos los datos en el array sources
          //console.log(response.data)
        })
        .catch((error) => {
          console.error("Hubo un error al obtener las fuentes:", error);
        });
    },
showSuccessMessage() {
  setTimeout(() => {
    // @ts-ignore
    this.$refs.successMessage.classList.add('visible'); // Agrega la clase visible para animación
  }, 100); // Espera 100ms antes de añadir la clase visible
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
  },
  mounted() {
    this.getSources();
  // Obtener todos los elementos de entrada y el botón en la sección de contacto

  // @ts-ignore
  const contactElements = this.$refs.contactSection.querySelectorAll('input, select, button, .success-message');


  // Configuración del IntersectionObserver para activar las animaciones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Añade clase visible cuando está en pantalla
      } else {
        entry.target.classList.remove('visible'); // Elimina clase cuando sale de pantalla
      }
    });
  });

  // Observar cada elemento de entrada y el botón
  contactElements.forEach((item) => {
    observer.observe(item);
  });
},

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

/* Animación para elementos visibles */
input,
select,
button, /* Añadido el botón aquí */
.success-message {
  opacity: 0; /* Oculto inicialmente */
  transform: translateY(20px); /* Desplazado inicialmente hacia abajo */
  transition: opacity 0.6s ease-out, transform 0.6s ease-out; /* Transición para opacidad y movimiento */
}

/* Clase visible para aplicar la animación */
input.visible,
select.visible,
button.visible, /* Clase visible para el botón */
.success-message.visible {
  opacity: 1; /* Aparece */
  transform: translateY(0); /* Posición original */
}

form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.form-button {
  opacity: 0; /* Oculto inicialmente */
  transform: translateY(20px); /* Desplazado inicialmente hacia abajo */
  transition: opacity 0.6s ease-out, transform 0.6s ease-out; /* Transición para opacidad y movimiento */
}

.form-button.visible {
  opacity: 1; /* Aparece */
  transform: translateY(0); /* Posición original */
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

.success-message {
  opacity: 0; /* Oculto inicialmente */
  transform: translateY(20px); /* Desplazado inicialmente hacia abajo */
  transition: opacity 0.6s ease-out, transform 0.6s ease-out; /* Transición para opacidad y movimiento */
}

.success-message.visible {
  opacity: 1; /* Aparece */
  transform: translateY(0); /* Posición original */
}
  
</style>
