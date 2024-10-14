<template>
  <div>
    <!-- Mostrar LoadingReal mientras loading sea true -->
    <LoadingReal v-if="loading" />
  
    <!-- Mostrar el contenido completo solo si loading es false -->
    <div v-if="!loading" class="staff-academy-container">
      <!-- Botón para redirigir al Dashboard en la esquina superior derecha -->
      <button class="back-to-dashboard" @click="goToDashboard">
        <i class="fas fa-arrow-left back-arrow"></i> 
        <i class="fas fa-door-open door-icon"></i>
        <span class="back-text">Volver al Dashboard</span>
      </button>
  
      <img src="/assets/logos/logo-en-negativo.png" alt="Logo" class="login-logo" />
      <h1 class="title-center">Personal de la Academia</h1>
  
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Ocupación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="staff in staffMembers" :key="staff.rut">
            <td>{{ staff.name }}</td>
            <td>{{ staff.rut }}</td>
            <td>{{ staff.address }}</td>
            <td>{{ staff.phone }}</td>
            <td>{{ staff.email }}</td>
            <td>{{ staff.occupation }}</td>
            <td>
              <button @click="editStaff(staff)">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteStaff(staff.rut)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingReal from './LoadingReal.vue'; // Importar el componente LoadingReal

export default {
  name: 'StaffAcademy',
  components: {
    LoadingReal  // Registrar el componente LoadingReal
  },
  data() {
    return {
      staffMembers: [],  // Lista de miembros del staff
      loading: true      // Indicador de carga
    };
  },
  created() {
    this.fetchStaffMembers(); // Cargar los miembros del staff cuando se cree el componente
  },
  methods: {
    async fetchStaffMembers() {
      try {
        const response = await axios.get('http://localhost:3000/api/staff');
        console.log('Respuesta de la API:', response.data);  // Mostrar la respuesta de la API
        this.staffMembers = response.data;  // Asignar directamente los datos del staff
      } catch (error) {
        console.error('Error al obtener los miembros del staff:', error);
      } finally {
        this.loading = false;  // Ocultar el loader cuando los datos se carguen
      }
    },
    editStaff(staff) {
      alert(`Editando a: ${staff.name}`);
    },
    deleteStaff(rut) {
      const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar a ${rut}?`);
      if (confirmDelete) {
        this.staffMembers = this.staffMembers.filter(s => s.rut !== rut);  // Eliminar el miembro seleccionado
      }
    },
    goToDashboard() {
      this.$router.push({ name: 'Dashboard' });  // Redirigir al Dashboard
    }
  }
};
</script>

<style scoped>
.staff-academy-container {
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

.back-to-dashboard i {
  margin-right: 8px;
}

.back-to-dashboard:hover {
  background-color: #e6006f;
}

.back-arrow {
  display: inline-block;
}

.door-icon {
  display: none; /* Ocultar icono de puerta por defecto */
}

.back-text {
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

@media (max-width: 768px) {
  .title-center {
    font-size: 1.5em;
  }

  th, td {
    padding: 8px;
    font-size: 0.9em;
  }

  .back-to-dashboard {
    padding: 8px 12px;
    font-size: 12px;
  }

  .back-arrow {
    display: none; /* Ocultar la flecha */
  }

  .door-icon {
    display: inline-block; /* Mostrar el icono de la puerta */
  }

  .back-text {
    display: none; /* Ocultar el texto en pantallas pequeñas */
  }
}

@media (max-width: 480px) {
  .login-logo {
    width: 120px;
  }

  th, td {
    padding: 6px;
    font-size: 0.8em;
  }

  .back-to-dashboard {
    padding: 6px 10px;
    font-size: 10px;
  }

  .door-icon {
    display: inline-block; /* Mostrar el icono de la puerta */
  }

  .back-arrow {
    display: none; /* Ocultar la flecha */
  }

  .back-text {
    display: none; /* Ocultar el texto en pantallas aún más pequeñas */
  }
}
</style>
