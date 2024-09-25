<template>
  <div class="success">
    <img src="/real-academy-fc/logo-en-blanco.png" alt="Logo de la Academia" />
    <h2>¡Formulario Enviado!</h2>
    <p>Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
    <router-link to="/">Volver al Inicio de RAFC</router-link>
  </div>
</template>

<script>
export default {
  name: 'SucessfullAcademy'
};
</script>

<style scoped>
.success {
  text-align: center;
  padding: 60px;
}

img {
  max-width: 200px;
}
</style>
