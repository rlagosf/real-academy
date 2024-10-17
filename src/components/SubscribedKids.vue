<template>
  <div>
    <!-- Loading -->
    <LoadingReal v-if="loading" />

    <!-- Contenido principal -->
    <div v-if="!loading" class="subscribed-kids-container">
      <!-- Botón de redirección -->
      <button class="back-to-dashboard" @click="goToDashboard">
        <i class="fas fa-arrow-left back-arrow"></i>
        <i class="fas fa-door-open door-icon"></i>
        <span class="back-text">Volver al Dashboard</span>
      </button>

      <!-- Tabla de alumnos -->
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
              <th v-if="userRol !== 1">Acciones</th>
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
              <td>{{ getFootballPositionName(kid.football_position) }}</td>
              <td>{{ getCategoryName(kid.category_id) }}</td>
              <td v-if="userRol !== 1">
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

    <!-- Modal de edición -->
    <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-content edit-modal">
        <span class="modal-close" @click="closeEditModal">X</span>
        <h2>Editar Información del Alumno</h2>

        <!-- Peso -->
        <div class="form-group">
          <label for="weight">Peso</label>
          <input type="number" v-model="editingKid.weight" id="weight" />
        </div>

        <!-- Estatura -->
        <div class="form-group">
          <label for="height">Estatura</label>
          <input type="number" v-model="editingKid.height" id="height" />
        </div>

        <!-- Edad -->
        <div class="form-group">
          <label for="age">Edad</label>
          <input type="number" v-model="editingKid.age" id="age" />
        </div>

        <!-- Posición de Fútbol -->
        <div class="form-group">
          <label for="football_position">Posición de Fútbol</label>
          <select v-model="editingKid.football_position" id="football_position">
            <option v-for="position in footballPositions" :key="position.id" :value="position.id">
              {{ position.position }}
            </option>
          </select>
        </div>

        <!-- Categoría -->
        <div class="form-group">
          <label for="category">Categoría</label>
          <select v-model="editingKid.category_id" id="category">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.category_name }}
            </option>
          </select>
        </div>

        <!-- Acciones (botones) -->
        <div class="modal-actions">
          <button class="btn-black" @click="saveChanges">Editar</button>
          <button class="btn-black" @click="closeEditModal">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
      <div class="modal-content">
        <span class="modal-close" @click="closeDeleteModal">X</span>
        <h2>¿Desea eliminar el registro?</h2>
        <div class="modal-actions">
          <button class="btn-black" @click="confirmDelete">Sí, eliminar</button>
          <button class="btn-black" @click="closeDeleteModal">No, cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación de edición -->
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
  name: 'SubscribedKids',
  components: {
    LoadingReal // Registrar el componente LoadingReal
  },
  data() {
    return {
      inactivityTimeout: null,
      inactivityTimeLimit: 5 * 60 * 1000, // 5 minutos en milisegundos
      kids: [], // Datos de los niños
      footballPositions: [], // Para almacenar las posiciones de fútbol
      categories: [], // Para almacenar las categorías
      loading: true, // Indicador de carga
      showEditModal: false, // Controlar la visibilidad del modal de edición
      showDeleteModal: false, // Controlar la visibilidad del modal de eliminación
      showSuccessModal: false, // Asegúrate de que esta propiedad esté definida
      successMessage: '', // Asegúrate también de inicializar successMessage
      editingKid: {}, // Datos del niño que se está editando
      kidToDelete: null, // Niño que se va a eliminar
      userRol: null,
    };
  },
  mounted() {
    this.resetInactivityTimeout();
    this.fetchSubscribedKids();
    this.fetchFootBallPositions();
    this.fetchCategories();
    this.getUserRol();
  },
  beforeUnmount() {
        window.removeEventListener('mousemove', this.resetInactivityTimeout);
        window.removeEventListener('keydown', this.resetInactivityTimeout);
        window.removeEventListener('click', this.resetInactivityTimeout);
    },
 
  methods: {
    async getUserRol() {
      const roleFromStorage = localStorage.getItem('user_rol');
      if (roleFromStorage) {
        this.userRol = parseInt(roleFromStorage);  // Asignamos el rol al estado
      }
    },
    async fetchSubscribedKids() {
      try {
        const response = await axios.get('http://localhost:3000/api/student', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}` // Enviar token de autenticación
          }
        });
        this.kids = response.data;
      } catch (error) {
        console.error('Error al obtener los alumnos inscritos:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchFootBallPositions() {
      try {
        const response = await axios.get('http://localhost:3000/api/data/football-positions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}` // Enviar token de autenticación
          }
        });
        this.footballPositions = response.data;
      } catch (error) {
        console.error('Error al obtener las posiciones de fútbol:', error);
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/api/data/categories', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}` // Enviar token de autenticación
          }
        });
        this.categories = response.data;
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    },
    resetInactivityTimeout() {
            // Limpiar cualquier timeout previo
            clearTimeout(this.inactivityTimeout);

            // Configurar un nuevo timeout
            this.inactivityTimeout = setTimeout(() => {
                this.logout(); // Llamar al método de logout si no hay actividad
            }, this.inactivityTimeLimit);
        },
    getFootballPositionName(id) {
      const position = this.footballPositions.find(pos => pos.id === id);
      return position ? position.position : 'Desconocido';
    },

    getCategoryName(id) {
      const category = this.categories.find(cat => cat.id === id);
      return category ? category.category_name : 'Desconocido';
    },

    showSuccess(message) {
      this.successMessage = message;
      this.showSuccessModal = true;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
    },

    goToDashboard() {
      this.$router.push({ name: 'Dashboard' });
    },

    async deleteKid(rut) {
      this.kidToDelete = rut;
      this.showDeleteModal = true;
    },

    async confirmDelete() {
      try {
        await axios.delete(`http://localhost:3000/api/student/${this.kidToDelete}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}` // Enviar token de autenticación
          }
        });
        this.showSuccess('Alumno eliminado con éxito');
        this.kids = this.kids.filter(kid => kid.rut !== this.kidToDelete);
      } catch (error) {
        console.error('Error al eliminar alumno:', error);
      } finally {
        this.showDeleteModal = false;
      }
    },

    async editKid(kid) {
      // Obtener el rol del usuario desde localStorage
      const userRol = localStorage.getItem('user_rol');

      // Verificar si el rol existe
      if (!userRol) {
        console.error('No se ha encontrado el rol del usuario. Acceso denegado.');
        this.showSuccess('No se ha encontrado el rol del usuario. Acceso denegado.');
        return;
      }

      // Copiar los datos del niño para editar
      this.editingKid = { ...kid };

      // Mostrar el modal de edición
      this.showEditModal = true; // Aseguramos que el modal se muestra antes de cualquier otra acción

      // Al mostrar el modal, esperamos que el usuario haga sus cambios y luego se ejecute la lógica para guardar los cambios.
    },

    async saveChanges() {
      // Obtener el rol desde localStorage
      const userRol = localStorage.getItem('user_rol');

      // Verificar si el rol existe
      if (!userRol) {
        console.error('No se ha encontrado el rol del usuario. Acceso denegado.');
        this.showSuccess('No se ha encontrado el rol del usuario. Acceso denegado.');
        return;
      }

      try {
        // Realizar la solicitud PUT para editar el niño y enviamos el rol en los encabezados
        const response = await axios.put(`http://localhost:3000/api/student/${this.editingKid.rut}`, {
          weight: this.editingKid.weight,
          height: this.editingKid.height,
          age: this.editingKid.age,
          football_position: this.editingKid.football_position,
          category_id: this.editingKid.category_id
        }, {
          headers: {
            'X-User-Rol': userRol  // Aseguramos que el rol se envíe en los encabezados
          }
        });

        // Verificamos la respuesta
        console.log("Respuesta del backend al editar el registro:", response);

        // Si la respuesta es exitosa, actualizamos la lista de niños
        const index = this.kids.findIndex(k => k.rut === this.editingKid.rut);
        if (index !== -1) {
          this.kids.splice(index, 1, { ...this.editingKid });
        }

        // Cerrar el modal de edición
        this.showEditModal = false;

        // Mostrar mensaje de éxito
        this.showSuccess('Registro editado');

      } catch (error) {
        // Mostrar el error en consola y mostrar mensaje de error
        console.error('Error al intentar editar el niño:', error);

        if (error.response && error.response.data) {
          // Si hay respuesta del backend, mostrarla
          console.error('Detalles del error del backend:', error.response.data);
          this.showSuccess(`Hubo un error al intentar editar el registro: ${error.response.data.message || 'Error desconocido'}`);
        } else {
          console.error('Error desconocido:', error);
          this.showSuccess('Hubo un error desconocido');
        }
      }
    }
    ,

    closeEditModal() {
      this.showEditModal = false;
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    logout() {
            // Eliminar el rol y el usuario del localStorage
            localStorage.removeItem('user_rol');
            localStorage.removeItem('username');

            // Redirigir al HomeComponent
            this.$router.push({ name: 'Home' });
        },
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

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

.form-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

label {
  flex: 1;
  font-family: 'Bebas Neue', sans-serif;
}

input,
select {
  flex: 2;
  font-family: 'Bebas Neue', sans-serif;
}

/* Botones */
.btn-black {
  background-color: black;
  color: white;
  font-family: 'Bebas Neue', sans-serif;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-black:hover {
  opacity: 0.8;
}

.btn-black:hover {
  background-color: #ff007f;
}

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
  width: 300px;
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

.modal-actions button {
  margin: 0 10px;
  padding: 10px 20px;
}

/* Cambios aplicados solo al modal de edición */
.edit-modal .form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.edit-modal .form-group label {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  flex-basis: 30%;
  text-align: left;
}

.edit-modal .form-group input,
.edit-modal .form-group select {
  flex-basis: 65%;
  font-family: 'Bebas Neue', sans-serif;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  max-width: 250px;
}

/* Ajustes para los botones en el modal de edición */
.modal-actions .btn-black {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  font-size: 16px;
  font-family: 'Bebas Neue', sans-serif;
  transition: background-color 0.3s, opacity 0.3s;
  opacity: 0.9;
}

.modal-actions .btn-black:hover {
  background-color: #ff007f;
  opacity: 1;
}

/* Responsividad */
@media (max-width: 768px) {
  .back-to-dashboard {
    padding: 8px 12px;
    font-size: 12px;
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

@media (max-width: 480px) {
  .back-to-dashboard {
    padding: 6px 10px;
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

th,
td {
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
  .subscribed-kids-container {
    overflow-x: auto;
    padding: 10px;
  }

  table {
    width: 100%;
    table-layout: fixed;
    overflow-x: auto;
    display: block;
  }

  th,
  td {
    padding: 10px 5px;
    white-space: nowrap;
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
    overflow-x: auto;
  }

  table {
    display: block;
    width: 100%;
  }

  th,
  td {
    padding: 8px;
    white-space: nowrap;
  }
}

/* Animación tipo látigo para los modales */
.modal-content {
  animation: whip-in 0.6s ease-out;
}

@keyframes whip-in {
  0% {
    transform: scale(0) rotate(0deg);
  }
  70% {
    transform: scale(1.1) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>

