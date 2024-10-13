<template>
    <div class="loading-container">
      <div class="loading-content">
        <img src="/assets/logos/logo-en-negativo.png" alt="Logo de la Academia" class="logo"/>
        <p>Espere un momento por favor...</p>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingReal',
    mounted() {
      // Simular carga por ejemplo de 3 segundos
      setTimeout(() => {
        this.$emit('loading-completed');
      }, 3000);
    }
  };
  </script>
  
  <style scoped>
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: white;
    color: black;
  }
  
  .loading-content {
    text-align: center;
  }
  
  .logo {
    width: 150px;
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  p {
    color: black;
    margin-bottom: 20px;
  }
  
  .progress-bar {
    width: 300px;
    height: 20px;
    border: 2px solid black;
    border-radius: 15px 15px 15px 15px;
    background-color: black;
    position: relative;
  }
  
  .progress-fill {
    height: 100%;
    background-color: white;
    width: 0;
    border-radius: 15px 15px 15px 15px;
    animation: fillProgress 3s forwards;
  }
  
  @keyframes fillProgress {
    0% { width: 0; }
    100% { width: 100%; }
  }
  </style>
  