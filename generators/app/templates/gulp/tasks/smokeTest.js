var gulp = require('gulp')
var mocha = require('gulp-mocha')
var minimist = require('minimist')
var path = require('path')
var fs = require('fs')
var env = require('node-env-file');
var config = require('../config');

gulp.task('smokeTest', ['lint'], function() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'testing'
  if (!process.env.PROJECT_ROOT) {
    projectRoot = __dirname.split('/');
    projectRoot.pop();
    projectRoot.pop();
    projectRoot = projectRoot.join('/');
    process.env.PROJECT_ROOT = projectRoot;
  }
  const PROJECT_ROOT = process.env.PROJECT_ROOT;

  var testSuites = require(path.join(PROJECT_ROOT, '/test/e2e/suites.json'));

  if (!process.env.MOCHA_SUITES) {
    process.env.MOCHA_SUITES = 'all';
  }

  gulp
    .src(config.PATHS.SUITE_RUNNER)
    .pipe(mocha({
      ignoreLeaks: true,
      require:
      [ 'mocha-steps'
      ]
    }).on('error', function(error){
      // do nothing
    }))
    .once('end', function() {
      process.exit()
    })
})
