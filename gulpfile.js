var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');

var css = [
    'css/normalize.css',
    'css/grid.css',
    'css/slick.css',
    'css/style.css'
];

var js = [
    'js/jquery.js',
    'js/slick.js',
    'js/scrollSpy.js',
    'js/header.js',
    'js/form.js',
    'js/map.js',
    'js/script.js'
];

gulp.task('html', function() {
  gulp.src(['templates/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
    return sass('css/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('css/'));
});

gulp.task('styles', function () {
    gulp.src(css)
        .pipe(sourcemaps.init())
        .pipe(concat("all.css"))
        .pipe(minifyCSS())
        .pipe(rename("all.min.css"))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('scripts', function () {
    gulp.src(js)
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename("all.min.js"))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('watch', function () {
    gulp.watch('templates/**/*.html', ['html']);
    gulp.watch('css/*.scss', ['sass']);
    gulp.watch(css, ['styles']);
    gulp.watch(js, ['scripts']);
});

gulp.task('default', ['html', 'sass', 'styles', 'scripts', 'watch']);
