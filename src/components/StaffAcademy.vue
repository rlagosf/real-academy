<template>
    <div>
      <!-- Mostrar LoadingReal mientras loading sea true -->
      <LoadingReal v-if="loading" />
  
      <!-- Mostrar el contenido completo solo si loading es false -->
      <div v-if="!loading" class="staff-academy-container">
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
        staffMembers: [],
        loading: true // Inicialmente está en true para mostrar el loader
      };
    },
    created() {
      this.fetchStaffMembers();
    },
    methods: {
      async fetchStaffMembers() {
        try {
          const response = await axios.get('http://localhost:3000/api/staff');
          this.staffMembers = response.data.staffMembers;
        } catch (error) {
          console.error('Error al obtener los miembros del staff:', error);
        } finally {
          this.loading = false; // Ocultar el loader cuando los datos se carguen
        }
      },
      editStaff(staff) {
        alert(`Editando a: ${staff.name}`);
      },
      deleteStaff(rut) {
        const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar a ${rut}?`);
        if (confirmDelete) {
          this.staffMembers = this.staffMembers.filter(s => s.rut !== rut);
        }
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
  }
  
  .login-logo {
    width: 150px;
    margin-bottom: 20px;
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
    border: 3px solid #ff007f;
    border-radius: 30px;
    overflow: hidden;
    margin-top: 20px;
  }
  
  th, td {
    border: 2px solid #ff007f;
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
  