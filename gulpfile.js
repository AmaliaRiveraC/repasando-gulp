var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');
var browserSync = require('browser-sync').create();

var rutas = {
	html: './src/assets/index.html',
	scss: './src/assets/scss/main.scss',
	js: './src/assets/js/app.js'
};

gulp.task('preparandoHTML', function(){
	gulp.src(rutas.html)
	.pipe(gulp.dest('./public'))
});

gulp.task('preparandoCSS', function(){
	gulp.src(rutas.scss)
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(gulp.dest('./public'))
});

gulp.task('preparandoJS', function() {
	gulp.src(rutas.js)
	.pipe(uglify())
	.pipe(obfuscate())
	.pipe(gulp.dest('./public'))
});

gulp.task('html-watch', ['preparandoHTML'], function(done) {
	browserSync.reload();
	done();
});

gulp.task('scss-watch', ['preparandoCSS'], function(done){
	browserSync.reload();
	done();
});

gulp.task('js-watch', ['preparandoJS'], function(done) {
	browserSync.reload();
	done();
});

gulp.task('watch-changes', function(){
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});
	
	gulp.watch(rutas.html, ['html-watch']);
	gulp.watch(rutas.scss, ['scss-watch']);
	gulp.watch(rutas.js, ['js-watch']);
});