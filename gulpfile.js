var gulp = require('gulp'),
watch = require('gulp-watch'),
prefixer = require('gulp-autoprefixer'),
uglify = require('gulp-uglify'),
rigger = require('gulp-rigger'),
cssnano = require('gulp-cssnano'),
sass = require('gulp-sass'),
rimraf = require('rimraf'),
browserSync = require('browser-sync'),
imagemin = require('gulp-imagemin'),
plumber = require('gulp-plumber'),
notify = require('gulp-notify'),
fileinclude = require('gulp-file-include'),
include = fileinclude({
 prefix: '@@',
 basepath: '@file'
})


var path = {
    build: { // Куда складывать готовые файлы после сборки
    	html: 'build/',
    	js: 'build/js/',
    	css: 'build/css/',
    	img: 'build/img/',
    	fonts: 'build/css/fonts/'
    },
    src: { // Откуда брать исходники
    	html: 'src/*.html',
    	js: 'src/js/*.js',
    	css: 'src/css/style.scss',
    	img: 'src/img/**/*.*',
    	fonts: 'src/css/fonts/**/*.*'
    },
    watch: { // За изменениями каких файлов мы хотим наблюдать
    	html: 'src/**/*.html',
    	js: 'src/js/**/*.js',
    	css: 'src/css/**/*.scss',
    	img: 'src/img/**/*.*',
    	fonts: 'src/css/fonts/**/*.*'
    },
    clean: './build'
  };

gulp.task('browser-sync', function(){//запускает локальный сервер, liveReload
	browserSync({
		server:{
			baseDir:'build'
		},
		notify:false
	});
});

gulp.task('html:build', function () {
    return gulp.src(path.src.html) // Выберем файлы по нужному пути
		.pipe(plumber({ // plumber - плагин для отловли ошибок.
            errorHandler: notify.onError(function(err) { // nofity - представление ошибок в удобном для вас виде.
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe(rigger()) // Прогоним через include
        .pipe(gulp.dest(path.build.html)) // Переместим их в папку build
        .pipe(browserSync.reload({stream: true}));
      });


gulp.task('js:build', function () {
    gulp.src(path.src.js) // Выберем файлы по нужному пути
		.pipe(plumber({ // plumber - плагин для отловли ошибок.
            errorHandler: notify.onError(function(err) { // nofity - представление ошибок в удобном для вас виде.
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
		}))
        .pipe(rigger()) // Прогоним через rigger
        .pipe(uglify()) // Сожмем js
        .pipe(gulp.dest(path.build.js)) // Переместим готовый файл в build
        .pipe(browserSync.reload({stream: true}));
      });



gulp.task('sass', function(){
	return gulp.src('src/css/style.scss')
	.pipe(plumber({ // plumber - плагин для отловли ошибок.
            errorHandler: notify.onError(function(err) { // nofity - представление ошибок в удобном для вас виде.
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
     }))
	.pipe(sass())
	.pipe(prefixer())
	.pipe(gulp.dest('build/css/'))
	.pipe(browserSync.reload({stream: true}));
});




gulp.task('image:build', function () {
    gulp.src(path.src.img) // Выберем наши картинки
        .pipe(imagemin({ // Сожмем их
        	progressive: true,
        	svgoPlugins: [{removeViewBox: false}],
        	interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)); // Переместим в build
      });


gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts)) // Переместим шрифты в build
      });


gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});


gulp.task('build', [
	'html:build',
	'js:build',
	'sass',
	'fonts:build',
	'image:build'
	]);


gulp.task('watch', ['browser-sync', 'sass'], function() {
	watch([path.watch.html], function(event, cb) {
		gulp.start('html:build');
	});
	watch([path.watch.css], function(event, cb) {
		gulp.start('sass');
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('image:build');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');
	});
});


