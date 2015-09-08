var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    templateCache = require('gulp-angular-templatecache'),
    watch = require('gulp-watch'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    requireDir = require('require-dir');

var tasks = requireDir('./bower_components/pi-gulp-tasks/tasks');

var paths = {
    dependencies: [
        './bower_components/ui-router/release/angular-ui-router.js',
        './bower_components/underscore/underscore.js',
        './bower_components/ui-bootstrap/src/transition/transition.js',
        './bower_components/moment/moment.js',
        './bower_components/moment/locale/pt.js',
        './bower_components/jquery-mousewheel/jquery.mousewheel.js',
        './bower_components/jquery.terminal/js/jquery.terminal-0.8.8.js',
    ],
    appModules: [
        './app/module.js',
        './app/**/module.js',
        './app/*.js',
        './app/**/*.js',
        './app/*.mdl.js',
        './app/common/*.mdl.js',
        './app/common/**/*.mdl.js',
        './app/common/**/**/*.mdl.js',
        './app/common/*.js',
        './app/common/**/*.js',
        './app/common/**/**/*.js',
        './app/core/*.mdl.js',
        './app/core/**/**/*.mdl.js',
        './app/core/**/*.mdl.js',
        './app/core/*.js',
        './app/core/**/*.js',
        './app/core/**/**/*.js'
    ]
};

gulp.task('scripts', function(){


    gulp.src(['./bower_components/pi-angular/dist/pi-angular.js'])
      .pipe(concat('pi-angular.js'))
      .pipe(gulp.dest('./public/dist'));

      gulp.src(paths.appModules)
          .pipe(concat('app.js'))
          .pipe(gulp.dest('./public/dist'));

    gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/jquery-ui/jquery-ui.js',
        './bower_components/jquery-bridget/jquery.bridget.js',
        './bower_components/get-style-property/get-style-property.js',
        './bower_components/get-size/get-size.js',
        './bower_components/eventEmitter/EventEmitter.js',
        './bower_components/eventie/eventie.js',
        './bower_components/doc-ready/doc-ready.js',
        './bower_components/matches-selector/matches-selector.js'
      ])
        .pipe(concat('jquery.js'))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('uglify', function() {
  gulp.src(paths.appModules)
    .pipe(uglify('app.min.js'))
    .pipe(gulp.dest('./public/dist'))
});

gulp.task('dependencies', function(){
   gulp.src(paths.dependencies)
       .pipe(concat('dependencies.js'))
       .pipe(gulp.dest('./public/dist'));
});

gulp.task('watch', function(){
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.appModules, ['scripts']);
    gulp.watch(paths.dependencies, ['dependencies']);
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['scripts', 'dependencies', 'templates', 'inject-dist', 'sass', 'angular']);
