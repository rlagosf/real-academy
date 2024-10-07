<template>
  <section class="about-us" id="about">
    <div class="cards-container">
      <!-- Tarjetas dinámicas -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="card"
      >
        <img :src="image.src" alt="Imagen" class="card-img" :class="{ 'png-image': image.src.endsWith('.png') }" />
        <div class="card-content">
          <h2>{{ image.title }}</h2>
          <ul v-if="image.title === 'VALORES FUNDAMENTALES'">
            <li v-for="(value, index) in values" :key="index">{{ value }}</li>
          </ul>
          <ul v-if="image.title === 'CATEGORÍAS'">
            <li v-for="(categoria, index) in categorias" :key="index">{{ categoria }}</li>
          </ul>
          <ul v-if="image.title === 'PLANES DE ENTRENAMIENTO'">
            <li v-for="(plan, index) in planesEntrenamiento" :key="index">{{ plan }}</li>
          </ul>
          <p v-else>{{ image.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      images: [
        {
          src: "/assets/logos/logo-en-blanco.png",
          title: "PRESENTACIÓN",
          description: "Fundamos nuestra academia en el año 2023 con la misión de impulsar el desarrollo integral de nuestros jugadores, fortaleciendo habilidades técnicas, tácticas y físicas, así como aspectos emocionales e interpersonales."
        },
        {
          src: "/assets/logos/logo-sin-fondo.png",
          title: "OBJETIVOS",
          description: "Facilitamos el acceso a universidades chilenas y gestionamos colaboraciones para deportistas talentosos que buscan becas y pasantías en clubes y universidades estadounidenses, ofreciendo oportunidades en educación y fútbol competitivo."
        },
        {
          src: "/assets/logos/logo-en-blanco.png",
          title: "VALORES FUNDAMENTALES",
        },
        {
          src: "/assets/logos/logo-sin-fondo.png",
          title: "CATEGORÍAS",
        },
        {
          src: "/assets/logos/logo-en-blanco.png",
          title: "PLANES DE ENTRENAMIENTO",
        },
        {
          src: "/assets/logos/logo-sin-fondo.png",
          title: "MISIÓN Y VISIÓN",
          description: "Fomentamos la dedicación y pasión por el fútbol, creando un entorno que impulsa a los jugadores a alcanzar su máximo potencial, guiados por entrenadores profesionales y cultivando habilidades útiles."
        },
      ],
      values: [
        "Respeto",
        "Disciplina",
        "Compañerismo",
        "Pasión",
        "Superación",
        "Trabajo en equipo"
      ],
      categorias: [
        "Junior (7-9 años)",
        "Formativo (10-13 años)",
        "Competitivo (14-17 años)",
        "Proyección (17+)",
        "Proyecto USA (17+)"
      ],
      planesEntrenamiento: [
        "Acondicionamiento físico.",
        "Entrenamientos lúdicos y técnicos.",
        "Trabajo en equipo.",
        "Participación en competiciones.",
        "Oportunidades académicas."
      ]
    };
  }
};
</script>

<style scoped>
.about-us {
  padding: 60px 30px;
  background-color: #000; /* Fondo negro */
  text-align: center;
}

/* Contenedor para las tarjetas */
.cards-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* 1 columna por defecto */
  gap: 30px; /* Espacio entre las tarjetas */
  justify-items: stretch; /* Asegura que las tarjetas ocupen todo el ancho disponible */
  width: 100%; /* Hace que el contenedor ocupe todo el ancho disponible */
}

/* Estilos para las tarjetas */
.card {
  max-width: 320px; /* Ancho máximo de la tarjeta */
  height: 450px; /* Altura de la tarjeta */
  border-radius: 15px;
  overflow: hidden; /* Oculta el contenido que se sale de la tarjeta */
  background-color: #1c1c1c; /* Fondo oscuro de la tarjeta */
  transition: transform 0.5s ease, opacity 0.5s ease; /* Transiciones suaves */
  cursor: pointer;
  margin: 0 auto; /* Centrar la tarjeta en todas las pantallas */
  position: relative;
}

/* Imagen de la tarjeta */
.card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.5s ease; /* Transiciones suaves para la opacidad */
}

.png-image {
  transform: scale(1.0); /* Escala inicial para imágenes PNG */
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.card:hover .card-img {
  opacity: 0.2;
}

.card:hover .png-image {
  transform: scale(0.95);
}

/* Contenido de la tarjeta */
.card-content {
  position: absolute; /* Posiciona el contenido en la tarjeta */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: 0; /* Inicialmente oculto */
  transition: opacity 0.5s ease;
  pointer-events: none; /* Desactiva la interacción con el contenido */
}

.card:hover .card-content {
  opacity: 1; /* Se muestra el contenido al hacer hover */
  pointer-events: auto; /* Activa la interacción solo cuando se hace hover */
}

.card-content h2 {
  margin-bottom: 10px;
  font-size: 1.5em; /* Tamaño del título */
  color: #ff007f;
}

/* Estilos para las listas */
.card-content ul {
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
  text-align: left;
  color: #fff;
}

.card-content p {
  font-size: 1em;
  text-align: center;
}

/* Ajustes responsive para las tarjetas */
@media (max-width: 480px) {
  .cards-container {
    grid-template-columns: repeat(1, 1fr); /* 1 columna en móviles */
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en tablets */
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .cards-container {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas en pantallas más grandes */
  }
}

@media (min-width: 1025px) {
  .cards-container {
    grid-template-columns: repeat(6, 1fr); /* 6 columnas en pantallas grandes */
  }
}
</style>
