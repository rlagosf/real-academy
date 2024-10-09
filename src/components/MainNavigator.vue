<template>
  <nav class="navigator" :class="{ 'scrolled': isScrolled, 'black-background': isBlackBackground, 'pink-background': isPinkBackground }">
    <div class="logo">
      <img src="/assets/logos/logo-en-blanco.png" class="logo" alt="Logo" />
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
      <!-- Botón de Login -->
      <li>
        <button class="login-button" @click="goToLogin">Iniciar sesión</button>
      </li>
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
      // @ts-ignore
      const videoHeight = document.querySelector('.video-background')?.offsetHeight || 0;

      const whiteBackgroundThreshold = this.isMenuOpen ? 1000 : 800;
      const blackBackgroundThreshold = videoHeight;

      this.isScrolled = currentScroll > 50;

      this.isBlackBackground = currentScroll > blackBackgroundThreshold && currentScroll <= whiteBackgroundThreshold;
      this.isPinkBackground = currentScroll > whiteBackgroundThreshold;

      if (this.isMenuOpen) {
        this.isMenuOpen = false;
      }

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
    },
    goToLogin() {
      this.$router.push('/login'); // Cambia a la ruta de inicio de sesión
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
  background-color: transparent;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
  transition: background-color 0.5s ease;
}

.navigator.pink-background {
  background-color: #FF007F;
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
  transition: background-color 0.5s ease, color 0.5s ease;
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

.navigator.pink-background .nav-links a:hover {
  color: black;
}

/* Botón de Login */
.login-button {
  background-color: transparent;
  color: white;
  border: 2px solid white; /* Borde blanco por defecto */
  padding: 6px 12px; /* Tamaño más pequeño */
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em; /* Fuente más pequeña */
  font-family: 'Bebas Neue', sans-serif; /* Cambiar la fuente */
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  top: -7px; /* Subir el botón */
}

.login-button:hover {
  background-color: white;
  color: #FF007F;
}

.navigator.pink-background .login-button {
  background-color: transparent;
  border: 2px solid white; /* Borde blanco cuando el fondo es #FF007F */
  color: white; /* Texto blanco cuando el fondo es #FF007F */
}

.navigator.pink-background .login-button:hover {
  background-color: black;
  color: white;
}

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
    width: 100%;
    box-sizing: border-box;
    z-index: 999;
    padding-left: 42px;
  }

  .nav-links.nav-links--active {
    display: flex;
  }

  .nav-links.nav-links--active li {
    margin: 5px 0;
    padding: 10px 0;
  }

  .navigator.pink-background .nav-links {
    background-color: #FF007F;
  }

  .navigator.pink-background .nav-links a:hover {
    color: black;
  }

  /* Aplicar margin-left solo en dispositivos pequeños */
  .login-button {
    margin-left: -10px;
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
