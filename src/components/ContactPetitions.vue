<template>
    <div class="contact-petitions-container">
      <img src="/assets/logos/logo-en-negativo.png" alt="Logo" class="login-logo" />
      <h1>Solicitudes Pendientes</h1>
  
      <!-- Muestra la barra de carga mientras se cargan los datos -->
      <LoadingReal v-if="loading" />
  
      <table v-if="!loading">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Email</th>
            <th>Source</th>
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
  }
  
  .login-logo {
    width: 180px; /* Aumenta el tamaño del logo */
    margin-bottom: 20px;
  }
  
  h1 {
    color: #2c3e50;
    text-align: center; /* Centra el título */
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border: 3px solid #ff007f; /* Borde grueso color #ff007f */
    border-radius: 30px; /* Esquinas redondeadas más visibles */
  }
  
  th,
  td {
    border: 2px solid #ff007f; /* Línea divisoria gruesa */
    padding: 10px;
    text-align: center; /* Centra el texto en las celdas */
  }
  
  th {
    background-color: black; /* Fondo negro para los encabezados */
    color: white; /* Texto blanco en los encabezados */
  }
  
  tbody tr:hover {
    background-color: #f1f1f1; /* Color de fondo al pasar el ratón */
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
  