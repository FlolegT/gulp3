// Подключение пакетов
// Команда для снипета "gulpvar"

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber'); // Отслеживает ошибки
var notify = require('gulp-notify'); // Выводит сообщение об ошибке
var autoprefixer = require('gulp-autoprefixer'); //автопрефиксер для css
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var runSequence = require('run-sequence'); // Очередность запуска тасков

// Описание тасков, команд

gulp.task('clean:build', function() {
    return del('./build');
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './build/'}  //Прописываем директурию в которой запускается сайт
	});
	
	 // Через Watch смотрим за изменениями файлов в папках и файлах
	gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/less/**/*.less', ['less']);
	gulp.watch('src/js/**/*.js', ['copy:js']);
	gulp.watch('src/font/**/*.*', ['copy:font']);
    gulp.watch('src/libs/**/*.*', ['copy:libs']);
    gulp.watch('src/img/**/*.*', ['copy:img']); 
});

gulp.task('copy:js', function() {
    return gulp.src('src/js/**/*.*')
    	.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
});

gulp.task('copy:font', function() {
    return gulp.src('src/font/**/*.*')
    	.pipe(gulp.dest('./build/font'))
		.pipe(browserSync.stream());
});

gulp.task('copy:libs', function() {
    return gulp.src('src/libs/**/*.*')
    	.pipe(gulp.dest('./build/libs'))
		.pipe(browserSync.stream());
});

gulp.task('copy:img', function() {
    return gulp.src('src/img/**/*.*')
    	.pipe(gulp.dest('./build/img'))
		.pipe(browserSync.stream());
});

gulp.task('less', function() {
    return gulp.src('./src/less/main.less')
	    .pipe(plumber({
	    	errorHandler: notify.onError(function(err){
	    		return {
	    			title: 'Styles',
	    			message: err.message
	    		}
	    	})
	    }))
	    .pipe(sourcemaps.init())
    	.pipe(less())
    	.pipe( autoprefixer({
    		browsers: ['last 6 versions'],
    		cascade: false
    	}) )
	    .pipe(sourcemaps.write())
    	.pipe(gulp.dest('./build/css'))
    	.pipe(browserSync.stream());
});


gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
     	.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
});

// Запуск задачи по умолчанию, по команде gulp
gulp.task('default', function(callback){
	runSequence(
		'clean:build',
		['less', 'html', 'copy:font', 'copy:js', 'copy:libs', 'copy:img' ],
		'server',
		callback
	)
});