<template>
  <div>
    <!-- Mostrar LoadingReal mientras loading sea true -->
    <LoadingReal v-if="loading" />

    <!-- Mostrar el contenido completo solo si loading es false -->
    <div v-if="!loading" class="contact-petitions-container">
      <!-- Botón para redirigir al Dashboard en la esquina superior derecha -->
      <button class="back-to-dashboard" @click="goToDashboard">
        <span class="button-text">
          <i class="fas fa-arrow-left"></i> Volver al Dashboard
        </span>
        <i class="fas fa-door-open"></i> <!-- Icono de abrir la puerta que aparece en pantallas pequeñas -->
      </button>

      <img src="/assets/logos/logo-en-negativo.png" alt="Logo" class="login-logo" />
      <h1 class="title-center">Solicitudes Pendientes</h1> <!-- Añadí la clase title-center -->

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Email</th>
            <th>¿Como nos conocio?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="petition in contactPetitions" :key="petition.email">
            <td>{{ petition.name }}</td>
            <td>{{ petition.phone }}</td>
            <td>{{ petition.address }}</td>
            <td>{{ petition.email }}</td>
            <td>{{ petition.source }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingReal from './LoadingReal.vue';  // Importa el componente de carga

export default {
  name: 'ContactPetitions',
  components: {
    LoadingReal
  },
  data() {
    return {
      contactPetitions: [],
      loading: true // Indica si los datos se están cargando
    };
  },
  created() {
    this.fetchContactPetitions();
  },
  methods: {
    async fetchContactPetitions() {
      try {
        const response = await axios.get('http://localhost:3000/api/contact');
        this.contactPetitions = response.data.contactPetitions;
      } catch (error) {
        console.error('Error al obtener las solicitudes de contacto:', error);
      } finally {
        this.loading = false; // Desactiva la carga una vez obtenidos los datos
      }
    },
    // Método para redirigir al Dashboard usando $router
    goToDashboard() {
      this.$router.push({ name: 'Dashboard' }); // Usar $router en lugar de useRouter
    }
  }
};
</script>

<style scoped>
.contact-petitions-container {
  background-color: white;
  padding: 20px;
  font-family: 'Bebas Neue', sans-serif;
  text-align: center;
  position: relative; /* Para que el botón se posicione correctamente dentro del contenedor */
}

.back-to-dashboard {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #ff007f;
  color: white;
  padding: 10px 15px;
  font-family: 'Bebas Neue', sans-serif;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.back-to-dashboard i {
  margin-right: 8px;
  display: inline-block; /* Mostrar el ícono de la flecha en pantallas grandes */
}

.back-to-dashboard .fas.fa-door-open {
  display: none; /* Ocultar el ícono de la puerta abierta en pantallas grandes */
}

.back-to-dashboard:hover {
  background-color: #e6006f;
}

.button-text {
  display: inline-block;
}

.login-logo {
  width: 150px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.title-center {
  text-align: center;
  color: black;
  margin-bottom: 20px;
  font-size: 2em;
}

/* Tabla responsive */
.table-responsive {
  overflow-x: auto; /* Añadir scroll horizontal para dispositivos pequeños */
}

table {
  width: 100%;
  border-collapse: absolute;
  border-spacing: 1;
  margin-top: 20px;
  border-radius: 0px;
  overflow: hidden;
  box-shadow: 0 0 0 0px #ff007f;
}

th, td {
  border: 0.8px solid #ff007f;
  padding: 5px;
  text-align: center;
}

th {
  background-color: black;
  color: white;
  text-align: center;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  color: #2c3e50;
}

button i {
  font-size: 20px;
}

button:hover {
  opacity: 0.7;
}

/* Reglas para dispositivos pequeños */
@media (max-width: 768px) {
  .title-center {
    font-size: 1.5em; /* Ajustar el tamaño del título */
  }

  th, td {
    padding: 8px;
    font-size: 0.9em; /* Reducir el tamaño de texto en las celdas */
  }

  .back-to-dashboard .button-text {
    display: inline-block;
  }

  .back-to-dashboard .fas.fa-door-open {
    display: none; /* El ícono de la puerta sigue oculto en pantallas pequeñas */
  }
}

/* Reglas para dispositivos muy pequeños (e.g., 375x667) */
@media (max-width: 480px) {
  .login-logo {
    width: 120px; /* Ajustar el tamaño del logo */
  }

  th, td {
    padding: 6px;
    font-size: 0.8em; /* Reducir aún más el tamaño de texto en las celdas */
  }

  button i {
    font-size: 14px; /* Reducir el tamaño de los íconos de los botones */
  }

  .back-to-dashboard .button-text {
    display: none; /* Ocultar el texto en pantallas muy pequeñas */
  }

  .back-to-dashboard .fas.fa-arrow-left {
    display: none; /* Ocultar el ícono de la flecha en pantallas muy pequeñas */
  }

  .back-to-dashboard .fas.fa-door-open {
    display: inline-block; /* Mostrar el ícono de abrir la puerta */
  }

  .table-responsive {
    overflow-x: scroll; /* Asegurarse de que la tabla pueda desplazarse horizontalmente en pantallas muy pequeñas */
  }
}
</style>
