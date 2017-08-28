'use strict';
// -----------------------------------------------------------------------------
// Sass
// -----------------------------------------------------------------------------
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pixrem = require('gulp-pixrem');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');

//------------------------------------------------------------------------
// Error handling
//------------------------------------------------------------------------
var handleErrors = function(errorObject, callback) {
  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') {
    this.emit('end');
  }
};

//------------------------------------------------------------------------
// Build
//------------------------------------------------------------------------
gulp.task('sass', function() {
  return gulp.src('*.scss')
  .pipe( sass({
      outputStyle: 'expanded',
      precision: 6
    }))
    .on('error', handleErrors)
    // Add rem fallbacks using pixrem
    .pipe( pixrem() )// options https://github.com/robwierzbowski/node-pixrem#options
    .on('error', handleErrors)
    .pipe( autoprefixer({
      browsers: [
        'last 2 versions',
        'Android >= 4.4',
        'Explorer >= 9',
        'iOS >= 8'
      ],
      cascade: false
    }))
    .on('error', handleErrors)
    .pipe( gulp.dest('./dist'))
    // Minify
    .pipe( minifyCSS({
      advanced: false,
      // TODO: urlQuotes does not seem to be working
      compatibility: {
        '*': {
          properties: {
            urlQuotes: true// Required for inline SVGs
          }
        }
      }
    }))
    .pipe( rename({ suffix: '.min' }) )
    .pipe( gulp.dest('./dist'))
});

// -----------------------------------------------------------------------------
// Lint
// -----------------------------------------------------------------------------
var sassLint = require('gulp-sass-lint');

gulp.task('lint', function() {
  return gulp.src('*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------
gulp.task('default', ['sass', 'lint']);
