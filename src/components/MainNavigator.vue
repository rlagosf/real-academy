<template>
  <nav class="navigator" :class="{ 'scrolled': isScrolled, 'black-background': isBlackBackground, 'pink-background': isPinkBackground }">
    <div class="logo">
      <img src="/real-academy-fc/logo-en-blanco.png" alt="Real Academy Logo" />
    </div>
    <div class="menu-toggle" @click="toggleMenu">
      <span class="menu-icon"></span>
    </div>
    <ul class="nav-links" :class="{ 'nav-links--active': isMenuOpen }">
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
      isScrolled: false,
      isBlackBackground: false,
      isPinkBackground: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleScroll() {
      const currentScroll = window.scrollY;
      const videoHeight = document.querySelector('.video-background').offsetHeight;
      
      // Ajusta los umbrales
      const whiteBackgroundThreshold = this.isMenuOpen ? 1000 : 800; 
      const blackBackgroundThreshold = videoHeight;

      this.isScrolled = currentScroll > 50;

      // Cambios de fondo
      this.isBlackBackground = currentScroll > blackBackgroundThreshold && currentScroll <= whiteBackgroundThreshold;
      this.isPinkBackground = currentScroll > whiteBackgroundThreshold;

      // Cierra el menú si se hace scroll
      if (this.isMenuOpen) {
        this.isMenuOpen = false; // Cierra el menú al hacer scroll
      }

      // Mantiene el estado de la barra
      if (this.isPinkBackground) {
        this.isScrolled = true; 
      }
    },
    scrollToSection(event, target) {
      event.preventDefault();
      
      const element = document.querySelector(target);
      if (element) {
        const offsetTop = element.offsetTop - 60;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

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
html {
  scroll-behavior: smooth;
}

.navigator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: transparent; /* Comienza transparente */
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
  transition: background-color 0.5s ease;
}

.navigator.black-background {
  background-color: #000; /* Cambia a negro */
}

.navigator.pink-background {
  background-color: #FF007F; /* Cambia a rosado */
}

.logo img {
  height: 60px;
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

/* Cambia el color del texto a negro al pasar el cursor sobre los enlaces cuando la barra es rosada */
.navigator.scrolled .nav-links a:hover {
  color: black; /* Cambia a negro al hacer hover */
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

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
    z-index: 1001;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 80px;
    right: 0;
    background-color: transparent; /* Cambia a transparente */
    width: 100%;
    box-sizing: border-box;
    z-index: 999;
    padding-left: 40px; /* Añade padding a la izquierda para alinearlo con el logo */
  }

  .nav-links.nav-links--active {
    display: flex;
  }

  .nav-links.nav-links--active li {
    margin: 5px 0; /* Reduce el margen para que estén más juntos */
    padding: 10px 0; /* Ajusta el padding verticalmente si es necesario */
  }

  .navigator.scrolled .nav-links {
    background-color: #FF007F; /* Cambia a rosado */
  }

  .nav-links.nav-links--active a {
    color: white;
  }

  .navigator.scrolled .nav-links.nav-links--active a {
    color: black; /* Cambia el color a negro */
  }

  .navigator.scrolled .nav-links a:hover {
    color: black; /* Cambia a negro al pasar el cursor */
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
