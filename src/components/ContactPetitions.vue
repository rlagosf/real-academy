<template>
    <div class="contact-petitions-container">
      <img src="/assets/logos/logo-en-negativo.png" alt="Logo" class="login-logo" />
      <h1>Solicitudes Pendientes</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Email</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="petition in contactPetitions" :key="petition.email">
            <td>{{ petition.name }}</td>
            <td>{{ petition.phone }}</td>
            <td>{{ petition.address }}</td>
            <td>{{ petition.email }}</td>
            <td>{{ petition.source }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactPetitions',
    data() {
      return {
        contactPetitions: [
          {
            name: 'Juan Pérez',
            phone: '987654321',
            address: 'Calle Ejemplo 123',
            email: 'ejemplo1@correo.com',
            source: 'Formulario Web'
          },
          {
            name: 'Ana Gómez',
            phone: '123456789',
            address: 'Avenida Ejemplo 456',
            email: 'ejemplo2@correo.com',
            source: 'Llamada Telefónica'
          },
          {
            name: 'Luis Martínez',
            phone: '555555555',
            address: 'Pasaje Ejemplo 789',
            email: 'ejemplo3@correo.com',
            source: 'Correo Electrónico'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .contact-petitions-container {
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
  </style>
  