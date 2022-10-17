const mix = require('laravel-mix')
const path = require('path')
require('dotenv').config();


mix.alias({
  '@': path.resolve(__dirname, 'resources'),
  '@r': path.resolve(__dirname, 'resources/react'),
  '@pub': path.resolve(__dirname, 'public'),
})

mix
  .js('resources/js/app.js', 'public/js')
  .react()
  .sass('resources/sass/app.scss', 'public/css')
  .sourceMaps()
