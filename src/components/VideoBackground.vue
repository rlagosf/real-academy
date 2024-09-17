<template>
    <section class="video-background" id="home">
      <video autoplay muted loop class="background-video">
        <source src="path/to/your/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="overlay">
        <h1>BIENVENIDOS a REAL ACADEMY FC</h1>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'VideoBackground'
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
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
  }
  
  h1 {
    font-size: 3em;
    color: #FF007F;
  }
  </style>
  