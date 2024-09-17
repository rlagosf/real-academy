<template>
  <nav class="navigator">
    <div class="logo">
      <img src="/real-academy-fc/logo-en-blanco.png" alt="Academia de Fútbol Logo" />
    </div>
    <div class="menu-toggle" @click="toggleMenu">
      <span class="menu-icon"></span>
    </div>
    <ul class="nav-links" :class="{ 'nav-links--active': isMenuOpen }">
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
  name: 'MainNavigator',
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.isMenuOpen = false;
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
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
  box-sizing: border-box; /* Asegura que el padding no afecte el ancho total */
}

.logo img {
  height: 45px; /* Ajusta el tamaño según sea necesario */
  width: auto;  /* Mantiene la relación de aspecto */
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0 10px; /* Ajusta el margen para que todos los elementos quepan */
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1.1em;
}

.nav-links a:hover {
  color: #FF007F;
}

/* Estilos para el icono del menú */
.menu-toggle {
  display: none;
  cursor: pointer;
  font-size: 1.5em;
  color: white;
}

.menu-icon::before {
  content: '☰'; /* Icono de menú hamburguesa */
  display: block;
  font-size: 1.5em;
  color: white;
  transition: filter 0.3s ease;
}

/* Cambio de color del icono al pasar el cursor */
.menu-toggle:hover .menu-icon::before {
  filter: invert(34%) sepia(80%) saturate(4899%) hue-rotate(329deg) brightness(95%) contrast(97%);
}

/* Responsive Menu */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px; /* Ajusta según la altura de tu navbar */
    right: 0;
    background-color: #000;
    width: 100%;
    box-sizing: border-box;
  }

  .nav-links li {
    margin: 10px 0; /* Alinea los elementos verticalmente */
    padding: 0 20px; /* Añade padding para evitar que se corten en el borde */
  }

  .menu-toggle {
    display: block;
  }

  .nav-links.nav-links--active {
    display: flex;
  }
}

@media (min-width: 769px) {
  .nav-links {
    display: flex; /* Asegura que el menú esté siempre visible en pantallas grandes */
    flex-direction: row;
  }

  .menu-toggle {
    display: none;
  }
}
</style>
