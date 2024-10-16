<template>
  <div class="login-container">
    <button class="btn-home" @click="goHome">Volver al inicio</button>
    <div class="login-box">
      <img src="/assets/logos/logo-sin-fondo.png" alt="Logo" class="login-logo" />
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Usuario</label>
          <input type="text" id="username" v-model="username" placeholder="Ingresa tu usuario" required />
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" placeholder="Ingresa tu contraseña" required />
        </div>
        <button type="submit" class="btn-login">Ingresar</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginReal',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    // Método para sanitizar las entradas del usuario
    sanitizeInput(input) {
      // Reemplaza caracteres peligrosos
      return input.replace(/[<>/'";]/g, '');
    },
    async login() {
      try {
        // Sanitización de los inputs antes de enviarlos
        const sanitizedUsername = this.sanitizeInput(this.username);
        const sanitizedPassword = this.sanitizeInput(this.password);

        const response = await axios.post('http://localhost:3000/api/user/login', {
          username: sanitizedUsername,
          password: sanitizedPassword
        });

        if (response.status === 200) {
          // Almacenamos rol_id y username en localStorage
          localStorage.setItem('user_rol', response.data.user.rol_id);
          localStorage.setItem('username', response.data.user.username);

          // Redirigir al dashboard
          this.$router.push({ name: 'Dashboard' });
        } else {
          // Si el login falla, mostrar mensaje de error
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        console.error('Error en la autenticación:', error);
        this.errorMessage = 'Hubo un error en el servidor';
      }
    },
    goHome() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style scoped>
/* Estilos de la caja de login */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  /* Fondo negro */
  position: relative;
}

/* Estilos del botón "Volver a Home" */
.btn-home {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #FF007F;
  /* Color principal */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-family: 'Bebas Neue', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-home:hover {
  background-color: #e6006e;
  /* Color al hacer hover */
}

.login-box {
  background-color: #1c1c1c;
  /* Tarjeta gris oscuro */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Sombra */
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.login-logo {
  width: 150px;
  margin-bottom: 1.5rem;
}

h2 {
  margin-bottom: 1.5rem;
  color: #fff;
  /* Color del título en blanco */
  font-size: 1.8rem;
}

.input-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
  /* Etiquetas en blanco */
}

input {
  width: 93.5%;
  padding: 0.75rem;
  /* Altura del campo de texto */
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Bebas Neue', sans-serif;
  /* Fuente del proyecto */
  background-color: #2c2c2c;
  /* Fondo del campo de texto gris oscuro */
  color: #fff;
  /* Texto en blanco */
}

input:focus {
  outline: none;
  border-color: #FF007F;
  /* Color al hacer foco */
}

.btn-login {
  width: 100%;
  padding: 0.75rem;
  /* Altura del botón */
  background-color: #FF007F;
  /* Color especificado para el botón */
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Bebas Neue', sans-serif;
  /* Fuente del botón */
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login:hover {
  background-color: #e6006e;
  /* Color al hacer hover más oscuro */
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
