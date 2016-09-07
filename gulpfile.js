var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    coffee = require('gulp-coffee'),
    livereload = require('gulp-livereload');

//- Gulp tasks -//

gulp.task('stylus', function() {
    gulp.src('./app/styl/*.styl')
        .pipe(stylus()) // Запускаем обработчик Stylus
        .on('error', console.log) // Выводим ошибки в консоль
      .pipe(gulp.dest('./build/css/')) // Выводим сгенерированные CSS-файлы в ту же папку по тем же именем, но с другим расширением
      .pipe(livereload());
});

gulp.task('autoprefixer', function(){
    gulp.src('./build/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/css/'))
});

gulp.task('cssmin', function () {
    gulp.src('./build/css/style.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/min/'));
});

gulp.task('jade', function(){
    gulp.src('./app/*.jade')
        .pipe(jade({pretty: true}))
        .on('error', console.log) // Выводим ошибки в консоль
      .pipe(gulp.dest('./build/')) // Выводим сгенерированные HTML-файлы в ту же папку по тем же именем, но с другим расширением
      .pipe(livereload());
});

gulp.task('coffee',function(){
    gulp.src('./app/coffee/*.coffee')
        .pipe(coffee({bare: true}))
        .on('error', console.log) // Выводим ошибки в консоль
       .pipe(gulp.dest('./build/js/')) // Выводим сгенерированные JavaScript-файлы в ту же папку по тем же именем, но с другим расширением
       .pipe(livereload());
});

/*
* Создадим задачу, смотрящую за изменениями
*/

gulp.task('watch', function(){
      livereload.listen();
      gulp.watch('./app/styl/*.styl',['stylus']);
      gulp.watch('./build/css/*.css',['autoprefixer']);
      gulp.watch('./build/css/style.css',['cssmin']);
      gulp.watch('./app/*.jade',['jade']);
      gulp.watch('./app/coffee/*.coffee',['coffee']);
});

gulp.task('default',['watch','stylus','autoprefixer','jade','coffee','cssmin']);
