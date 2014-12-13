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
  LOOKUP_MODE: 'auto',
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
  gulp.watch(['./env/**'], ['env']).on('change', notification);
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

gulp.task('test', function() {

});
