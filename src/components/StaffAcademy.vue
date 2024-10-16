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
            <!-- Mostrar columna de Acciones solo si el rol es diferente a 1 -->
            <th v-if="userRol !== 1">Acciones</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="staff in staffMembers" :key="staff.rut">
            <td>{{ staff.name }}</td>
            <td>{{ staff.rut }}</td>
            <td>{{ staff.address }}</td>
            <td>{{ staff.phone }}</td>
            <td>{{ staff.email }}</td>
            <td>{{ getOccupationName(staff.occupation) }}</td>
            <!-- Mostrar botones de acciones solo si el rol es diferente a 1 -->
            <td v-if="userRol !== 1">
              <button @click="confirmDelete(staff.rut)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
      <div class="modal-content">
        <span class="modal-close" @click="closeDeleteModal">X</span>
        <h2>¿Desea eliminar el registro?</h2>
        <div class="modal-actions">
          <button class="btn-black" @click="deleteStaff">Sí, eliminar</button>
          <button class="btn-black" @click="closeDeleteModal">No, cancelar</button>
        </div>
      </div>
    </div>

    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ successMessage }}</h2>
        <button class="btn-black" @click="closeSuccessModal">Aceptar</button>
      </div>
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
      professions: [],   // Lista de profesiones
      loading: true,     // Indicador de carga
      showDeleteModal: false, // Controla la visibilidad del modal de eliminación
      staffToDelete: null, // Almacena el miembro del staff que se va a eliminar
      showSuccessModal: false,
      successMessage: '', // Asegúrate también de inicializar successMessage
      userRol : null,
    };
  },
  created() {
    this.fetchStaffMembers();  // Cargar los miembros del staff cuando se cree el componente
    this.fetchProfessions();   // Cargar las profesiones
    this.getUserRol();
  },
  methods: {
    async getUserRol() {
      // Aquí debes obtener el rol desde donde lo estés guardando (localStorage, backend, etc.)
      // Por ejemplo, si lo tienes guardado en localStorage:
      const roleFromStorage = localStorage.getItem('user_rol'); 
      if (roleFromStorage) {
        this.userRol = parseInt(roleFromStorage);  // Asignamos el rol al estado
      }
    },
    async fetchStaffMembers() {
      try {
        const response = await axios.get('http://localhost:3000/api/staff');
        //console.log('Respuesta de la API:', response.data);  // Mostrar la respuesta de la API
        this.staffMembers = response.data;  // Asignar directamente los datos del staff
      } catch (error) {
        console.error('Error al obtener los miembros del staff:', error);
      } finally {
        this.loading = false;  // Ocultar el loader cuando los datos se carguen
      }
    },
    async fetchProfessions() {
      try {
        const response = await axios.get('http://localhost:3000/api/data/professions');
        //console.log('Profesiones obtenidas:', response.data);
        this.professions = response.data;  // Guardar las profesiones en el estado
      } catch (error) {
        console.error('Error al obtener las profesiones:', error);
      }
    },
    
    getOccupationName(occupationId) {
      const profession = this.professions.find(prof => prof.id === occupationId);
      return profession ? profession.name : 'Desconocido';  // Si no encuentra la profesión, muestra 'Desconocido'
    },
    // Mostrar el modal de confirmación de eliminación
    confirmDelete(rut) {
      this.staffToDelete = rut;  // Guardar el miembro a eliminar
      this.showDeleteModal = true;  // Mostrar el modal
    },
    // Eliminar el miembro del staff
    async deleteStaff() {
      try {
        await axios.delete(`http://localhost:3000/api/staff/${this.staffToDelete}`);
        // Eliminar el miembro de la lista
        this.staffMembers = this.staffMembers.filter(s => s.rut !== this.staffToDelete);
        this.closeDeleteModal();  // Cerrar el modal
      } catch (error) {
        console.error('Error al eliminar el miembro:', error);
      }
      this.showSuccess('Registro eliminado');
    },

    showSuccess(message) {
      this.successMessage = message;
      this.showSuccessModal = true;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
    },
    // Cerrar el modal
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.staffToDelete = null;
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
  .staff-academy-container {
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

/* Estilos del Modal de Confirmación */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  visibility: hidden;
}

.modal-actions {
  margin-top: 20px;
}

.btn-black {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  font-size: 16px;
  font-family: 'Bebas Neue', sans-serif;
  transition: background-color 0.3s;
}

.btn-black:hover {
  background-color: #e6006f;
}
</style>

