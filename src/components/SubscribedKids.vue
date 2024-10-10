<template>
    <div class="subscribed-kids-container">
      <img src="/assets/logos/logo-en-negativo.png" alt="Logo" class="login-logo" />
      <h1>Alumnos Inscritos</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>RUT</th>
            <th>Address</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Age</th>
            <th>Football Position</th>
            <th>Category ID</th>
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
                <i class="fas fa-pencil-alt"></i> <!-- Ícono de lápiz -->
              </button>
              <button @click="deleteKid(kid.rut)">
                <i class="fas fa-trash"></i> <!-- Ícono de basurero -->
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SubscribedKids',
    data() {
      return {
        kids: [
          {
            name: 'Juan Pérez',
            rut: '12345678-9',
            address: 'Calle Falsa 123',
            weight: '30kg',
            height: '1.40m',
            age: 10,
            football_position: 'Delantero',
            category_id: 'A'
          },
          {
            name: 'Ana Gómez',
            rut: '98765432-1',
            address: 'Avenida Siempre Viva 742',
            weight: '28kg',
            height: '1.35m',
            age: 9,
            football_position: 'Defensora',
            category_id: 'B'
          }
        ]
      };
    },
    methods: {
      editKid(kid) {
        alert(`Editando a: ${kid.name}`);
      },
      deleteKid(rut) {
        const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar a ${rut}?`);
        if (confirmDelete) {
          this.kids = this.kids.filter(k => k.rut !== rut);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .subscribed-kids-container {
    background-color: white;
    padding: 20px;
    font-family: 'Bebas Neue', sans-serif; /* Fuente actualizada */
  }
  
  .login-logo {
    width: 150px; /* Ajusta el tamaño del logo según sea necesario */
    margin-bottom: 20px; /* Espaciado debajo del logo */
  }
  
  h1 {
    color: #2c3e50; /* Color del título */
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #ecf0f1; /* Color del fondo de las cabeceras */
    color: #34495e; /* Color del texto de las cabeceras */
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #2c3e50; /* Color de los íconos */
  }
  
  button i {
    font-size: 20px; /* Ajusta el tamaño del ícono según sea necesario */
  }
  
  button:hover {
    opacity: 0.7; /* Efecto al pasar el mouse sobre los botones */
  }
  </style>
  