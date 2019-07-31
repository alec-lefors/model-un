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
 
mix.combine('resources/assets/js/app.js', 'public/assets/js/app.js')
	.sass('resources/assets/scss/app.scss', 'public/assets/css')
	.options({
		autoprefixer: {
			options: {
				grid: true,
			}
		}
	})
	.browserSync({
		// TODO: Make 8000 the actually port number added from port number entered from user
		proxy: 'localhost:8080',
		files: [
			'index.html',
			'resources/',
			'server.js'
		]
 });
