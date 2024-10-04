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
  display: flex;
  justify-content: space-between; /* Espaciado uniforme entre tarjetas */
  gap: 30px; /* Separación entre las tarjetas */
  flex-wrap: wrap; /* Permite que las tarjetas se ajusten */
}

/* Estilos para las tarjetas */
.card {
  flex: 1 1 15%; /* Permitir que las tarjetas ocupen el 15% del ancho del contenedor */
  max-width: 320px; /* Ancho máximo de la tarjeta */
  height: 450px; /* Altura de la tarjeta */
  border-radius: 15px;
  overflow: hidden; /* Oculta el contenido que se sale de la tarjeta */
  background-color: #1c1c1c; /* Fondo oscuro de la tarjeta */
  transition: transform 0.5s ease, opacity 0.5s ease; /* Transiciones suaves */
  cursor: pointer;
}

.card:hover {
  transform: scale(1.1); /* Aumenta el tamaño de la tarjeta al pasar el puntero */
}

/* Imagen de la tarjeta */
.card-img {
  width: 100%; /* Asegura que la imagen ocupe el 100% del ancho de la tarjeta */
  height: 100%; /* Asegura que la imagen ocupe el 100% de la altura de la tarjeta */
  object-fit: contain; /* Mantiene la proporción de la imagen sin cortarla */
  transition: opacity 0.5s ease; /* Transiciones suaves para la opacidad */
}

/* Disminución de tamaño solo para imágenes PNG */
.png-image {
  transform: scale(1.0); /* Escala inicial para imágenes PNG */
  transition: opacity 0.5s ease, transform 0.5s ease; /* Transiciones suaves para opacidad y transformación */
}

.card:hover .card-img {
  opacity: 0.2; /* Mayor transparencia al hacer hover */
}

/* Disminuir tamaño de la imagen PNG al hacer hover */
.card:hover .png-image {
  transform: scale(0.95); /* Disminuir tamaño de la imagen PNG al hacer hover */
}

/* Contenido de la tarjeta (oculto por defecto) */
.card-content {
  position: absolute; /* Posiciona el contenido en la tarjeta */
  top: 50%; /* Centra verticalmente */
  left: 50%; /* Centra horizontalmente */
  transform: translate(-50%, -50%); /* Ajusta la posición */
  text-align: center; /* Centra el texto */
  opacity: 0; /* Inicialmente oculto */
  transition: opacity 0.5s ease; /* Transición suave para la opacidad */
  color: #fff; /* Color del texto */
  padding: 20px; /* Espacio alrededor del texto */
}

.card:hover .card-content {
  opacity: 1; /* Se muestra el contenido al hacer hover */
}

.card-content h2 {
  margin-bottom: 10px; /* Espacio inferior */
  font-size: 1.5em; /* Tamaño del título */
  color: #ff007f; /* Color destacado para el título */
}

/* Estilos para las listas de contenido */
.card-content ul {
  list-style-type: disc; /* Usa viñetas (puntos) para la lista */
  padding-left: 20px; /* Espacio a la izquierda para la lista */
  margin: 0; /* Elimina el margen de la lista */
  text-align: left; /* Alinea el texto a la izquierda */
  color: #fff; /* Color del texto */
}

.card-content p {
  font-size: 1em; /* Tamaño del párrafo */
  text-align: center; /* Centrado del texto */
}

/* Diseño responsivo para dispositivos pequeños */
@media (max-width: 768px) {
  .cards-container {
    flex-direction: column; /* Cambia a una columna en pantallas pequeñas */
    align-items: center; /* Centra las tarjetas */
  }

  .card {
    width: 100%; /* Ancho del 100% en pantallas pequeñas */
    height: auto; /* Altura automática para mantener proporciones */
    max-width: 400px; /* Ancho máximo para tarjetas en pantallas pequeñas */
  }

  .card-content h2 {
    font-size: 1.2em; /* Tamaño del título en pantallas pequeñas */
  }

  .card-content p {
    font-size: 0.9em; /* Tamaño del párrafo en pantallas pequeñas */
  }
}
</style>
