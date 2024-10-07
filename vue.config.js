const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,

  // Cambia el publicPath para Vercel
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  // Opcional: Puedes especificar un directorio para archivos estáticos
  assetsDir: 'static',

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
        name: '[name].[hash:8].[ext]',
        outputPath: 'videos/',
      });

    // Permitir la carga de imágenes, incluyendo .webp
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg|webp)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[hash:8].[ext]',
        outputPath: 'images/',
      });

    // Permitir la carga de archivos estáticos en general
    config.module
      .rule('static-files')
      .test(/\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|webp)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[hash:8].[ext]',
        outputPath: 'static/' // Directorio para archivos estáticos
      });
  }
});
