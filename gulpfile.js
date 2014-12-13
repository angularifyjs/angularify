var _ = require('lodash');
var gulp = require('gulp');
var moment = require('moment');
var plugins = require('gulp-load-plugins')();

/**************************************************************
ENV
/*************************************************************/

var env = GLOBAL.env = {
  API: 'api',
  BROWSER: 'phantom',
  CODE: 'dev',
  COMPILE_MODE: 'auto',
  DEBUG: 'no',
  LIVERELOAD: 35729,
  MODULE: null,
  NODE_ENV: 'dev',
  PORT: 1337,
  REBUILD: 'yes',
  SUITE: null,
  options: {
    isTest: false
  }
};
(function(env) {
  _.each(env, function(value, key) {
    if (key === 'options') {
      return;
    }
    env[key] = process.env[key] || value;
  });
  // output env
  console.log('=============================================');
  console.log(env);
  console.log('=============================================');
}(env));

var watch = function() {
  var notification = function(event) {
    console.log([moment().format('hh:mm:ss'), 'File', event.path, 'was', event.type, ', running tasks...'].join(' '));
  };
  gulp.watch(['./dev/**/*.coffee'], ['coffee']).on('change', notification);
  gulp.watch(['./dev/**/*.less', '!./dev/**/theme/**'], ['less']).on('change', notification);
  gulp.watch(['./dev/**/theme/**/*.less'], ['less:theme', 'less']).on('change', notification);
  gulp.watch(['./dev/**/*.scss'], ['scss']).on('change', notification);
  gulp.watch('./env/**', ['env']).on('change', notification);
  gulp.watch(['./angularify.json', './tmp/**/*.js', './dev/**/*.js', './dev/**/*.html'], ['bundle']).on('change', notification);
};

/**************************************************************
Fuction Task
/*************************************************************/



/**************************************************************
Main Task
/*************************************************************/

gulp.task('bundle', function() {
  return gulp.src('./dev/**/');
});
