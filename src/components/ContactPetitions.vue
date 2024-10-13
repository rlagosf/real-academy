<template>
  <div>
    <!-- Mostrar LoadingReal mientras loading sea true -->
    <LoadingReal v-if="loading" />

    <!-- Mostrar el contenido completo solo si loading es false -->
    <div v-if="!loading" class="contact-petitions-container">
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
    }
  }
};
</script>

<style scoped>
.contact-petitions-container {
    background-color: white;
    padding: 20px;
    font-family: 'Bebas Neue', sans-serif;
    text-align: center; /* Centrar el contenido dentro del contenedor */
}

.login-logo {
    width: 150px;
    margin-bottom: 20px;
}

/* Centrar el título */
.title-center {
    text-align: center; /* Asegura que el texto dentro del h1 esté centrado */
    color: black;
    margin-bottom: 20px;
    font-size: 2em; /* Ajuste opcional del tamaño del texto */
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 3px solid #ff007f; /* Borde grueso color #ff007f */
    border-radius: 30px; /* Esquinas redondeadas */
    overflow: hidden; /* Asegurar que las esquinas redondeadas afecten el contenido */
    margin-top: 20px; /* Separación superior respecto al título */
}

th,
td {
    border: 2px solid #ff007f; /* Línea divisoria gruesa */
    padding: 10px;
    text-align: left;
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
</style>
