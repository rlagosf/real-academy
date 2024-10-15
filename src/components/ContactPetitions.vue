<template>
  <div>
    <!-- Mostrar LoadingReal mientras loading sea true -->
    <LoadingReal v-if="loading" />

    <!-- Mostrar el contenido completo solo si loading es false -->
    <div v-if="!loading" class="contact-petitions-container">
      <!-- Botón para redirigir al Dashboard en la esquina superior derecha -->
      <button class="back-to-dashboard" @click="goToDashboard">
        <span class="button-text">
          <i class="fas fa-arrow-left back-arrow"></i> 
          <span class="back-text">Volver al Dashboard</span>
        </span>
        <i class="fas fa-door-open door-icon"></i> <!-- Icono de abrir la puerta que aparece en pantallas pequeñas -->
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
            <td>{{ getSourceName(petition.source) }}</td>
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
      loading: true, // Indica si los datos se están cargando
      sources: []
    };
  },
  created() {
    this.fetchContactPetitions();
    this.fetchSources();
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
    async fetchSources() {
      try {
        const response = await axios.get('http://localhost:3000/api/data/sources');
        console.log('Sources obtenidos:', response.data);
        this.sources = response.data;  // Guardar las profesiones en el estado
      } catch (error) {
        console.error('Error al obtener las profesiones:', error);
      }
    },
    getSourceName(sourceId) {
    const source = this.sources.find(source => source.id === sourceId);
    return source ? source.name : 'Desconocido'; // Retorna 'Desconocido' si no se encuentra el ID
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
  position: relative;
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
  justify-content: center;
  gap: 8px;
  transition: padding 0.3s ease-in-out;
}

.back-to-dashboard .back-arrow {
  margin-right: 8px;
}

.back-to-dashboard .door-icon {
  display: none;
}

.back-to-dashboard .back-text {
  display: inline-block;
}

.back-to-dashboard:hover {
  background-color: #e6006f;
}

/* Responsividad */
@media (max-width: 768px) {
  .back-to-dashboard {
    padding: 8px 12px;
    font-size: 12px;
  }

  .back-to-dashboard .back-arrow {
    display: none; /* Ocultar la flecha */
  }

  .back-to-dashboard .door-icon {
    display: inline-block; /* Mostrar el icono de la puerta */
  }

  .back-to-dashboard .back-text {
    display: none; /* Ocultar el texto en pantallas pequeñas */
  }
}

@media (max-width: 480px) {
  .back-to-dashboard {
    padding: 6px 10px;
    font-size: 10px;
  }

  .back-to-dashboard .back-arrow {
    display: none; /* Ocultar la flecha */
  }

  .back-to-dashboard .door-icon {
    display: inline-block; /* Mostrar el icono de la puerta */
  }

  .back-to-dashboard .back-text {
    display: none; /* Ocultar el texto en pantallas aún más pequeñas */
  }
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

table {
  width: 100%;
  border-collapse: collapse;
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

/* Ajustes para dispositivos pequeños */
@media (max-width: 375px) {
  .contact-petitions-container {
    overflow-x: auto; /* Permitir scroll horizontal si el contenido se sale */
    padding: 10px; /* Reducir el padding */
  }

  table {
    width: 100%; /* Asegurarse de que la tabla no sea más ancha que el contenedor */
    table-layout: fixed; /* Forzar que las columnas tengan un ancho fijo para evitar desbordes */
    overflow-x: auto;
    display: block; /* Hacer que la tabla sea bloque para permitir scroll horizontal */
  }

  th, td {
    padding: 10px 5px; /* Reducir el padding de las celdas */
    white-space: nowrap; /* Evitar que el texto se rompa en varias líneas */
  }

  .back-to-dashboard {
    padding: 6px 8px;
    font-size: 10px;
  }

  .back-to-dashboard .back-arrow {
    display: none;
  }

  .back-to-dashboard .door-icon {
    display: inline-block;
  }

  .back-to-dashboard .back-text {
    display: none;
  }
}

@media (max-width: 667px) {
  .table-responsive {
    overflow-x: auto; /* Agregar scroll si la tabla se desborda */
  }

  table {
    display: block; /* Convertir la tabla en un bloque para scroll */
    width: 100%; /* Evitar que se salga del contenedor */
  }

  th, td {
    padding: 8px; /* Ajustar padding para celdas en pantallas pequeñas */
    white-space: nowrap; /* Mantener contenido en una sola línea */
  }
}

</style>
