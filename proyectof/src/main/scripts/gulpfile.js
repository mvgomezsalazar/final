var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var angularProtractor = require('gulp-angular-protractor');
var Server = require('karma').Server;
var browserSync = require('browser-sync').create();

gulp.task('bootstrap', function() {
  return gulp.src([
      './node_modules/angular/angular.js',
      './node_modules/angular-resource/angular-resource.js',
      './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
      './node_modules/oclazyload/dist/ocLazyLoad.js'
  ],  {base: './node_modules/'}) 
  .pipe(gulp.dest('../webapp/js/lib/'));
	
});

//Join app and modules
gulp.task('app-central', function() {
    return gulp.src(['../../main/webapp/app/app.js',
        '../../main/webapp/app/**/module.js',
        '../../main/webapp/app/ui/**/*.js'])
	    .pipe(plumber())
			.pipe(concat('app.js', {newLine: ';'}))
                        .pipe(replace('app/', 'build/'))
			.pipe(ngAnnotate({add: true}))
                        .pipe(uglify())
	    .pipe(plumber.stop())
        .pipe(gulp.dest('../../main/webapp/build/'));
});


//Just copy and annotate lazy parts
gulp.task('app-impl', function() {
    return gulp.src(['!../../main/webapp/app/app.js',
        '!../../main/webapp/app/**/module.js',
        '!../../main/webapp/app/ui/**/*.js',
        '../../main/webapp/app/**/*.js'])
	    .pipe(plumber())
                .pipe(replace('app/', 'build/'))
                .pipe(ngAnnotate({add: true}))
                .pipe(uglify())
	    .pipe(plumber.stop())
        .pipe(gulp.dest('../../main/webapp/build/'));
});

//Copy templates
gulp.task('app-html', function() {
    return gulp.src([
        '../../main/webapp/app/**/*.html'])
        .pipe(replace('app/', 'build/'))
        .pipe(gulp.dest('../../main/webapp/build/'));
});

gulp.task('dist',['bootstrap','app-central', 'app-impl', 'app-html']);

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        server: {
            baseDir: "../webapp"
        }
    });
});


gulp.task('protractor-test', function(callback) {
        gulp
            .src(['./src/tests/*.js'])   
            .pipe(angularProtractor({
                'configFile': './tests/conf.js',
                'autoStartStopServer': true
            }))
            .on('error', function(e) {
                console.log(e);
                browserSync.exit();
                process.exit(1);
            })
            .on('end', function(e){
                browserSync.exit();
            });

});

gulp.task('karma-test', function (done) {
  new Server({
    configFile: '/Documents/FINAL_CURSO/proyectoFinal/final/proyectof/src/main/scripts/tests/karma.conf.js',
    singleRun: true
  }, function(err){
        if(err === 0){
            done();
        } else {
           process.exit(1);
        }
    }).start();
});

gulp.task('test', gulpSequence('browser-sync','karma-test', 'protractor-test'));

gulp.task('build', gulpSequence('dist','test'));

