const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/real-academy/' // Asegúrate de que coincida con el nombre del repositorio
    : '/',
  assetsDir: 'static', // Especifica un directorio para archivos estáticos (opcional)
  
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      })
    ]
  },
  
  chainWebpack: config => {
    // Permitir la carga de videos
    config.module
      .rule('videos')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[hash:8].[ext]', // Modifica esto según sea necesario
        outputPath: 'videos/', // Cambia esto si tienes una carpeta específica para videos
      });
    
    // Permitir la carga de imágenes
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[hash:8].[ext]', // Modifica esto según sea necesario
        outputPath: 'images/', // Cambia esto si tienes una carpeta específica para imágenes
      });

    // Permitir la carga de archivos estáticos en general
    config.module
      .rule('static-files')
      .test(/\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac)$/) // Añadido para cargar todos los tipos
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[hash:8].[ext]',
        outputPath: 'static/' // Directorio para archivos estáticos
      });
  }
});
