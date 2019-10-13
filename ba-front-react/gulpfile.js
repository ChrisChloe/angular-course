
var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var stripCssComments = require("gulp-strip-css-comments");
var concat = require("gulp-concat");

gulp.task('minify-custom', function () {
    gulp.src(['./public/assets/css/custom.css'])
        .pipe(concat('custom.min.css'))
        .pipe(stripCssComments({all: true}))
        .pipe(cssmin())
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('minify-app', function () {
    gulp.src(['./public/assets/css/app.css'])
        .pipe(concat('app.min.css'))
        .pipe(stripCssComments({all: true}))
        .pipe(cssmin())
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('default',['minify-custom', 'minify-app']);

gulp.task('watch', function() {
    gulp.watch(['./public/assets/css/custom.css', './public/assets/css/app.css'], ['minify-custom', 'minify-app']);
});

