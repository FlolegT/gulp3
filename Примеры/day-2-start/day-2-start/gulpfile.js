// Подключение пакетов
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('server', function() {
    browserSync.init({
    	server: {baseDir: './src/'}
    });

    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/css/**/*.css').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);

});

gulp.task('default', ['server']);




