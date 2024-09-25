const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  
  // Aquí agregamos la configuración de Webpack
  configureWebpack: {
    plugins: [
      // Define las feature flags de Vue
      new (require('webpack')).DefinePlugin({
        __VUE_OPTIONS_API__: true,           // Si estás usando la Options API
        __VUE_PROD_DEVTOOLS__: false,        // Desactiva las devtools en producción
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false  // Desactiva el mensaje de mismatch
      })
    ]
  }
});
