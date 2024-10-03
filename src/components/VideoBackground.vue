<template>
  <section class="video-background" id="home">
    <video
      v-for="(video, index) in videoUrls"
      :key="index"
      v-show="currentIndex === index"
      autoplay
      muted
      loop
      class="background-video"
    >
      <source :src="video" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="overlay">
      <img src="/assets/logos/logo-en-blanco.png" class="logo" alt="Logo" />
      <h1>BIENVENIDOS a REAL ACADEMY FC</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VideoBackground',
  data() {
    return {
      videoUrls: [], // URLs de los videos de fondo
      currentIndex: 0,
      videoDuration: 10, // Duración en segundos de cada video
    };
  },
  async created() {
    this.videoUrls = await this.fetchVideoUrls(); // Obtiene las URLs de los videos
    this.startVideoCycle(); // Inicia el ciclo de cambio de videos
  },
  methods: {
    async fetchVideoUrls() {
      const totalVideos = 6; // Cambia esto según la cantidad de videos
      return Array.from({ length: totalVideos }, (_, i) => `/assets/videos/video-${i + 1}.mp4`);
    },
    startVideoCycle() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.videoUrls.length;
      }, this.videoDuration * 1000); // Cambia el video cada 10 segundos
    },
  },
};
</script>

<style scoped>
.video-background {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 1s ease;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.logo {
  max-width: 30%;
  min-width: 250px;
  opacity: 0.5;
  margin-bottom: 20px;
}

h1 {
  font-size: 4em;
  color: transparent;
  opacity: 0.8;
  -webkit-text-stroke: 0.3px rgba(255, 255, 255, 0.5);
  text-align: center;
  pointer-events: none;
}
</style>
