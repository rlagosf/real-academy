<template>
    <nav class="navigator">
      <div class="logo">Academia de Fútbol</div>
      <ul class="nav-links">
        <li><a href="#home">Inicio</a></li>
        <li><a href="#about">Sobre Nosotros</a></li>
        <li><a href="#gallery">Galería</a></li>
        <li><a href="#location">Ubicación</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'MainNavigator'
  };
  </script>
  
  <style scoped>
  .navigator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #000;
    color: white;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
  }
  
  .nav-links {
    display: flex;
    list-style: none;
  }
  
  .nav-links li {
    margin: 0 15px;
  }
  
  .nav-links a {
    color: white;
    text-decoration: none;
    font-size: 1.1em;
  }
  
  .nav-links a:hover {
    color: #FF007F;
  }
  </style>
  