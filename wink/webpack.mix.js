const { mix } = require('laravel-mix');
/*
 |--------------------------------------------------------------------------s
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js([
 'resources/assets/js/v1/jquery.js',
 'resources/assets/js/v1/bootstrap.js',
 'resources/assets/js/v1/list.js',
 'resources/assets/js/v1/jquery-sortable.min.js',
 'resources/assets/js/v1/select2.min.js',
 'resources/assets/js/v1/sweetalert.min.js',
 'resources/assets/js/v1/notify.js',
 'resources/assets/js/v1/Chart.js',
 'resources/assets/js/v1/lightbox.min.js',
 'resources/assets/js/v1/jquery.matchHeight.js',
 'resources/assets/js/v1/app.js'
], 'public/js/app-v1.js').version();

mix.js('resources/assets/js/v2/app.js', 'public/js/app-v2.js')
    .extract([
        'vue', 'jquery', 'moment', 'axios'
    ]).version();

mix.sass('resources/assets/sass/app.scss', 'public/css').version();
mix.sass('resources/assets/sass/v2/app-v2.scss', 'public/css').version();
mix.copy('resources/assets/js/v1/maps.js', 'public/js/maps.js');