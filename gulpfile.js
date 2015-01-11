var _ = require('lodash');
var gulp = require('gulp');
var jshintStylish = require('jshint-stylish');
var moment = require('moment');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var pngquant = require('imagemin-pngquant');
var runSequence = require('run-sequence');
var uuid = require('uuid');

plugins['angular-compiler'] = require(path.resolve('node_submodules', 'gulp-angular-compiler', 'index.js'));

/**************************************************************
Supported Task
/*************************************************************/

/*
NODE_ENV=(dev|test|stg|prod) API=(api|mock) CODE=(dev|build) gulp build

NODE_ENV=(dev|test|stg|prod) API=(api|mock) REBUILD=(yes|no) CODE=(dev|build) PORT=(1337) LIVERELOAD=(35729) gulp server

NODE_ENV=(dev|test|stg|prod) API=(api|mock) REBUILD=(yes|no) CODE=(dev|build) gulp test

NODE_ENV=(dev|test|stg|prod) API=(api|mock) REBUILD=(yes|no) gulp test:service --suite=(all|anyDefinedSuiteName) --capabilities.browserName=(phantomjs|chrome)

NODE_ENV=(dev|test|stg|prod) API=(api|mock) REBUILD=(yes|no) MODULE=(all) gulp test:unit

NODE_ENV=(dev|test|stg|prod) API=(api|mock) REBUILD=(yes|no) CODE=(dev|build) gulp test:integration --suite=(all|anyDefinedSuiteName) --capabilities.browserName=(phantomjs|chrome)

NODE_ENV=(dev|test|stg|prod) gulp sitemap
*/

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

gulp.task('clean-build', function() {
  return gulp.src(['./.build', './build'], {
      read: false
    })
    .pipe(plugins['clean']());
});

gulp.task('clean-build-end', function() {
  return gulp.src(['./.build'], {
      read: false
    })
    .pipe(plugins['clean']());
});

gulp.task('clean-dev', function() {
  return gulp.src('./.tmp', {
      read: false
    })
    .pipe(plugins['clean']());
});

gulp.task('coffee', function() {
  return gulp.src('./dev/**/*.coffee')
    .pipe(plugins['coffee']({
      bare: true
    }))
    .pipe(gulp.dest('./.tmp'))
    .pipe(plugins['connect'].reload());
});

gulp.task('compile', function() {
  return gulp.src(['./dev/**/*.html'])
    .pipe(plugins['angular-compiler']({
      injectors: {
        onBuildCss: function(data, info) {
          return '<!-- build:css styles/' + (info.name ? info.name : uuid.v4()) + '.css -->' + data + '<!-- endbuild -->';
        },
        onBuildJs: function(data, info) {
          return '<!-- build:js scripts/' + (info.name ? info.name : uuid.v4()) + '.js -->' + data + '<!-- endbuild -->';
        }
      }
    }))
    .pipe(plugins['htmlPrettify']({
      'indent_char': ' ',
      'indent_size': 2
    }))
    .pipe(gulp.dest('./.tmp'))
    .pipe(plugins['connect'].reload());
});

gulp.task('copy-build', function() {
  return gulp.src(['./.build/**', '!./.build/test/**', '!./.build/vendors/**', '!./.build/**/*.{html,css,js}'])
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-dev', function() {
  return gulp.src(['./dev/**', '!./dev/**/*.{coffee,less,scss}'])
    .pipe(gulp.dest('./.build'));
});

gulp.task('copy-tmp', function() {
  return gulp.src(['./.tmp/**'])
    .pipe(gulp.dest('./.build'));
});

gulp.task('copy-vendors', function() {
  return gulp.src(['./vendors/**'])
    .pipe(gulp.dest('./.build/vendors'));
});

gulp.task('jscs', function() {
  return gulp.src(['./dev/**/*.js', './.tmp/**/*.js'])
    .pipe(plugins['jscs']());
});

gulp.task('jshint', function() {
  return gulp.src(['./dev/**/*.js', './.tmp/**/*.js'])
    .pipe(plugins['jshint']())
    .pipe(plugins['jshint'].reporter(jshintStylish));
});

gulp.task('imagemin', function() {
  return gulp.src(['./.build/**/', '!./.build/vendors/**'])
    .pipe(plugins['imagemin']({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./.build'));
});

gulp.task('less', function() {
  return gulp.src(['./dev/**/*.less', '!./dev/**/theme/**/*.less'])
    .pipe(plugins['less']())
    .pipe(gulp.dest('./.tmp'))
    .pipe(plugins['connect'].reload());
});

gulp.task('less:theme', function() {
  return gulp.src('./dev/**/theme/css.less')
    .pipe(plugins['less']())
    .pipe(gulp.dest('./.tmp'))
    .pipe(plugins['connect'].reload());
});

gulp.task('ngAnnotate', function() {
  return gulp.src(['./.build/**/*.js'])
    .pipe(plugins['ngAnnotate']())
    .pipe(gulp.dest('./.build'));
});

gulp.task('scss', function() {
  return gulp.src(['./dev/**/*.scss', '!./dev/**/theme/**/*.scss'])
    .pipe(plugins['sass']())
    .pipe(gulp.dest('./.tmp'))
    .pipe(plugins['connect'].reload());
});

gulp.task('scss:theme', function() {
  return gulp.src('./dev/**/theme/**/css.scss')
    .pipe(plugins['sass']())
    .pipe(gulp.dest('./.tmp'))
    .pipe(plugins['connect'].reload());
});

gulp.task('useref', function() {
  var assets = plugins['useref'].assets();
  var jsFilter = plugins['filter']('**/*.js');
  var cssFilter = plugins['filter']('**/*.css');
  var htmlFilter = plugins['filter']('**/*.html');

  return gulp.src(['./.build/**/*.html', '!./.build/vendors/**'])
    .pipe(assets)
    .pipe(jsFilter)
    .pipe(plugins['uglify']())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(plugins['minifyCss']())
    .pipe(cssFilter.restore())
    .pipe(plugins['rev']())
    .pipe(assets.restore())
    .pipe(plugins['useref']())
    .pipe(plugins['revReplace']())
    .pipe(gulp.dest('./build'))
    .pipe(htmlFilter)
    .pipe(plugins['htmlmin']({
      removeComments: true,
      // removeCommentsFromCDATA: true,
      collapseWhitespace: true,
      // collapseBooleanAttributes: true,
      // removeAttributeQuotes: true,
      // removeRedundantAttributes: true,
      // useShortDoctype: true,
      // removeEmptyAttributes: true,
      // removeOptionalTags: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('./build'));
});

/**************************************************************
Main Task
/*************************************************************/

gulp.task('build', function(done) {
  var tasks = ['clean-dev', 'scss', 'scss:theme', 'less', 'less:theme', 'coffee', 'compile', 'jshint', 'jscs'];
  if (env.CODE === 'build') {
    tasks = _.union(tasks, ['clean-build', 'copy-vendors', 'copy-dev', 'copy-tmp', 'imagemin', 'ngAnnotate', 'useref', 'copy-build', 'clean-build-end']);
  }
  tasks.push(function() {
    done();
  });
  runSequence.apply(null, tasks);
});

/**************************************************************
IDEA
/*************************************************************/

/* 
- supporting auto mode
- grouping compiled output
- supporting compile output injector
*/