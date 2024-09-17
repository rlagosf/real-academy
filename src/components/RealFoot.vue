<template>
    <footer class="real-foot">
        <div class="social-icons">
            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook-f"></i>
            </a>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'RealFoot'
};
</script>

<style scoped>
.real-foot {
  padding: 20px;
  background-color: #000;
  color: white;
  text-align: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espacio entre los íconos */
}

.social-icons a {
  color: white;
  font-size: 2.8em; /* Tamaño de los íconos */
}

.social-icons a:hover {
  color: #FF007F;
}
</style>
