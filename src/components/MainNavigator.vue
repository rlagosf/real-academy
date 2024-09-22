<template>
  <nav class="navigator" :class="{ 'scrolled': isScrolled }">
    <div class="logo">
      <img src="/real-academy-fc/logo-en-blanco.png" alt="Real Academy Logo" />
    </div>
    <div class="menu-toggle" @click="toggleMenu">
      <span class="menu-icon"></span>
    </div>
    <ul class="nav-links" :class="{ 'nav-links--active': isMenuOpen, 'scrolled': isScrolled && !isMenuOpen }">
      <li><a href="#home" @click="scrollToSection($event, '#home')">Inicio</a></li>
      <li><a href="#about" @click="scrollToSection($event, '#about')">Sobre Nosotros</a></li>
      <li><a href="#gallery" @click="scrollToSection($event, '#gallery')">Galería</a></li>
      <li><a href="#location" @click="scrollToSection($event, '#location')">Ubicación</a></li>
      <li><a href="#contact" @click="scrollToSection($event, '#contact')">Contacto</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MainNavigator',
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    scrollToSection(event, target) {
      event.preventDefault(); // Prevenir el comportamiento por defecto del enlace

      // Obtener el elemento objetivo al que se desea desplazarse
      const element = document.querySelector(target);
      if (element) {
        const offsetTop = element.offsetTop - 60; // Ajusta según la altura de la barra de navegación

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth' // Desplazamiento suave
        });

        // Cierra el menú si está abierto en modo responsive
        if (this.isMenuOpen) {
          this.isMenuOpen = false;
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
/* Configura un desplazamiento suave global */
html {
  scroll-behavior: smooth;
}

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
  box-sizing: border-box;
  transition: background-color 0.5s ease;
}

.navigator.scrolled {
  background-color: #FF007F;
}

.logo img {
  height: 45px;
  width: auto;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0 10px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1.1em;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #FF007F;
}

.nav-links.scrolled a {
  color: black;
}

/* Estilos para el icono del menú */
.menu-toggle {
  display: none;
  cursor: pointer;
  font-size: 1.5em;
  color: white;
}

.menu-icon::before {
  content: '☰';
  display: block;
  font-size: 1.5em;
  color: white;
  transition: filter 0.3s ease;
}

.menu-toggle:hover .menu-icon::before {
  filter: invert(34%) sepia(80%) saturate(4899%) hue-rotate(329deg) brightness(95%) contrast(97%);
}

/* Responsive Menu */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #000;
    width: 100%;
    box-sizing: border-box;
  }

  .nav-links li {
    margin: 10px 0;
    padding: 0 20px;
  }

  .nav-links.nav-links--active {
    display: flex;
  }

  .nav-links.nav-links--active a {
    color: white;
  }

  .menu-toggle {
    display: block;
  }

  .nav-links.scrolled a {
    color: white;
  }
}

@media (min-width: 769px) {
  .nav-links {
    display: flex;
    flex-direction: row;
  }

  .menu-toggle {
    display: none;
  }
}
</style>
