<template>
  <div class="success-container">
    <h2>¡Solicitud Enviada con Éxito!</h2>
    <p>Gracias por contactarnos. Serás redirigido a la página de inicio en unos momentos.</p>
  </div>
</template>

<script>
export default {
  name: 'SucessfullAcademy',
  mounted() {
    setTimeout(() => {
      // Redirigir a la página de inicio sin recargar la página completa, usando Vue Router
      this.$router.push('/'); // Redirige a la página de inicio en la misma ventana sin recargar
    }, 3000); // Espera 3 segundos antes de redirigir
  }
};
</script>

<style scoped>
.success-container {
  text-align: center;
  padding: 50px;
}

h2 {
  color: #FF007F;
}

p {
  color: #333;
}
</style>
