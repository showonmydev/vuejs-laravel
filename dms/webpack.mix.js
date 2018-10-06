let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */



mix.js('resources/assets/js/app.js', 'public/js')
   .js([
    'resources/assets/js/jquery-1.12.4.js',    
    'resources/assets/js/jquery-migrate-1.1.1.js',    
    'resources/assets/js/jQuery.min.js',
    'resources/assets/js/bootstrap.min.js',
    'resources/assets/js/bootstrap.js',
    'resources/assets/js/jquery.dragtable.js'
], 'public/js/all.js')
   //.js('resources/assets/js/app_manager.js', 'public/js')
   .js('resources/assets/js/jquery.dragtable.js', 'public/js/jquery.dragtable.js')

   .sass('resources/assets/sass/app.scss', 'public/css')
   .styles([
    'resources/assets/sass/jquery-ui.css',    
    'resources/assets/sass/bootstrap.min.css',
    'resources/assets/sass/dragtable.css'
          ], 'public/css/all.css')

