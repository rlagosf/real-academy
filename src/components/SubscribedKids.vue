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
              <td>{{ getFootballPositionName(kid.football_position) }}</td>
              <td>{{ getCategoryName(kid.category_id) }}</td>
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
      kids: [], // Datos de los niños
      footballPositions: [], // Para almacenar las posiciones de fútbol
      categories: [], // Para almacenar las categorías
      loading: true, // Indicador de carga
      showEditModal: false, // Controlar la visibilidad del modal de edición
      showDeleteModal: false, // Controlar la visibilidad del modal de eliminación
      showSuccessModal: false, // Asegúrate de que esta propiedad esté definida
      successMessage: '', // Asegúrate también de inicializar successMessage
      editingKid: {}, // Datos del niño que se está editando
      kidToDelete: null // Niño que se va a eliminar
    };
  },
  mounted() {
    this.fetchSubscribedKids();
    this.fetchFootBallPositions();
    this.fetchCategories();
  },
  methods: {
    // Fetch para obtener los datos de los niños
    async fetchSubscribedKids() {
      try {
        const response = await axios.get('http://localhost:3000/api/student');
        this.kids = response.data;
        //console.log('Datos de estudiantes obtenidos:', this.kids); // Log para confirmar que los datos llegan
      } catch (error) {
        console.error('Error al obtener los alumnos inscritos:', error);
      } finally {
        this.loading = false;
      }
    },

    // Fetch para obtener las posiciones de fútbol
    async fetchFootBallPositions() {
      try {
        const response = await axios.get('http://localhost:3000/api/data/football-positions');
        this.footballPositions = response.data; // Guardar las posiciones
      } catch (error) {
        console.error('Error al obtener las posiciones de fútbol:', error);
      }
    },

    // Fetch para obtener las categorías
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/api/data/categories');
        this.categories = response.data; // Guardar las categorías
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    },

    // Obtener el nombre de la posición de fútbol basado en el ID
    getFootballPositionName(id) {
      const position = this.footballPositions.find(pos => pos.id === id);
      return position ? position.position : 'Desconocido'; // Devuelve 'Desconocido' si no encuentra el ID
    },
    showSuccess(message) {
      this.successMessage = message;
      this.showSuccessModal = true;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
    },

    // Obtener el nombre de la categoría basado en el ID
    getCategoryName(id) {
      const category = this.categories.find(cat => cat.id === id);
      return category ? category.category_name : 'Desconocido'; // Devuelve 'Desconocido' si no encuentra el ID
    },

    // Método para redirigir al Dashboard
    goToDashboard() {
      this.$router.push({ name: 'Dashboard' });
    },

    // Método para eliminar un niño
    deleteKid(rut) {
      this.kidToDelete = rut; // Guardar el rut del niño a eliminar
      this.showDeleteModal = true; // Mostrar el modal de eliminación
      //console.log('Modal de eliminación activado para RUT:', rut); // Verificar si se activa el modal
    }
    ,


    // Confirmar eliminación del niño
    confirmDelete() {
      //console.log('Confirmando eliminación para RUT:', this.kidToDelete); // Log antes de eliminar
      axios.delete(`http://localhost:3000/api/student/${this.kidToDelete}`)
        .then(() => {
          this.kids = this.kids.filter(k => k.rut !== this.kidToDelete);
          //console.log('Eliminado exitosamente:', this.kidToDelete); // Log para confirmar la eliminación
          //alert('Registro eliminado');
          this.showDeleteModal = false;
        })
        .catch(error => {
          console.error('Error al eliminar el alumno:', error);
        });
      this.showSuccess('Registro eliminado');
    },

    // Cerrar modal de eliminación
    closeDeleteModal() {
      this.showDeleteModal = false;
    },

    // Método para editar un niño
    editKid(kid) {
      this.editingKid = { ...kid }; // Copiar los datos del niño para editar
      this.showEditModal = true; // Mostrar el modal de edición
    },

    // Guardar los cambios editados
    saveChanges() {
      //console.log('Datos editados:', this.editingKid); // Log para verificar los datos a enviar
      axios.put(`http://localhost:3000/api/student/${this.editingKid.rut}`, {
        weight: this.editingKid.weight,
        height: this.editingKid.height,
        age: this.editingKid.age,
        football_position: this.editingKid.football_position,
        category_id: this.editingKid.category_id
      })
        .then(() => {
          const index = this.kids.findIndex(kid => kid.rut === this.editingKid.rut);
          if (index !== -1) {
            this.kids.splice(index, 1, { ...this.editingKid });
          }
          this.showEditModal = false;
          //console.log('Cambios guardados exitosamente:', this.editingKid); // Log para confirmar que los cambios se guardaron
          //alert('Información actualizada');
        })
        .catch(error => {
          console.error('Error al guardar los cambios:', error);
        });
      this.showSuccess('Registro editado');
    }
    ,

    // Cerrar modal de edición
    closeEditModal() {
      this.showEditModal = false;
    }
  }
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
  opacity: 0.9; /* Opacidad inicial */
}

.modal-actions .btn-black:hover {
  background-color: #ff007f; /* Cambiar a color #ff007f en hover */
  opacity: 1; /* Cambiar opacidad al 100% cuando se pasa el puntero */
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
</style>
