<template>
  <div>
    <!-- Mostrar LoadingReal mientras loading sea true -->
    <LoadingReal v-if="loading" />

    <!-- Mostrar el contenido completo solo si loading es false -->
    <div v-if="!loading" class="subscribed-kids-container">
      <!-- Botón para redirigir al Dashboard en la esquina superior derecha -->
      <button class="back-to-dashboard" @click="goToDashboard">
        <i class="fas fa-arrow-left back-arrow"></i>
        <i class="fas fa-door-open door-icon"></i>
        <span class="back-text">Volver al Dashboard</span>
      </button>

      <img src="/assets/logos/logo-en-negativo.png" alt="Logo" class="login-logo" />
      <h1 class="title-center">Alumnos Inscritos</h1>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>RUT</th>
              <th>Dirección</th>
              <th>Peso</th>
              <th>Estatura</th>
              <th>Edad</th>
              <th>Posición de fútbol</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="kid in kids" :key="kid.rut">
              <td>{{ kid.name }}</td>
              <td>{{ kid.rut }}</td>
              <td>{{ kid.address }}</td>
              <td>{{ kid.weight }}</td>
              <td>{{ kid.height }}</td>
              <td>{{ kid.age }}</td>
              <td>{{ kid.football_position }}</td>
              <td>{{ kid.category_id }}</td>
              <td>
                <button @click="editKid(kid)">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button @click="deleteKid(kid.rut)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingReal from './LoadingReal.vue'; // Importar el componente LoadingReal

export default {
  name: 'SubscribedKids',
  components: {
    LoadingReal // Registrar el componente LoadingReal
  },
  data() {
    return {
      kids: [],
      loading: true // Definir loading como true inicialmente
    };
  },
  mounted() {
    this.fetchSubscribedKids();
  },
  methods: {
    async fetchSubscribedKids() {
      try {
        const response = await axios.get('http://localhost:3000/api/student');
        this.kids = response.data;
      } catch (error) {
        console.error('Error al obtener los alumnos inscritos:', error);
      } finally {
        this.loading = false; // Desactivar el loading después de cargar los datos
      }
    },
    deleteKid(rut) {
      const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar a ${rut}?`);
      if (confirmDelete) {
        axios.delete(`http://localhost:3000/api/student/${rut}`)
          .then(() => {
            this.kids = this.kids.filter(k => k.rut !== rut);
          })
          .catch(error => {
            console.error('Error al eliminar el alumno:', error);
          });
      }
    },
    editKid(kid) {
      alert(`Editando a: ${kid.name}`);
    },
    // Método para redirigir al Dashboard usando this.$router
    goToDashboard() {
      this.$router.push({ name: 'Dashboard' }); // Usar $router en lugar de useRouter
    }
  }
};
</script>

<style scoped>
.subscribed-kids-container {
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
</style>
