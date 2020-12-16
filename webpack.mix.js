const mix = require('laravel-mix');

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

mix.js('resources/js/app.js', 'public/js')
  //  .js('resources/js/jquery.min.js', 'public/js')
  //  .js('resources/js/jquery-ui/jquery-ui.min.js', 'public/js')
  //  .js('resources/js/spectrum/spectrum.min.js', 'public/js')
  //  .js('resources/js/jquery.ui.touch-punch.min.js', 'public/js')
  //  .js('resources/js/jquery.hotkeys.js', 'public/js')
  //  .js('resources/js/bootstrap.min.js', 'public/js')
  //  .js('resources/js/dataTables/jquery.dataTables.js', 'public/js')
  //  .js('resources/js/dataTables/dataTables.bootstrap.js', 'public/js')
  //  .js('resources/js/metisMenu/metisMenu.min.js', 'public/js')
  //  .js('resources/js/moment-with-locales.min.js', 'public/js')
  //  .js('resources/js/lodash.min.js', 'public/js')
  //  .js('resources/js/script_common.js', 'public/js')
  //  .js('resources/js/elFinder/elfinder.min.js', 'public/js')
  //  .js('resources/js/dialog.js', 'public/js')
  //  .js('resources/js/script.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
