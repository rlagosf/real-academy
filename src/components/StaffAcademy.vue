<template>
    <div class="staff-academy-container">
      <img src="/assets/logos/logo-en-negativo.png" alt="Logo" class="login-logo" />
      <h1>Personal de la Academia</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>RUT</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Occupation</th>
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
                <i class="fas fa-pencil-alt"></i> <!-- Ícono de lápiz -->
              </button>
              <button @click="deleteStaff(staff.rut)">
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
    name: 'StaffAcademy',
    data() {
      return {
        staffMembers: [
          {
            name: 'Carlos Ruiz',
            rut: '12345678-9',
            address: 'Calle Falsa 456',
            phone: '987654321',
            email: 'carlos.ruiz@academia.com',
            occupation: 'Entrenador'
          },
          {
            name: 'Laura Martínez',
            rut: '98765432-1',
            address: 'Avenida Siempre Viva 123',
            phone: '123456789',
            email: 'laura.martinez@academia.com',
            occupation: 'Nutricionista'
          },
          {
            name: 'Pedro González',
            rut: '11111111-1',
            address: 'Pasaje Verde 789',
            phone: '555555555',
            email: 'pedro.gonzalez@academia.com',
            occupation: 'Fisioterapeuta'
          },
          {
            name: 'Ana Torres',
            rut: '22222222-2',
            address: 'Calle Larga 101',
            phone: '444444444',
            email: 'ana.torres@academia.com',
            occupation: 'Psicóloga'
          }
        ]
      };
    },
    methods: {
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
  