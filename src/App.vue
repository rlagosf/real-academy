<template>
  <div id="app">
    <router-view />  <!-- Este es el lugar donde se renderizarán los componentes de ruta -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

body {
  margin: 0;
  font-family: 'Bebas Neue', sans-serif;
  color: #333;
  background-color: #FFF;
}

#app {
  width: 100%;
  overflow-x: hidden;
}
</style>
