<template>
    <div>
      <!-- Mostrar LoadingReal mientras loading sea true -->
      <LoadingReal v-if="loading" />
  
      <!-- Mostrar el contenido completo solo si loading es false -->
      <div v-if="!loading" class="subscribed-kids-container">
        <img src="/assets/logos/logo-en-negativo.png" alt="Logo" class="login-logo" />
        <h1 class="title-center">Alumnos Inscritos</h1>
  
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
    }
  };
  </script>
  
  <style scoped>
  .subscribed-kids-container {
    background-color: white;
    padding: 20px;
    font-family: 'Bebas Neue', sans-serif;
    text-align: center;
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
  