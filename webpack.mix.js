const mix = require('laravel-mix')
const path = require('path')

mix.alias({
  '@': path.resolve(__dirname, 'resources'),
  '@v': path.resolve(__dirname, 'resources/vue'),
})

mix
  .js('resources/js/app.js', 'public/js')
  .vue()
  .sass('resources/sass/app.scss', 'public/css')
