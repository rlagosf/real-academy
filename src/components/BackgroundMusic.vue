<template>
    <audio ref="backgroundMusic" loop>
      <source src="/assets/opening/PLG1p4ZV6cRjAVHe5HlJILpXOf2f7ncOch.MP3" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  </template>
  
  <script>
  export default {
    name: 'BackgroundMusic',
    mounted() {
      // Establecer el volumen a un nivel bajo (por ejemplo, 0.1)
      // @ts-ignore
      this.$refs.backgroundMusic.volume = 0.1; // 0.0 a 1.0
  
      // Agregar un listener para el evento click en el documento
      document.addEventListener('click', this.playMusic);
    },
    beforeUnmount() {
      // Limpiar el listener al destruir el componente
      document.removeEventListener('click', this.playMusic);
    },
    methods: {
      playMusic() {
        const backgroundMusic = this.$refs.backgroundMusic;
  
        // Reproducir música solo si no se está reproduciendo
        // @ts-ignore
        if (backgroundMusic.paused) {
          // @ts-ignore
          backgroundMusic.play().catch((error) => {
            console.log('Error al intentar reproducir música:', error);
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
    /* Si deseas, puedes agregar estilos aquí */
  </style>
  